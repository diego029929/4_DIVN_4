import * as Sentry from "@sentry/nextjs";

export const dynamic = "force-dynamic";

export async function GET() {
  console.log("🔥 API SENTRY HARD TEST HIT");

  Sentry.captureException(
    new Error("🔥 SENTRY BACKEND HARD TEST")
  );

  return new Response("ok");
}
