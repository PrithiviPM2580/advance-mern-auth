import { ErrorCode } from "../common/enums/error-code.enum";
import { VerificationEnum } from "../common/enums/verification.enum";
import type { LoginDTO, RegisterDTO } from "../common/interface/auth.interface";
import { BadRequestException } from "../common/utils/catch-errors";
import VerificationModel from "../database/models/verification.model";
import { fortyFiveMinutesFromNow } from "../common/utils/date-time";
import UserModel from "../database/models/user.model";
import SessionModel from "../database/models/session.model";
import { signAccessToken, signRefreshToken } from "../common/utils/jwt";

export class AuthService {
  public async register(registerData: RegisterDTO) {
    const { name, email, password } = registerData;

    const existingUser = await UserModel.exists({ email });

    if (existingUser) {
      throw new BadRequestException(
        "Email already exists",
        ErrorCode.AUTH_EMAIL_ALREADY_EXISTS,
      );
    }

    const newUser = await UserModel.create({
      name,
      email,
      password,
    });

    const userId = newUser._id;

    const verificationCode = await VerificationModel.create({
      userId,
      type: VerificationEnum.EMAIL_VERIFICATION,
      expiresAt: fortyFiveMinutesFromNow(),
    });

    return {
      user: newUser,
    };
  }

  public async login(loginData: LoginDTO) {
    const { email, password, userAgent } = loginData;

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new BadRequestException(
        "Invalid email or password",
        ErrorCode.AUTH_USER_NOT_FOUND,
      );
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new BadRequestException(
        "Invalid email or password",
        ErrorCode.AUTH_INVALID_CREDENTIALS,
      );
    }

    const session = await SessionModel.create({
      userId: user._id,
      userAgent,
    });

    const accessToken = signAccessToken({
      userId: user._id.toString(),
      sessionId: session._id.toString(),
    });

    const refreshToken = signRefreshToken({
      sessionId: session._id.toString(),
    });

    return {
      user,
      accessToken,
      refreshToken,
      mfaRequired: false,
    };
  }
}
