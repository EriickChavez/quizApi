import { Request, Response } from "express";
import { authService } from "../../services/auth/authServiceInstance";
import { sendResponse } from "../../utils/apiResponse";
import logger from "../../config/logger";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authService.signup(email, password);
    sendResponse(res, 201, "User registered successfully", user);
  } catch (error: any) {
    logger.error(error.message);
    sendResponse(res, 400, error.message, null, {
      code: "AUTH_001",
      details: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);
    sendResponse(res, 200, "Login successful", { user, token });
  } catch (error: any) {
    logger.error(error.message);
    sendResponse(res, 400, error.message, null, {
      code: "AUTH_002",
      details: error.message,
    });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const resetToken = await authService.forgotPassword(email);
    sendResponse(res, 200, "Password reset token sent", resetToken);
  } catch (error: any) {
    logger.error(error.message);
    sendResponse(res, 400, error.message, null, {
      code: "AUTH_003",
      details: error.message,
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    await authService.resetPassword(token, newPassword);
    sendResponse(res, 200, "Password reset successful");
  } catch (error: any) {
    logger.error(error.message);
    sendResponse(res, 400, error.message, null, {
      code: "AUTH_004",
      details: error.message,
    });
  }
};
