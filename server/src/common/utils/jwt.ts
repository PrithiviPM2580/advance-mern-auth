import jwt, { type SignOptions } from "jsonwebtoken";
import type { Payload } from "../../@types";
import { appConfig, appConfigSchema } from "../../config/app.config";
import { payloadSchema } from "../validators/auth.validator";

const signJwt = (
  payload: Payload,
  secret: string,
  options?: SignOptions,
): string => {
  return jwt.sign(payload, secret, {
    audience: appConfig.JWT_AUDIENCE,
    issuer: appConfig.JWT_ISSUER,
    ...options,
  });
};

export const signAccessToken = (payload: Payload): string => {
  return signJwt(payload, appConfig.JWT_ACCESS_SECRET, {
    expiresIn: appConfig.JWT_ACCESS_EXPIRES_IN,
  });
};

export const signRefreshToken = (payload: Payload): string => {
  return signJwt(payload, appConfig.JWT_REFRESH_SECRET, {
    expiresIn: appConfig.JWT_REFRESH_EXPIRES_IN,
  });
};

export const verifyAccessToken = (token: string): Payload => {
  try {
    const decoded = jwt.verify(token, appConfig.JWT_ACCESS_SECRET);
    return payloadSchema.parse(decoded);
  } catch (error) {
    console.error("JWT verification failed:", error);
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("JWT token has expired");
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("JWT token is invalid");
    }
    throw new Error("JWT verification failed");
  }
};

export const verifyRefreshToken = (token: string): Payload => {
  try {
    const decoded = jwt.verify(token, appConfig.JWT_REFRESH_SECRET);
    return payloadSchema.parse(decoded);
  } catch (error) {
    console.error("JWT verification failed:", error);
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("JWT token has expired");
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("JWT token is invalid");
    }
    throw new Error("JWT verification failed");
  }
};
