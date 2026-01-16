import * as Sentry from "@sentry/nextjs";
import { logtail } from "@/lib/logger";

export const dynamic = "force-dynamic";

export async function GET() {
  console.log("🔥 API SENTRY HARD TEST HIT");

  // 👉 Better Stack
  await logtail.info("🔥 BETTER STACK HARD TEST HIT", {
    route: "/api/sentry-hard-test",
    env: process.env.NODE_ENV,
  });

  // 👉 Sentry
  const error = new Error("🔥 SENTRY BACKEND HARD TEST");
  Sentry.captureException(error);

  // (optionnel mais propre)
  await logtail.error("Sentry error sent", {
    message: error.message,
  });

  return new Response("ok");
}
