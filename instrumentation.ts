import * as Sentry from "@sentry/nextjs";

import { logger } from "lib/logger";

export async function register() {
  if (process.env.NODE_ENV === "production") {
    process.on("uncaughtException", async (err) => {
      await logger.error("Uncaught Exception", err);
    });

    process.on("unhandledRejection", async (reason) => {
      await logger.error("Unhandled Rejection", reason);
    });
    
  console.log("🔥 SENTRY INSTRUMENTATION REGISTER");

  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // En prod mets 0.1, pour debug 1.0
    tracesSampleRate: 1.0,

    environment: process.env.NODE_ENV,

    debug: true, // ⚠️ TEMPORAIRE : logs dans Render
  });
}
