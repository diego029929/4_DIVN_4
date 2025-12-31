// emails/reset-password.tsx
import { Html } from "@react-email/html";
import { Heading, Text, Button } from "@react-email/components";

interface Props {
  resetUrl: string;
}

export default function ResetPasswordEmail({ resetUrl }: Props) {
  return (
    <Html>
      <Heading style={{ fontSize: "24px" }}>Réinitialisation de mot de passe</Heading>
      <Text>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous :</Text>
      <Button
        pY={12}
        pX={24}
        style={{
          backgroundColor: "#000",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "6px",
        }}
        href={resetUrl}
      >
        Réinitialiser →
      </Button>
      <Text style={{ marginTop: "16px", fontSize: "12px", color: "#555" }}>
        Si vous n’avez pas demandé ce changement, ignorez cet email.
      </Text>
    </Html>
  );
}
