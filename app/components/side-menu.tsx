"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaBox, FaBookOpen, FaQuestionCircle, FaUsers, FaShip, FaUserPlus } from "react-icons/fa";
import { FaTiktok, FaInstagram, FaTwitter } from "react-icons/fa";

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* BOUTON HAMBURGER FIXE */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 p-2 bg-black text-white rounded-md md:hidden"
      >
        <FaBars size={24} />
      </button>

      {/* OVERLAY */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        />
      )}

      {/* MENU LATERAL */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* HEADER DU MENU */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-lg">Menu</h2>
          <button onClick={toggleMenu}>
            <FaTimes size={24} />
          </button>
        </div>

        {/* LIENS */}
        <ul className="p-4 space-y-4">
          <li>
            <Link href="#" className="flex items-center gap-2 hover:text-primary">
              <FaBox /> Tous nos produits
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center gap-2 hover:text-primary">
              <FaBookOpen /> L'histoire de DIVN
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center gap-2 hover:text-primary">
              <FaQuestionCircle /> Besoin d'aide ?
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center gap-2 hover:text-primary">
              <FaUsers /> The FAM
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center gap-2 hover:text-primary">
              <FaShip /> L’équipage
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center gap-2 hover:text-primary">
              <FaUserPlus /> Créer un compte
            </Link>
          </li>
        </ul>

        {/* RESEAUX SOCIAUX */}
        <div className="p-4 flex gap-4">
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
            <FaTiktok size={24} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={24} />
          </a>
        </div>
      </div>
    </>
  );
        }
              
