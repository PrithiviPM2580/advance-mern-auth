import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../middlewares/async-handler";
import type { AuthService } from "./auth.service";
import { HTTP_STATUS } from "../config/http.config";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public register = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      return res.status(HTTP_STATUS.CREATED).json({
        message: "User registered successfully",
      });
    },
  );
}
