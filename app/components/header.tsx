"use client";

import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";
import SideMenu from "./side-menu";
import { useAuth } from "@/context/auth-context";

const HeaderCart = dynamic(() => import("./header-cart"), { ssr: false });

export default function Header() {
  const { user, loading } = useAuth();

  const [sideOpen, setSideOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // ⏳ Évite le flash déconnecté
  if (loading) return null;

  return (
    <>
      {/* Side menu au-dessus */}
      <SideMenu open={sideOpen} onClose={() => setSideOpen(false)} />

      {/* HEADER FIXE NOIR */}
      <header className="fixed top-0 left-0 z-20 w-full bg-black text-white shadow-md">
        <div className="flex items-center gap-4 px-4 h-16">
          {/* Burger */}
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
            {/* Exemple d’usage auth (optionnel) */}
            {user && (
              <span className="text-sm text-neutral-300">
                Bonjour {user.email}
              </span>
            )}

            <HeaderCart />
          </div>
        </div>
      </header>

      {/* Spacer pour éviter le chevauchement */}
      <div className="h-16" />
    </>
  );
            }
              
