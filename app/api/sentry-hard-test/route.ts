import * as Sentry from "@sentry/nextjs";
import { logtail } from "@/lib/logger";

export const dynamic = "force-dynamic";

export async function GET() {
  console.log("🔥 API SENTRY HARD TEST HIT");

  try {
    await logtail.info("🔥 BETTER STACK HARD TEST HIT", {
      route: "/api/sentry-hard-test",
      env: process.env.NODE_ENV,
    });
  } catch (e) {
    console.error("❌ Better Stack log failed", e);
  }

  try {
    const error = new Error("🔥 SENTRY BACKEND HARD TEST");
    Sentry.captureException(error);
  } catch (e) {
    console.error("❌ Sentry failed", e);
  }

  return new Response("ok");
}
