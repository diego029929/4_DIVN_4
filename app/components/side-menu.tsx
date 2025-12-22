"use client";

import Link from "next/link";
import { Menu, Search, User, X } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/context/auth-context";

const HeaderCart = dynamic(() => import("./header-cart"), { ssr: false });

const menuItems = [
  { label: "Tous nos produits", href: "/shop" },
  { label: "L’histoire de DIVN", href: "/about" },
  { label: "Besoin d’aide ?", href: "/contact" },
  { label: "The FAM", href: "/register" },
  { label: "Mon panier", href: "/cart" },
];

export default function Header() {
  const { user, loading } = useAuth();
  const [sideOpen, setSideOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  if (loading) return null;

  return (
    <>
      {/* Overlay */}
      {sideOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSideOpen(false)}
        />
      )}

      {/* SideMenu mobile */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 sm:w-80 bg-[#0b0b0b] text-white z-50 transform transition-transform duration-300 ${
          sideOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={() => setSideOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col p-4 gap-4 text-lg">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSideOpen(false)}
              className="border-b border-white/10 pb-2 hover:text-yellow-400 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Header */}
      <header className="fixed top-0 left-0 z-30 w-full bg-[#1f1f1f] text-white shadow-md">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-12 h-16">
          {/* Menu burger mobile */}
          <button
            className="sm:hidden mr-3"
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
        
