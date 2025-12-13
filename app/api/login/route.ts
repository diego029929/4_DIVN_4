// app/api/login/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;

  if (!email) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  // Ici tu pourrais créer un cookie/session réelle
  // Pour tester, on stocke juste l’email dans un cookie simulé
  const response = NextResponse.json({ success: true });
  response.cookies.set("user-email", email, { path: "/" });

  return response;
}
