"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

type SideMenuProps = {
  open: boolean;
  onClose: () => void;
};

const menuItems = [
  { label: "Tous nos produits", href: "/shop" },
  { label: "À propos", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "S’inscrire", href: "/register" },
  { label: "Mon panier", href: "/cart" },
];

export default function SideMenu({ open, onClose }: SideMenuProps) {
  return (
    <>
      {/* Overlay avec blur */}
      {open && (
        <div
          onClick={onClose}
          className="
            fixed inset-0 z-40
            bg-black/40
            backdrop-blur-md
            transition-opacity
          "
        />
      )}

      {/* Menu */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-full w-72 sm:w-80
          bg-[#0e0e0e]
          text-white
          shadow-2xl
          transform transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
          <span className="text-lg font-semibold tracking-wide">
            Menu
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col px-6 py-6 gap-5 text-base">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="
                flex items-center
                py-2
                border-b border-white/5
                hover:text-yellow-400
                transition
              "
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA (optionnel mais recommandé ecommerce) */}
        <div className="px-6 mt-4">
          <Link
            href="/shop"
            onClick={onClose}
            className="
              block text-center
              rounded-full
              py-3
              bg-yellow-400 text-black font-semibold
              hover:bg-yellow-300
              transition
            "
          >
            Voir la boutique
          </Link>
        </div>

        {/* Réseaux sociaux */}
        <div className="absolute bottom-8 left-6 flex gap-5 text-xl text-white/70">
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-white transition"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            aria-label="TikTok"
            className="hover:text-white transition"
          >
            <FaTiktok />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-white transition"
          >
            <FaTwitter />
          </a>
        </div>
      </aside>
    </>
  );
}
