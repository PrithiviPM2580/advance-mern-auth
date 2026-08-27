import type { Response } from "express";

export interface Payload {
  userId?: string;
  sessionId?: string;
}

export interface AuthenticationCookiesPayload {
  res: Response;
  accessToken: string;
  refreshToken: string;
}
