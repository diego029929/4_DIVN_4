import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth" // adapte le chemin si besoin

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json(
        { user: null },
        { status: 401 }
      )
    }

    return NextResponse.json({
      user: {
        id: session.user.id,
        email: session.user.email,
      },
    })
  } catch (err) {
    console.error("CHECK_SESSION_ERROR", err)
    return NextResponse.json(
      { user: null },
      { status: 500 }
    )
  }
  }
