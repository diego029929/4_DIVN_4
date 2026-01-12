// app/api/sentry-test/route.ts
import * as Sentry from "@sentry/nextjs";

export const runtime = "nodejs";

export async function GET() {
  Sentry.captureMessage("🔥 SENTRY BACKEND OK 🔥");
  return new Response("ok");
}
