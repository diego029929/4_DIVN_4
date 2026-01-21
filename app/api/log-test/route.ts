// app/api/log-test/route.ts
import { logtail } from "lib/logger";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  await logtail.info("🔥 TEST BETTERSTACK OK");
  await logtail.flush();

  return new Response("ok");
}
