import { CartProvider } from "@/context/CartContext"; // adjust the path

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div>
        {children}
      </div>
    </CartProvider>
  );
}
