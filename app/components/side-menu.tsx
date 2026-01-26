"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

type SideMenuProps = {
  open: boolean;
  onClose: () => void;
};

const menuItems = [
  { label: "Collections", href: "/shop" },
  { label: "À propos", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Créer un compte", href: "/register" },
  { label: "Panier", href: "/cart" },
];

export default function SideMenu({ open, onClose }: SideMenuProps) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        />
      )}

      {/* Menu */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-[260px]
          bg-[#1f1f1f] text-white rounded-r-2xl shadow-xl
          transform transition-transform duration-300
          ease-[cubic-bezier(0.4,0,0.2,1)]
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-white/10">
          <span className="text-xs tracking-widest font-medium opacity-70">MENU</span>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col mt-4">
          {menuItems.map((item, idx) => (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className="
                  block px-5 py-5 text-[17px] font-light tracking-wider uppercase
                  opacity-80 hover:opacity-100 hover:translate-x-2
                  transition-all duration-200
                "
              >
                {item.label}
              </Link>
              {/* Barre séparatrice sauf après le dernier lien */}
              {idx !== menuItems.length - 1 && (
                <div className="h-px bg-white/20 mx-5"></div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer social */}
        <div className="absolute bottom-6 left-5 flex gap-4 text-xl opacity-70">
          <a href="#" aria-label="Instagram" className="hover:opacity-100 transition">
            <FaInstagram />
          </a>
          <a href="#" aria-label="TikTok" className="hover:opacity-100 transition">
            <FaTiktok />
          </a>
          <a href="#" aria-label="Twitter" className="hover:opacity-100 transition">
            <FaTwitter />
          </a>
        </div>
      </aside>
    </>
  );
}
