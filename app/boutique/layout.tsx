import { CartProvider } from "@/context/cart-context";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div>
        {children}
      </div>
    </CartProvider>
  );
}
