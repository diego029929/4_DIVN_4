"use client";

import Link from "next/link";
import { Menu, Search, User } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";
import SideMenu from "./side-menu";
import { useAuth } from "@/context/auth-context";

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

      <header className="fixed top-0 left-0 z-20 w-full bg-[#1f1f1f] text-white shadow-md">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-12 h-16">
          
          {/* Menu burger */}
          <button
            className="text-white mr-2 sm:hidden"
            onClick={() => setSideOpen(true)}
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link href="/" className="text-xl sm:text-2xl font-bold text-white">
            DIVN
          </Link>

          {/* Barre de recherche */}
          <div className="flex-1 mx-4 relative max-w-xl">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full rounded-md py-2 pl-3 pr-10 text-black focus:outline-none"
            />
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>

          {/* Actions utilisateur */}
          <div className="flex items-center gap-4">
            {/* Icon profil */}
            <Link href={user ? "/profile" : "/login"} className="relative">
              <User size={24} className="text-white hover:text-yellow-400" />
            </Link>

            {/* Panier */}
            <HeaderCart />
          </div>
        </div>
      </header>

      {/* Spacer pour header fixe */}
      <div className="h-16" />
    </>
  );
}
