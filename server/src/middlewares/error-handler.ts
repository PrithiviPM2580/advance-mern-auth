import type { ErrorRequestHandler } from "express";
import { HTTP_STATUS } from "../config/http.config";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(`Error occured on path ${req.path}:`, err);

  if (err instanceof SyntaxError) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Invalid JSON payload" });
  }

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: "An unexpected error occurred. Please try again later.",
    error: err?.message || "Internal Server Error",
  });
};
