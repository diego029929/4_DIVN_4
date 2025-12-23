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
      {/* SideMenu */}
      <SideMenu open={sideOpen} onClose={() => setSideOpen(false)} />

      {/* Header */}
      <header className="fixed top-0 left-0 z-30 w-full bg-[#1f1f1f] text-white shadow-md">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-12">
          {/* Burger mobile */}
          <button
            className="sm:hidden z-50"
            onClick={() => setSideOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu size={28} className="text-white" />
          </button>

          {/* Logo */}
          <Link href="/" className="text-xl sm:text-2xl font-bold">
            DIVN
          </Link>

          {/* Barre de recherche desktop */}
          <div className="hidden sm:flex flex-1 mx-6 relative max-w-xl">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full rounded-full py-2 pl-4 pr-10 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
              size={20}
            />
          </div>

          {/* Profil + panier */}
          <div className="flex items-center gap-4">
            <Link href={user ? "/profile" : "/login"}>
              <User size={24} className="text-white hover:text-yellow-400" />
            </Link>
            <HeaderCart />
          </div>
        </div>

        {/* Barre de recherche mobile */}
        <div className="sm:hidden px-4 pb-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full rounded-full py-2 pl-4 pr-10 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
              size={20}
            />
          </div>
        </div>
      </header>

      {/* Spacer pour header fixe */}
      <div className="h-16 sm:h-16" />
    </>
  );
          }
            
