import * as Sentry from "@sentry/nextjs";
import { logger } from "@/lib/logger";

export async function register() {
  // 🔥 LOG DE CONFIRMATION
  console.log("🔥 SENTRY + BETTER STACK INSTRUMENTATION REGISTER");

  // ✅ SENTRY
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 0.1,
    debug: true, // TEMP pour Render
  });

  // ✅ BETTER STACK (serveur uniquement)
  if (process.env.NODE_ENV === "production") {
    process.on("uncaughtException", async (err) => {
      await logger.error("Uncaught Exception", err);
    });

    process.on("unhandledRejection", async (reason) => {
      await logger.error("Unhandled Rejection", reason);
    });
  }
}
