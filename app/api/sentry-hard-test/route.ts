import * as Sentry from "@sentry/nextjs";

export async function GET() {
  await Sentry.captureMessage("🔥 SENTRY HARD TEST BACKEND 🔥");
  return new Response("ok");
}
