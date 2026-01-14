import * as Sentry from "@sentry/nextjs";

export function register() {
  console.log("🔥 SENTRY INSTRUMENTATION REGISTER");

  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // En prod mets 0.1, pour debug 1.0
    tracesSampleRate: 1.0,

    environment: process.env.NODE_ENV,

    debug: true, // ⚠️ TEMPORAIRE : logs dans Render
  });
}
