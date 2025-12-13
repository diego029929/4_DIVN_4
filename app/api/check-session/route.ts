// app/api/check-session/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const email = cookies().get("user-email")?.value;

  return NextResponse.json({
    loggedIn: !!email,
    userEmail: email || null,
  });
}
