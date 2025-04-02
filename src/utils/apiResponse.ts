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

export interface PaginatedApiResponse extends ApiResponse {
  page: number;
  limit: number;
  total: number;
}

export const sendPaginatedResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any,
  page: number,
  limit: number,
  total: number
) => {
  const response: PaginatedApiResponse = {
    success: statusCode >= 200 && statusCode < 300,
    message,
    data,
    page,
    limit,
    total,
    error: null,
  };

  res.status(statusCode).json(response);
};

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface QuizGetWithParams {
  category?: string;
  mode?: string;
  difficulty?: string;
}