"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

export default function HeaderTest() {
  const [sideOpen, setSideOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white h-16 flex items-center px-4">
      {/* Burger */}
      <button
        onClick={() => setSideOpen(true)}
        className="sm:hidden text-white z-50"
      >
        <Menu size={28} />
      </button>

      <h1 className="ml-4 text-xl">TEST HEADER</h1>

      {/* SideMenu */}
      {sideOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSideOpen(false)}
        >
          <div
            className="fixed left-0 top-0 w-64 h-full bg-gray-900 text-white p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p>MENU TEST</p>
            <button onClick={() => setSideOpen(false)}>Fermer</button>
          </div>
        </div>
      )}
    </header>
  );
}
