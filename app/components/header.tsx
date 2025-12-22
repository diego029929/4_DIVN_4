"use client";

import Link from "next/link";
import { Menu, Search, User, X } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/context/auth-context";

const HeaderCart = dynamic(() => import("./header-cart"), { ssr: false });

export default function Header() {
  const { user, loading } = useAuth();
  const [sideOpen, setSideOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  if (loading) return null;

  return (
    <>
      {/* SideMenu mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-30 transform transition-transform ${
          sideOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={() => setSideOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col p-4 gap-4">
          <Link href="/" onClick={() => setSideOpen(false)}>Accueil</Link>
          <Link href="/shop" onClick={() => setSideOpen(false)}>Boutique</Link>
          <Link href="/about" onClick={() => setSideOpen(false)}>À propos</Link>
          <Link href="/contact" onClick={() => setSideOpen(false)}>Contact</Link>
        </nav>
      </div>

      {/* Overlay pour fermer le menu */}
      {sideOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => setSideOpen(false)}
        />
      )}

      <header className="fixed top-0 left-0 z-40 w-full bg-[#1f1f1f] text-white shadow-md">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-12 h-16">
          {/* Menu burger mobile */}
          <button
            className="text-white sm:hidden mr-3"
            onClick={() => setSideOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu size={28} />
          </button>

          {/* Logo */}
          <Link href="/" className="text-xl sm:text-2xl font-bold text-white">
            DIVN
          </Link>

          {/* Barre de recherche desktop */}
          <div className="hidden sm:flex flex-1 mx-6 relative max-w-xl">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full rounded-md py-2 pl-3 pr-10 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
              size={20}
            />
          </div>

          {/* Profil + Panier */}
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
              className="w-full rounded-md py-2 pl-3 pr-10 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
          
