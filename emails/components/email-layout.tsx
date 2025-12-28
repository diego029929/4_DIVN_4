import {
  Html,
  Body,
  Container,
  Section,
  Text,
  Preview,
} from "@react-email/components";

export function EmailLayout({
  preview,
  children,
}: {
  preview: string;
  children: React.ReactNode;
}) {
  return (
    <Html>
      <Preview>{preview}</Preview>
      <Body style={body}>
        <Container style={container}>
          {children}

          <Text style={footer}>
            © {new Date().getFullYear()} DIVN — Tous droits réservés
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: "#0a0a0a",
  fontFamily: "Arial, sans-serif",
};

const container = {
  backgroundColor: "#111111",
  padding: "40px",
  borderRadius: "16px",
  maxWidth: "520px",
};

const footer = {
  marginTop: "40px",
  fontSize: "12px",
  color: "#777",
  textAlign: "center" as const,
};
    
