import { ErrorCode } from "../common/enums/error-code.enum";
import { VerificationEnum } from "../common/enums/verification.enum";
import type { RegisterDTO } from "../common/interface/auth.interface";
import { BadRequestException } from "../common/utils/catch-errors";
import VerificationModel from "../database/models/verification.model";
import { fortyFiveMinutesFromNow } from "../common/utils/date-time";
import UserModel from "../database/models/user.model";

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
}
