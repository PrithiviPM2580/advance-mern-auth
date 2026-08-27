import mongoose, { Schema, Document } from "mongoose";
import type { VerificationEnum } from "../../common/enums/verification.enum";
import { generateUniqueCode } from "../../common/utils/uuid";

export interface VerificationDocument extends Document {
  userId: mongoose.Types.ObjectId;
  code: string;
  type: VerificationEnum;
  expiresAt: Date;
  createdAt: Date;
}

const verificationSchema = new Schema<VerificationDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  code: {
    type: String,
    unique: true,
    required: true,
    default: generateUniqueCode,
  },
  type: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const VerificationModel = mongoose.model<VerificationDocument>(
  "Verification",
  verificationSchema,
);

export default VerificationModel;
