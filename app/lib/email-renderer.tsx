// lib/email-renderer.tsx
import { render } from "@react-email/render";
import VerifyAccountEmail from "@/emails/verify-account";
import ResetPasswordEmail from "@/emails/reset-password";

// Génère le HTML de l'email de vérification
export function renderVerifyEmail(username: string, verifyUrl: string) {
  return render(<VerifyAccountEmail username={username} verifyUrl={verifyUrl} />);
}

// Génère le HTML de l'email de réinitialisation
export function renderResetPasswordEmail(resetUrl: string) {
  return render(<ResetPasswordEmail resetUrl={resetUrl} />);
}
