import { HTTP_STATUS, type HTTP_STATUS_CODE } from "../../config/http.config";
import type { ErrorCode } from "../enums/error-code.enum";

export class AppError extends Error {
  public statusCode: HTTP_STATUS_CODE;
  public errorCode?: ErrorCode;

  constructor(
    message: string,
    statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    errorCode?: ErrorCode,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
