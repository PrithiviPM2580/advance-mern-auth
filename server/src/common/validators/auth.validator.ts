import { Types } from "mongoose";
import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  userAgent: z.string().optional(),
});

const objectIdSchema = z
  .string()
  .refine((value) => Types.ObjectId.isValid(value), {
    message: "Invalid ObjectId",
  })
  .transform((value) => new Types.ObjectId(value));

export const accessPayloadSchema = z.object({
  userId: objectIdSchema,
  sessionId: objectIdSchema,
});

export const refreshPayloadSchema = z.object({
  sessionId: objectIdSchema,
});

export type AccessTPayload = z.infer<typeof accessPayloadSchema>;
export type RefreshTPayload = z.infer<typeof refreshPayloadSchema>;
