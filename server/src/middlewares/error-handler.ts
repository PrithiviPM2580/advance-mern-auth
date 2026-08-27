import type { ErrorRequestHandler } from "express";
import { HTTP_STATUS } from "../config/http.config";
import { AppError } from "../common/utils/app-error";
import { ZodError } from "zod";
import { formatZodError } from "../common/utils/zod-error";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(`Error occured on path ${req.path}:`, err);

  if (err instanceof SyntaxError) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Invalid JSON payload" });
  }

  if (err instanceof ZodError) {
    return formatZodError(res, err);
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errorCode: err.errorCode,
    });
  }

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: "An unexpected error occurred. Please try again later.",
    error: err?.message || "Internal Server Error",
  });
};
