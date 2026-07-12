import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

export const envServer = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    APP_URL: z.string().min(1),
    MAILJET_API_KEY: z.string().min(1),
    MAILJET_API_SECRET: z.string().min(1),
    SENDER_EMAIL: z.string().min(1),
    ADMIN_EMAIL: z.string().min(1),
    ADMIN_DASHBOARD_PASSWORD: z.string().min(1),
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: true,
});
