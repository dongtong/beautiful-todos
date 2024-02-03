import { Request, Response, NextFunction } from "express";
import { Prisma } from "lib/prisma";
import { IApiRes } from "interfaces/common";
import { AppError } from "lib/appError";

export function catchORMError(defaultMsg: string, err?: unknown): IApiRes {
  // type narrowing
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return {
      statusCode: "ERROR",
      message: err.message,
    };
  }

  return {
    statusCode: "ERROR",
    message: defaultMsg,
  };
}

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} - ${req.url}`);
  next();
}

// Error handling Middleware function for logging the error message
export function errorLogger(
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(`${req.method} url(${req.url}) -- error ${error.message}`);
  // calling next middleware
  next(error);
}

export function errorHandler(
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.header("Content-Type", "application/json");

  return res.send({
    statusCode: `${error.statusCode}` || "ERROR",
    message: error.message || "Server internal error, please contact support.",
  });
}

// Fallback Middleware function for returning
// 404 error for undefined paths
export function invalidPathHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.send({
    statusCode: 404,
    message: "Invalid path",
  });
}
