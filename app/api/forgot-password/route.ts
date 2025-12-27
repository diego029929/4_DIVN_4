import { prisma } from "@/lib/prisma"
import { randomUUID } from "crypto"
import { sendEmail } from "@/lib/email"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  console.log("🔥 FORGOT PASSWORD ROUTE HIT")

  try {
    const body = await req.json()
    console.log("📩 BODY:", body)

    const email = body?.email
    if (!email) {
      console.log("⚠️ NO EMAIL")
      return NextResponse.json({ success: true })
    }

    const cleanedEmail = email.trim().toLowerCase()
    console.log("📧 CLEANED EMAIL:", cleanedEmail)

    const user = await prisma.user.findUnique({
      where: { email: cleanedEmail },
    })

    console.log("👤 USER FOUND:", !!user)

    if (!user) {
      console.log("🚫 USER NOT FOUND")
      return NextResponse.json({ success: true })
    }

    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id },
    })
    console.log("🧹 OLD TOKENS DELETED")

    const token = randomUUID()
    const expires = new Date(Date.now() + 1000 * 60 * 30)

    await prisma.passwordResetToken.create({
      data: { token, userId: user.id, expires },
    })
    console.log("🔑 TOKEN CREATED:", token)

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`
    console.log("🔗 RESET URL:", resetUrl)

    console.log("📤 SENDING EMAIL...")
    await sendEmail(
      user.email,
      "RESET PASSWORD DEBUG",
      `Lien: ${resetUrl}`
    )
    console.log("✅ EMAIL SENT")

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("💥 FORGOT PASSWORD CRASH:", err)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
