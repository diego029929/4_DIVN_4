"use client";

import Link from "next/link";
import { useCart } from "./cart-provider";

export default function HeaderCart() {
  const { items } = useCart();
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Link href="/cart" className="relative">
      <button className="relative">
        🛒
        {totalQuantity > 0 && (
          <span className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {totalQuantity}
          </span>
        )}
      </button>
    </Link>
  );
}
