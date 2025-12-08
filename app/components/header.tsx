"use client";

import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";

const HeaderCart = dynamic(() => import("./header-cart"), { ssr: false });

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-top">
        <img src="/header-image.jpg" alt="Bannière" className="header-banner" />
      </div>

      <div className="header-bar">
        <button
          className="menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        <Link href="/" className="logo">
          MaBoutique
        </Link>

        <div className="header-right">
          <Search size={24} className="icon" />
          <HeaderCart />
        </div>
      </div>

      {mobileOpen && (
        <nav className="mobile-nav">
          <Link href="/">Accueil</Link>
          <Link href="/products">Produits</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      )}
    </header>
  );
}
