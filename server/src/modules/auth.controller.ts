import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../middlewares/async-handler";
import type { AuthService } from "./auth.service";
import { HTTP_STATUS } from "../config/http.config";
import {
  loginSchema,
  registerSchema,
} from "../common/validators/auth.validator";
import {
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
  setAuthenticationCookies,
} from "../common/utils/cookie";
import { UnauthorizedException } from "../common/utils/catch-errors";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public register = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userAgent = req.headers["user-agent"];
      const body = registerSchema.parse({
        ...req.body,
      });

      const { user } = await this.authService.register(body);
      return res.status(HTTP_STATUS.CREATED).json({
        message: "User registered successfully",
        data: user,
      });
    },
  );

  public login = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userAgent = req.headers["user-agent"];

      const body = loginSchema.parse({
        ...req.body,
        userAgent,
      });

      const { user, accessToken, refreshToken, mfaRequired } =
        await this.authService.login(body);

      return setAuthenticationCookies({
        res,
        accessToken,
        refreshToken,
      })
        .status(HTTP_STATUS.OK)
        .json({
          message: "User logged in successfully",
          data: {
            user,
            mfaRequired,
          },
        });
    },
  );

  public refreshToken = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        throw new UnauthorizedException("Missing refresh token");
      }

      const { accessToken, newRefreshToken } =
        await this.authService.refreshToken(refreshToken);

      if (newRefreshToken) {
        res.cookie(
          "refreshToken",
          newRefreshToken,
          getRefreshTokenCookieOptions(),
        );
      }

      return res
        .status(HTTP_STATUS.OK)
        .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
        .json({
          message: "Refresh access token successfully",
        });
    },
  );
}
