"use client";

import Link from "next/link";
import { X } from "lucide-react";

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
<div className="absolute bottom-10 left-6 flex gap-6 text-white">
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.34 2c1.2 0 2.38.35 3.37 1.01l.36.24-2.36 2.36a3.96 3.96 0 00-1.37-.25A4 4 0 008 9.36v5.28a4 4 0 104.34-3.98v-2.8l3.14-3.14v6.07A7 7 0 1112.34 2z" />
  </svg>

  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm6.5-.9a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z" />
  </svg>

  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.9 2L13.2 8.6 19.8 22h-3.9l-4.5-9.2L5.8 22H2l7.1-8.3L2.6 2h4l4.1 8.4L16 2h2.9z" />
  </svg>
</div>
      </aside>
    </>
  );
                }
