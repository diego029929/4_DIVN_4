"use client";

import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";

const HeaderCart = dynamic(() => import("./header-cart"), { ssr: false });

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);

  return (
    <>
      {/* OVERLAY */}
      <div
        className={`overlay ${sideOpen ? "show" : ""}`}
        onClick={() => setSideOpen(false)}
      ></div>

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

          <div className="social-links">
            <a href="#"><i className="fa-brands fa-instagram" /></a>
            <a href="#"><i className="fa-brands fa-tiktok" /></a>
            <a href="#"><i className="fa-brands fa-twitter" /></a>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header>
        {/* MENU BURGER */}
        <Menu
          className="menu-burger"
          onClick={() => setSideOpen(true)}
        />

        {/* SEARCH BAR */}
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

        {/* LOGO CENTRE */}
        <Link href="/" className="ml-3" style={{ fontSize: "1.6rem", fontWeight: 600 }}>
          DIVN
        </Link>

        {/* CART */}
        <div style={{ marginLeft: "auto" }}>
          <HeaderCart />
        </div>
      </header>
    </>
  );
      }
