const httpConfig = () => ({
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
});

export const HTTP_STATUS = httpConfig();

export type HTTP_STATUS_CODE = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];
