"use client";

import Link from "next/link";
import { X } from "lucide-react";
import {
  FaInstagram,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";

type SideMenuProps = {
  open: boolean;
  onClose: () => void;
};

const menuItems = [
  { label: "Tous nos produits", href: "/shop" },
  { label: "L’histoire de DIVN", href: "/about" },
  { label: "Besoin d’aide ?", href: "/contact" },
  { label: "The FAM", href: "/register" },
  { label: "Mon panier", href: "/cart" },
];

export default function SideMenu({ open, onClose }: SideMenuProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/60
          transition-opacity duration-300
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={onClose}
      />

      {/* Menu */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full
          w-[280px] sm:w-[320px]
          bg-[#0b0b0b] text-white
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-2xl opacity-80 hover:opacity-100"
        >
          <X />
        </button>

        {/* Logo */}
        <div className="pt-8 px-6 text-2xl font-bold tracking-wide">
          DIVN
        </div>

        {/* Menu items */}
        <nav className="pt-10 px-6">
          <ul className="space-y-6 text-[16px] font-medium">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block border-b border-white/10 pb-3 opacity-90 hover:opacity-100 transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social */}
        <div className="absolute bottom-10 left-6 flex gap-5 text-xl opacity-80">
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" aria-label="TikTok">
            <FaTiktok />
          </a>
          <a href="#" aria-label="X">
            <FaXTwitter />
          </a>
        </div>
      </aside>
    </>
  );
}
