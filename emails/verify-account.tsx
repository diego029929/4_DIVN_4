// emails/verify-account.tsx
import { Html } from "@react-email/html";
import { Heading, Text, Button } from "@react-email/components";

interface Props {
  username: string;
  verifyUrl: string;
}

export default function VerifyAccountEmail({ username, verifyUrl }: Props) {
  return (
    <Html>
      <Heading style={{ fontSize: "24px" }}>Bonjour {username} !</Heading>
      <Text>Merci de créer un compte sur DIVN. Clique sur le bouton ci-dessous pour vérifier ton compte :</Text>
      <Button
        pY={12}
        pX={24}
        style={{
          backgroundColor: "#000",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "6px",
        }}
        href={verifyUrl}
      >
        Cliquer ici →
      </Button>
      <Text style={{ marginTop: "16px", fontSize: "12px", color: "#555" }}>
        Ce lien expire dans 24h.
      </Text>
    </Html>
  );
}
