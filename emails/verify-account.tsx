import { Heading, Text } from "@react-email/components";
import { EmailLayout } from "./components/email-layout";
import { BrandHeader } from "./components/brand-header";
import { CtaButton } from "./components/cta-button";

export default function VerifyAccountEmail({
  username,
  verifyUrl,
}: {
  username: string;
  verifyUrl: string;
}) {
  return (
    <EmailLayout preview="Vérifiez votre compte DIVN">
      <BrandHeader />

      <Heading style={h1}>
        Bienvenue {username}
      </Heading>

      <Text style={text}>
        Merci d’avoir créé un compte chez <strong>DIVN</strong>.
        Pour sécuriser votre accès et activer votre compte,
        veuillez confirmer votre adresse email.
      </Text>

      <CtaButton href={verifyUrl}>
        Cliquer ici
      </CtaButton>

      <Text style={small}>
        Ce lien est personnel et expirera automatiquement.
        Si vous n’êtes pas à l’origine de cette demande,
        vous pouvez ignorer cet email en toute sécurité.
      </Text>
    </EmailLayout>
  );
}

const h1 = {
  color: "#ffffff",
  fontSize: "26px",
  marginBottom: "16px",
};

const text = {
  color: "#dddddd",
  fontSize: "16px",
  lineHeight: "24px",
};

const small = {
  marginTop: "32px",
  fontSize: "13px",
  color: "#999",
};
      
