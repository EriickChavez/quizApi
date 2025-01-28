import { Response } from "express";

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: {
    code: string;
    details: string;
  } | null;
}

export const sendResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any = null,
  error: { code: string; details: string } | null = null
) => {
  const response: ApiResponse = {
    success: statusCode >= 200 && statusCode < 300,
    message,
    data,
    error,
  };

  res.status(statusCode).json(response);
};
