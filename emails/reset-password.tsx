import { Heading, Text } from "@react-email/components";
import { EmailLayout } from "./components/email-layout";
import { BrandHeader } from "./components/brand-header";
import { CtaButton } from "./components/cta-button";

export default function ResetPasswordEmail({
  resetUrl,
}: {
  resetUrl: string;
}) {
  return (
    <EmailLayout preview="Réinitialisation de votre mot de passe">
      <BrandHeader />

      <Heading style={h1}>
        Mot de passe oublié ?
      </Heading>

      <Text style={text}>
        Une demande de réinitialisation a été effectuée.
        Cliquez sur le bouton ci-dessous pour définir
        un nouveau mot de passe.
      </Text>

      <CtaButton href={resetUrl}>
        Réinitialiser
      </CtaButton>

      <Text style={small}>
        Si vous n’êtes pas à l’origine de cette demande,
        aucune action n’est requise.
      </Text>
    </EmailLayout>
  );
}

const h1 = {
  color: "#ffffff",
  fontSize: "26px",
};

const text = {
  color: "#dddddd",
  fontSize: "16px",
};

const small = {
  marginTop: "32px",
  fontSize: "13px",
  color: "#999",
};
