import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies(); // ✅ IMPORTANT
  const email = cookieStore.get("user-email")?.value;

  return NextResponse.json({
    loggedIn: !!email,
    userEmail: email || null,
  });
}
