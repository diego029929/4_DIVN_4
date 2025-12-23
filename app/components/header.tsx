"use client";

import Link from "next/link";
import { Menu, Search, User } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/context/auth-context";
import SideMenu from "@/components/side-menu";

const HeaderCart = dynamic(() => import("./header-cart"), { ssr: false });

export default function Header() {
  const { user, loading } = useAuth();
  const [sideOpen, setSideOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  if (loading) return null;

  return (
    <>
      {/* Side menu */}
      <SideMenu open={sideOpen} onClose={() => setSideOpen(false)} />

      {/* Header */}
      <header className="fixed top-0 left-0 z-40 w-full bg-[#1f1f1f] text-white shadow-md">
        <div
          className="
            h-16 px-3
            grid grid-cols-[auto_1fr_auto_auto]
            items-center gap-2
            sm:px-6
          "
        >
          {/* Burger */}
          <button onClick={() => setSideOpen(true)}>
            <Menu size={26} />
          </button>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="
                w-full rounded-full
                py-2 pl-4 pr-9
                bg-[#2a2a2a]
                text-sm text-white
                placeholder-gray-400
                border border-gray-600
                focus:outline-none
                focus:ring-2
                focus:ring-yellow-400
              "
            />
            <Search
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Cart */}
          <HeaderCart />

          {/* Profile */}
          <Link href={user ? "/profile" : "/login"}>
            <User size={22} />
          </Link>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
