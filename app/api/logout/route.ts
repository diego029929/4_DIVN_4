import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function POST() {
  // Supprime le cookie auth
  cookies().delete("auth", { path: "/" });

  // Redirige vers la page d'accueil
  return NextResponse.redirect(new URL("/", "http://localhost:3000"));
}
