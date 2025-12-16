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
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60"
        />
      )}

      {/* Menu */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full
          w-[82vw] max-w-[360px]
          bg-[#0b0b0b] text-white
          transform transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-3xl font-light"
        >
          ×
        </button>

        {/* Content */}
        <div className="pt-20 px-6">
          <ul className="space-y-6 text-[17px] font-medium">
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

        {/* Social */}
        <div className="absolute bottom-10 left-6 flex gap-6 text-xl">
          <span>♪</span>
          <span>◎</span>
          <span>𝕏</span>
        </div>
      </aside>
    </>
  );
          }
