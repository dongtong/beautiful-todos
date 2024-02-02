import { Prisma } from "lib/prisma";
import { IApiRes } from "interfaces/common";

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
