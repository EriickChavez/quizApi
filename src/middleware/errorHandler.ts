import { NextFunction, Request, Response } from 'express';
import { AppError } from '../exceptions/AppError';
import { sendErrorResponse } from '../exceptions/ErrorResponse';
import { ApiError } from '../exceptions/ApiError';


export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return sendErrorResponse(res, err.statusCode, err);
  }

  // Monitorear el error con un logger
  // logger.error(err.message, { stack: err.stack });
  // res.status(500).send({ error: "Something went wrong!" });

  // Si no es un AppError, lo convertimos en uno
  const unexpectedError = new ApiError('Ocurrió un error inesperado');
  return sendErrorResponse(res, unexpectedError.statusCode, unexpectedError);
};

