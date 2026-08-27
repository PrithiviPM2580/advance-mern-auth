import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../middlewares/async-handler";
import type { AuthService } from "./auth.service";
import { HTTP_STATUS } from "../config/http.config";
import {
  loginSchema,
  registerSchema,
} from "../common/validators/auth.validator";
import { setAuthenticationCookies } from "../common/utils/cookie";

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
}
