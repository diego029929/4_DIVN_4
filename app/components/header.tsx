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
      {/* Side Menu */}
      <SideMenu open={sideOpen} onClose={() => setSideOpen(false)} />

      {/* Header */}
      <header className="fixed top-0 left-0 z-40 w-full bg-[#1f1f1f] text-white shadow-md">
        <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Burger mobile */}
          <button
            className="sm:hidden"
            onClick={() => setSideOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu size={28} />
          </button>

          {/* Logo */}
          <Link href="/" className="text-xl sm:text-2xl font-bold">
            DIVN
          </Link>

          {/* Search desktop */}
          <div className="hidden sm:flex flex-1 max-w-md mx-6 relative">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="
                w-full rounded-full
                py-2 pl-4 pr-10
                bg-[#2a2a2a]
                text-white
                placeholder-gray-400
                border border-gray-600
                focus:outline-none
                focus:ring-2
                focus:ring-yellow-400
              "
            />
            <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Profile + Cart */}
          <div className="flex items-center gap-4">
            <Link href={user ? "/profile" : "/login"}>
              <User className="hover:text-yellow-400 transition" />
            </Link>
            <HeaderCart />
          </div>
        </div>

        {/* Search mobile */}
        <div className="sm:hidden px-4 pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="
                w-full rounded-full
                py-2 pl-4 pr-10
                bg-[#2a2a2a]
                text-white
                placeholder-gray-400
                border border-gray-600
                focus:outline-none
                focus:ring-2
                focus:ring-yellow-400
              "
            />
            <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
      </header>

      {/* Spacer (IMPORTANT pour header fixed) */}
      <div className="h-[112px] sm:h-16" />
    </>
  );
}
