import CartProvider from "@/app/components/cart-provider";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div>
        {children}
      </div>
    </CartProvider>
  );
}
