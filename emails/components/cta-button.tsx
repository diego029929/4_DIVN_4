import { Button } from "@react-email/components";

export function CtaButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Button
      href={href}
      style={{
        backgroundColor: "#c9a24d",
        color: "#000",
        padding: "14px 24px",
        borderRadius: "999px",
        fontWeight: 600,
        textDecoration: "none",
        display: "inline-block",
        marginTop: "24px",
      }}
    >
      {children} →
    </Button>
  );
}
