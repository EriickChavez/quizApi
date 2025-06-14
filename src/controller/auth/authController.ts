import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../../utils/apiResponse";
import { UserService } from "../../services/user/userService";
import { userServiceInstance } from "../../services/instances/userServiceInstance";
import { comparePassword, hashPassword } from "../../config/auth";
import { authServiceInstance } from "../../services/instances/authServiceInstance";

interface AuthRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

export const register = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await hashPassword(password);

    const newUser = await userServiceInstance.registerUser({
      name,
      email,
      passwordHash: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const token = authServiceInstance.generateToken({ id: newUser._id, email: newUser.email });

    sendResponse(res, 201, 'Usuario creado exitosamente', { user: newUser, token });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    const user = await userServiceInstance.getUserByEmail(email);

    if (!user || !(await comparePassword(password, user.passwordHash))) {
      throw new Error('Credenciales inválidas');
    }

    const token = authServiceInstance.generateToken({ id: user._id, email: user.email });

    sendResponse(res, 200, 'Login exitoso', { token });
  } catch (error) {
    next(error);
  }
};

/*
export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authServiceInstance.signup(email, password);
    sendResponse(res, 201, "User registered successfully", user);
  } catch (error: any) {
    logger.error(error.message);
    sendResponse(res, 400, error.message, null, {
      code: ERROR_CODES.VALIDATION_ERROR,
      details: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authServiceInstance.login(email, password);
    sendResponse(res, 200, "Login successful", { user, token });
  } catch (error: any) {
    logger.error(error.message);
    sendResponse(res, 400, error.message, null, {
      code: ERROR_CODES.INVALID_CREDENTIALS,
      details: error.message,
    });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const resetToken = await authServiceInstance.forgotPassword(email);
    sendResponse(res, 200, "Password reset token sent", resetToken);
  } catch (error: any) {
    logger.error(error.message);
    sendResponse(res, 400, error.message, null, {
      code: ERROR_CODES.INVALID_CREDENTIALS,
      details: error.message,
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    await authServiceInstance.resetPassword(token, newPassword);
    sendResponse(res, 200, "Password reset successful");
  } catch (error: any) {
    logger.error(error.message);
    sendResponse(res, 400, error.message, null, {
      code: ERROR_CODES.INVALID_RESET_TOKEN,
      details: error.message,
    });
  }
};
*/