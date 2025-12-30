import "server-only";
import { render } from "@react-email/render";

import VerifyAccountEmail from "@/emails/verify-account";
import ResetPasswordEmail from "@/emails/reset-password";

export function renderVerifyEmail(
  username: string,
  verifyUrl: string
) {
  return render(
    <VerifyAccountEmail
      username={username}
      verifyUrl={verifyUrl}
    />
  );
}

export function renderResetPasswordEmail(
  resetUrl: string
) {
  return render(
    <ResetPasswordEmail resetUrl={resetUrl} />
  );
    }
    
