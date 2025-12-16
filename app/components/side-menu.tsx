"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { FaTiktok, FaInstagram, FaXTwitter } from "react-icons/fa6";

type SideMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function SideMenu({ open, onClose }: SideMenuProps) {
  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/70"
        onClick={onClose}
      />

      {/* Menu */}
      <aside className="fixed inset-0 z-50 bg-[#0b0b0b] text-white">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-3xl"
        >
          <X />
        </button>

        {/* Menu items */}
        <div className="pt-24 px-6">
          <ul className="space-y-6 text-[18px] font-medium">
            {[
              "Tous nos produits",
              "L'histoire de DIVN",
              "Besoin d'aide ?",
              "The FAM",
              "L’équipage",
              "Créer un compte",
            ].map((item) => (
              <li
                key={item}
                className="border-b border-white/10 pb-4"
              >
                <Link href="#" onClick={onClose}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social icons (EXACT) */}
        <div className="absolute bottom-10 left-6 flex gap-6 text-2xl">
          <a href="https://www.tiktok.com" target="_blank">
            <FaTiktok />
          </a>
          <a href="https://www.instagram.com" target="_blank">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank">
            <FaXTwitter />
          </a>
        </div>
      </aside>
    </>
  );
                }
