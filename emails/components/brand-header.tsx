import { Text } from "@react-email/components";

export function BrandHeader() {
  return (
    <Text style={logo}>
      DIVN
    </Text>
  );
}

const logo = {
  fontSize: "32px",
  fontWeight: 700,
  letterSpacing: "6px",
  color: "#c9a24d",
  textAlign: "center" as const,
  marginBottom: "32px",
};
