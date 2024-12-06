import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  status?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`Error: ${err.message}`);

  const status = err.status || 500;

  res.status(status).json({
    error: {
      message: err.message || "خظای سرور",
      status,
    },
  });
};

export const createError = (status: number, message: string): CustomError => {
  const error: CustomError = new Error(message);
  error.status = status;
  return error;
};
