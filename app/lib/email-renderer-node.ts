import { render } from "@react-email/render";
import VerifyAccountEmail from "@/emails/verify-account";

// ⚡ Précompile le HTML côté Node
export function renderVerifyEmail(username: string, verifyUrl: string) {
  return render(<VerifyAccountEmail username={username} verifyUrl={verifyUrl} />);
    }
    
