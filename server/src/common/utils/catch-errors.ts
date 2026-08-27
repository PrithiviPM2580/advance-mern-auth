import { AppError } from "./app-error";
import { HTTP_STATUS, type HTTP_STATUS_CODE } from "../../config/http.config";
import { ErrorCode } from "../enums/error-code.enum";

export class NotFoundError extends AppError {
  constructor(
    message: string = "Resource not found",
    statusCode: HTTP_STATUS_CODE = HTTP_STATUS.NOT_FOUND,
    errorCode?: ErrorCode,
  ) {
    super(message, statusCode, errorCode);
  }
}

export class BadRequestError extends AppError {
  constructor(
    message: string = "Bad request",
    statusCode: HTTP_STATUS_CODE = HTTP_STATUS.BAD_REQUEST,
    errorCode?: ErrorCode,
  ) {
    super(message, statusCode, errorCode);
  }
}

export class UnauthorizedError extends AppError {
  constructor(
    message: string = "Unauthorized",
    statusCode: HTTP_STATUS_CODE = HTTP_STATUS.UNAUTHORIZED,
    errorCode?: ErrorCode,
  ) {
    super(message, statusCode, errorCode);
  }
}

export class ForbiddenError extends AppError {
  constructor(
    message: string = "Forbidden",
    statusCode: HTTP_STATUS_CODE = HTTP_STATUS.FORBIDDEN,
    errorCode?: ErrorCode,
  ) {
    super(message, statusCode, errorCode);
  }
}

export class ConflictError extends AppError {
  constructor(
    message: string = "Conflict",
    statusCode: HTTP_STATUS_CODE = HTTP_STATUS.CONFLICT,
    errorCode?: ErrorCode,
  ) {
    super(message, statusCode, errorCode);
  }
}

export class InternalServerError extends AppError {
  constructor(
    message: string = "Internal server error",
    statusCode: HTTP_STATUS_CODE = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    errorCode?: ErrorCode,
  ) {
    super(message, statusCode, errorCode);
  }
}

export class HttpException extends AppError {
  constructor(
    message: string,
    statusCode: HTTP_STATUS_CODE,
    errorCode?: ErrorCode,
  ) {
    super(message, statusCode, errorCode);
  }
}
