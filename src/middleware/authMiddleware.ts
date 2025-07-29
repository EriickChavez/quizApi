import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/ENV";
import { UserModel } from "../models/userModel";
import { sendResponse } from "../utils/apiResponse";
import { USER_ROLES } from "../enums/roles";

interface JWTPayload {
  id: string;
  email: string;
  role: USER_ROLES;
  iat?: number;
  exp?: number;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return sendResponse(res, 401, "Access denied", null, {
      code: "NO_TOKEN",
      details: "No authentication token provided"
    });
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET!) as JWTPayload;
    
    // Verificar que el usuario aún existe y esté activo
    const user = await UserModel.findById(decoded.id).select("-passwordHash");
    
    if (!user) {
      return sendResponse(res, 401, "User not found", null, {
        code: "USER_NOT_FOUND",
        details: "The user associated with this token no longer exists"
      });
    }

    if (!user.isActive) {
      return sendResponse(res, 401, "Account deactivated", null, {
        code: "ACCOUNT_DEACTIVATED",
        details: "This account has been deactivated"
      });
    }

    // Agregar información del usuario al request
    req.user = {
      id: user._id?.toString() || user.id,
      email: user.email,
      role: user.role
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return sendResponse(res, 401, "Invalid token", null, {
        code: "INVALID_TOKEN",
        details: "The provided token is invalid or malformed"
      });
    }
    
    if (error instanceof jwt.TokenExpiredError) {
      return sendResponse(res, 401, "Token expired", null, {
        code: "TOKEN_EXPIRED",
        details: "The provided token has expired"
      });
    }

    return sendResponse(res, 500, "Authentication error", null, {
      code: "AUTH_ERROR",
      details: "An error occurred during authentication"
    });
  }
};
