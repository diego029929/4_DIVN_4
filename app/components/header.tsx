"use client";

import { useState } from "react";
import Link from "next/link";

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleMenu}
        />
      )}

      {/* Menu burger button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 text-black bg-white rounded-md shadow-md"
        onClick={toggleMenu}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Side menu */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } shadow-lg`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-lg">Menu</h2>
          <button onClick={toggleMenu} className="text-2xl font-bold">
            &times;
          </button>
        </div>

        <nav className="p-4 space-y-4">
          <Link href="#" className="flex items-center gap-2 hover:text-primary">
            <i className="fas fa-box"></i> Tous nos produits
          </Link>
          <Link href="#" className="flex items-center gap-2 hover:text-primary">
            <i className="fas fa-book-open"></i> L'histoire de DIVN
          </Link>
          <Link href="#" className="flex items-center gap-2 hover:text-primary">
            <i className="fas fa-question-circle"></i> Besoin d'aide ?
          </Link>
          <Link href="#" className="flex items-center gap-2 hover:text-primary">
            <i className="fas fa-users"></i> The FAM
          </Link>
          <Link href="#" className="flex items-center gap-2 hover:text-primary">
            <i className="fas fa-ship"></i> L’équipage
          </Link>
          <Link href="#" className="flex items-center gap-2 hover:text-primary">
            <i className="fas fa-user-plus"></i> Créer un compte
          </Link>
        </nav>

        <div className="p-4 flex gap-4 border-t">
          <a href="https://www.tiktok.com" target="_blank" rel="noreferrer">
            <i className="fab fa-tiktok text-xl"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram text-xl"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
            <i className="fab fa-twitter text-xl"></i>
          </a>
        </div>
      </aside>
    </>
  );
            }
            
