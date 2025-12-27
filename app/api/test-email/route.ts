import nodemailer from "nodemailer";

export const runtime = "nodejs";

import { sendEmail } from "@/lib/email";

export async function GET() {
  await sendEmail(
    "wist.infodev@gmail.com",
    "TEST BREVO API ✅",
    "Si tu lis ça, C’EST FINI."
  );

  return new Response("OK");
}
