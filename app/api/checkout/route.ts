import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies(); // ✅
  const email = cookieStore.get("user-email")?.value;

  if (!email) {
    return new Response("Not logged in", { status: 401 });
  }

  // suite Stripe...
}
