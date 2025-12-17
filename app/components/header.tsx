"use client";

import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";
import SideMenu from "./side-menu";

const HeaderCart = dynamic(() => import("./header-cart"), { ssr: false });

type HeaderProps = {
  isAuthenticated: boolean;
};

export default function Header({ isAuthenticated }: HeaderProps) {
  const [sideOpen, setSideOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Side menu au-dessus */}
      <SideMenu open={sideOpen} onClose={() => setSideOpen(false)} />

      {/* HEADER FIXE NOIR */}
      <header className="fixed top-0 left-0 z-20 w-full bg-black text-white shadow-md">
        <div className="flex items-center gap-4 px-4 h-16">
          {/* Burger (toggle) */}
          <Menu
            className="cursor-pointer text-white"
            onClick={() => setSideOpen((v) => !v)}
          />

          {/* Search */}
          <div className={`search-bar relative ${searchOpen ? "active" : ""}`}>
            <input
              type="text"
              placeholder="Rechercher..."
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setSearchOpen(false)}
              className="rounded-md px-2 py-1 text-black focus:outline-none"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2">
              <Search size={20} className="text-black" />
            </button>
          </div>

          {/* Logo */}
          <Link href="/" className="ml-3 text-xl font-semibold text-white">
            DIVN
          </Link>

          {/* Right */}
          <div className="ml-auto flex items-center gap-4">
            <HeaderCart />
          </div>
        </div>
      </header>

      {/* Spacer pour que le contenu ne soit pas caché */}
      <div className="h-16" />
    </>
  );
}
