"use client";

import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";
import SideMenu from "@/components/side-menu";

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

      {/* HEADER STRUCTURÉ */}
      <header className="fixed top-0 left-0 z-20 w-full bg-transparent">
        <div className="flex items-center gap-4 px-4 h-16">
          {/* Burger (toggle) */}
          <Menu
            className="cursor-pointer"
            onClick={() => setSideOpen((v) => !v)}
          />

          {/* Search */}
          <div className={`search-bar ${searchOpen ? "active" : ""}`}>
            <input
              type="text"
              placeholder="Rechercher..."
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setSearchOpen(false)}
            />
            <button>
              <Search size={20} />
            </button>
          </div>

          {/* Logo */}
          <Link href="/" className="ml-3 text-xl font-semibold">
            DIVN
          </Link>

          {/* Right */}
          <div className="ml-auto flex items-center gap-4">
            <HeaderCart />
          </div>
        </div>
      </header>

      {/* Spacer pour ne pas cacher le contenu */}
      <div className="h-16" />
    </>
  );
          }
        
