import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(`Error occured on path ${req.path}:`, err);

  if (err instanceof SyntaxError) {
    return res.status(400).json({ message: "Invalid JSON payload" });
  }

  return res.status(500).json({
    message: "An unexpected error occurred. Please try again later.",
    error: err?.message || "Internal Server Error",
  });
};
