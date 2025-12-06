"use client";

import { useState } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function SideMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Bouton Burger */}
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      {/* Menu latéral */}
      <SheetContent side="left" className="w-72 p-0">
        <div className="flex flex-col h-full">

          {/* Header */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setOpen(false)}
              className="text-3xl leading-none"
            >
              &times;
            </button>
          </div>

          {/* Liens */}
          <nav className="px-6 space-y-5">
            <Link href="/boutique" className="flex items-center gap-3 text-lg">
              <i className="fas fa-box"></i> Tous nos produits
            </Link>
            <Link href="/about" className="flex items-center gap-3 text-lg">
              <i className="fas fa-book-open"></i> L'histoire de DIVN
            </Link>
            <Link href="/faq" className="flex items-center gap-3 text-lg">
              <i className="fas fa-question-circle"></i> Besoin d'aide ?
            </Link>
            <Link href="#" className="flex items-center gap-3 text-lg">
              <i className="fas fa-users"></i> The FAM
            </Link>
            <Link href="#" className="flex items-center gap-3 text-lg">
              <i className="fas fa-ship"></i> L’équipage
            </Link>
            <Link href="/signup" className="flex items-center gap-3 text-lg">
              <i className="fas fa-user-plus"></i> Créer un compte
            </Link>
          </nav>

          {/* Réseaux sociaux */}
          <div className="mt-auto px-6 pb-6 flex gap-6 text-2xl">
            <a href="https://tiktok.com" target="_blank" className="hover:text-primary">
              <i className="fab fa-tiktok"></i>
            </a>
            <a href="https://instagram.com" target="_blank" className="hover:text-primary">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com" target="_blank" className="hover:text-primary">
              <i className="fab fa-twitter"></i>
            </a>
          </div>

        </div>
      </SheetContent>
    </Sheet>
  );
}
