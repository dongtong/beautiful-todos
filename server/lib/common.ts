import { Request, Response, NextFunction } from "express";
import { Prisma } from "lib/prisma";
import { IApiRes } from "interfaces/common";
import { AppError } from "lib/appError";

/**
 * Catch prisma ORM error
 * @param defaultMsg
 * @param err
 * @returns {IApiRes}
 */
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

/**
 * Log API reqquest basic info
 * @param req
 * @param res
 * @param next
 */
export function requestLogger(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} - ${req.url}`);
  next();
}

/**
 * Error handling Middleware function for logging the error message
 * @param error
 * @param req
 * @param res
 * @param next
 */
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

/**
 * Catch all unexcepted error
 * @param error
 * @param req
 * @param res
 * @param next
 * @returns {IApiRes}
 */
export function errorHandler(
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): IApiRes {
  res.header("Content-Type", "application/json");

  return res.send({
    statusCode: `${error.statusCode}` || "ERROR",
    message: error.message || "Server internal error, please contact support.",
  });
}

/**
 * Fallback Middleware function for returning
 * 404 error for undefined paths
 * @param req
 * @param res
 * @param next
 * @returns
 */
export function invalidPathHandler(
  req: Request,
  res: Response,
  next: NextFunction
): IApiRes {
  return res.send({
    statusCode: 404,
    message: "Invalid path",
  });
}
