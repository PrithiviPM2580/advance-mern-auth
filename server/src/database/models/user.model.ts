import mongoose, { Schema, type Document } from "mongoose";
import { compareValue, hashValue } from "../../common/utils/bcrypt";

interface UserPreferences {
  enable2FA: boolean;
  emailNotification: boolean;
  twoFactorSecret?: string;
}

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  userPreference: UserPreferences;
  createdAt: Date;
  updatedAt: Date;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userPreferencesSchema = new Schema<UserPreferences>({
  enable2FA: { type: Boolean, default: false },
  emailNotification: { type: Boolean, default: true },
  twoFactorSecret: { type: String, required: false, select: false },
});

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, trim: true, select: false },
    isEmailVerified: { type: Boolean, default: false },
    userPreference: { type: userPreferencesSchema, default: () => ({}) },
  },
  {
    timestamps: true,
  },
);

userSchema.pre<UserDocument>("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await hashValue(this.password);
});

userSchema.methods.comparePassword = function (
  candidatePassword: string,
): Promise<boolean> {
  return compareValue(candidatePassword, this.password);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
