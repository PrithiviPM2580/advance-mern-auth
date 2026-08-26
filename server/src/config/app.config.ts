import { z } from "zod";

export const appConfigSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  APP_ORIGIN: z.url().default("http://localhost:3000"),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default("1h"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),
  JWT_REFRESH_SECRET: z.string(),
  MONGODB_URI: z.url(),
});

const parsedConfig = appConfigSchema.safeParse(process.env);

if (!parsedConfig.success) {
  console.error(
    "Invalid environment variables:",
    parsedConfig.error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
      code: issue.code,
    })),
  );

  process.exit(1);
}

export const appConfig = parsedConfig.data;
