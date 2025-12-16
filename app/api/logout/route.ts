import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  // Crée une réponse
  const response = NextResponse.redirect(new URL("/", "http://localhost:3000"));

  // Supprime le cookie via la réponse
  response.cookies.set("auth", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0, // supprime le cookie
  });

  return response;
}
