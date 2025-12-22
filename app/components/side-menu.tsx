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
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={onClose}
        />
      )}

      {/* Menu */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 sm:w-80 bg-[#0b0b0b] text-white z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-4 text-lg">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="hover:text-yellow-400"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Réseaux sociaux */}
        <div className="absolute bottom-10 left-6 flex gap-5 text-xl opacity-80">
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" aria-label="TikTok"><FaTiktok /></a>
          <a href="#" aria-label="Twitter"><FaTwitter /></a>
        </div>
      </aside>
    </>
  );
          }
