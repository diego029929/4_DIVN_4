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
      <aside className={`side-menu ${sideOpen ? "active" : ""}`}>
        <div className="menu-content">
          <div className="side-menu-header" onClick={() => setSideOpen(false)}>
            <X size={30} />
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
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
            <a href="#"><i className="fa-brands fa-tiktok"></i></a>
            <a href="#"><i className="fa-brands fa-twitter"></i></a>
          </div>
        </div>
      </aside>

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
          <button><Search size={18} /></button>
        </div>

        <Link href="/" className="logo">DIVN</Link>

        <div className="cart-wrapper">
          <HeaderCart />
        </div>
      </header>

      {/* IMAGE PRINCIPALE */}
      <div className="main-image">
        <img src="/luxury-fashion-dark-minimalist.jpg" alt="Image principale" />
      </div>
    </>
  );
      }
