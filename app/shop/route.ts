import { NextResponse } from "next/server";
import { logtail } from "lib/logger";
import * as Sentry from "@sentry/nextjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 🔹 Log BetterStack
    logtail.info("Ping route appelée");

    // 🔹 Event Sentry
    Sentry.captureMessage("Ping API called", {
      level: "info",
      tags: {
        route: "ping",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Ping OK",
    });
  } catch (error) {
    // 🔥 Erreur Sentry
    Sentry.captureException(error);

    logtail.error("Erreur dans la route ping", {
      error: error instanceof Error ? error.message : error,
    });

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  } finally {
    await logtail.flush();
  }
}
