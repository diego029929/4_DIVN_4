"use client";

import Link from "next/link";

type SideMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function SideMenu({ open, onClose }: SideMenuProps) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Side menu */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } shadow-lg`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-lg">Menu</h2>
          <button onClick={onClose} className="text-2xl font-bold">
            &times;
          </button>
        </div>

        <nav className="p-4 space-y-4">
          <Link href="/boutique" onClick={onClose}>Tous nos produits</Link>
          <Link href="/about" onClick={onClose}>L'histoire de DIVN</Link>
          <Link href="/contact" onClick={onClose}>Besoin d'aide ?</Link>
          <Link href="/fam" onClick={onClose}>The FAM</Link>
          <Link href="/crew" onClick={onClose}>L’équipage</Link>
          <Link href="/register" onClick={onClose}>Créer un compte</Link>
        </nav>

        <div className="p-4 flex gap-4 border-t">
          <a href="https://www.tiktok.com" target="_blank" rel="noreferrer">TikTok</a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.twitter.com" target="_blank" rel="noreferrer">Twitter</a>
        </div>
      </aside>
    </>
  );
            }
            
