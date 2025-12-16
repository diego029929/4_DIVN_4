"use client";

import Link from "next/link";
import { Search, Menu } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

const HeaderCart = dynamic(() => import("./header-cart"), { ssr: false });

type HeaderProps = {
  isAuthenticated?: boolean; // ✅ optionnel
};

export function Header({ isAuthenticated = false }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);

  return (
    <>
      {/* OVERLAY */}
      <div
        className={`overlay ${sideOpen ? "show" : ""}`}
        onClick={() => setSideOpen(false)}
      />

      {/* SIDE MENU */}
      <div className={`side-menu ${sideOpen ? "active" : ""}`}>
        <div className="menu-content">
          <div
            className="side-menu-header"
            onClick={() => setSideOpen(false)}
          >
            ×
          </div>

          <ul>
            <li><Link href="/boutique">Boutique</Link></li>
            <li><Link href="/boutique?category=homme">Homme</Link></li>
            <li><Link href="/boutique?category=femme">Femme</Link></li>
            <li><Link href="/boutique?category=accessoires">Accessoires</Link></li>
            <li><Link href="/about">À propos</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>

          {/* AUTH */}
          <div className="mt-6 flex flex-col gap-3">
            {isAuthenticated ? (
              <form action="/api/logout" method="POST">
                <Button variant="outline" className="w-full">
                  Déconnexion
                </Button>
              </form>
            ) : (
              <Link href="/login">
                <Button className="w-full">Connexion</Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header>
        <Menu className="menu-burger" onClick={() => setSideOpen(true)} />

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

        <Link href="/" className="ml-3 text-xl font-semibold">
          DIVN
        </Link>

        <div className="ml-auto flex items-center gap-4">
          <HeaderCart />
        </div>
      </header>
    </>
  );
}
