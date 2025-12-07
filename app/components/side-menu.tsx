"use client";
import { useState } from "react";

export function SideMenu({ sideOpen, setSideOpen }) {
  return (
    <>
      <div
        className={`overlay ${sideOpen ? "show" : ""}`}
        onClick={() => setSideOpen(false)}
      ></div>

      <div className={`side-menu ${sideOpen ? "active" : ""}`}>
        <div className="menu-content">
          <div className="side-menu-header" onClick={() => setSideOpen(false)}>
            ×
          </div>

          <ul>
            <li><Link href="/boutique">Boutique</Link></li>
            <li><Link href="/boutique?category=homme">Homme</Link></li>
            <li><Link href="/boutique?category=femme">Femme</Link></li>
            <li><Link href="/boutique?category=accessoires">Accessoires</Link></li>
            <li><Link href="/about">À propos</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
}
