"use client";

import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SideMenu from "@/components/side-menu";

const HeaderCart = dynamic(() => import("./header-cart"), { ssr: false });

type HeaderProps = {
  isAuthenticated: boolean;
};

export default function Header({ isAuthenticated }: HeaderProps) {
  const [sideOpen, setSideOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Détecte le scroll pour changer le fond
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Side menu (au-dessus du header) */}
      <SideMenu open={sideOpen} onClose={() => setSideOpen(false)} />

      {/* HEADER */}
      <header
        className={`
          fixed top-0 left-0 w-full
          z-50
          transition-all duration-300
          ${scrolled ? "bg-white/90 backdrop-blur shadow-sm" : "bg-white"}
        `}
      >
        <div className="flex items-center gap-4 px-4 h-16">
          {/* Burger */}
          <Menu
            className="cursor-pointer"
            onClick={() => setSideOpen(true)}
          />

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher..."
              className={`
                transition-all duration-300
                border rounded px-3 py-1 text-sm
                ${searchOpen ? "w-48 opacity-100" : "w-32 opacity-70"}
              `}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setSearchOpen(false)}
            />
            <Search
              size={18}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>

          {/* Logo */}
          <Link href="/" className="ml-3 text-xl font-bold tracking-wide">
            DIVN
          </Link>

          {/* Right */}
          <div className="ml-auto flex items-center gap-4">
            <HeaderCart />
          </div>
        </div>
      </header>

      {/* Spacer pour le contenu */}
      <div className="h-16" />
    </>
  );
}
