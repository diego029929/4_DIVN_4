"use client";

import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const HeaderCart = () => <div>Cart test</div>

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/30 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between relative">

          {/* MOBILE MENU */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-64 p-6">
              <nav className="flex flex-col gap-5 mt-8 text-lg font-medium">
                <Link href="/boutique" className="hover:text-primary transition-colors">Boutique</Link>
                <Link href="/boutique?category=homme" className="hover:text-primary">Homme</Link>
                <Link href="/boutique?category=femme" className="hover:text-primary">Femme</Link>
                <Link href="/boutique?category=accessoires" className="hover:text-primary">Accessoires</Link>
                <Link href="/about" className="hover:text-primary">À propos</Link>
                <Link href="/contact" className="hover:text-primary">Contact</Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-8 text-sm tracking-wide uppercase text-muted-foreground font-medium">
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:text-primary transition-colors">
                Boutique
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[170px]">
                <DropdownMenuItem asChild>
                  <Link href="/boutique">Tous les produits</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/boutique?category=homme">Homme</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/boutique?category=femme">Femme</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/boutique?category=accessoires">Accessoires</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/about" className="hover:text-primary transition-colors">À propos</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </nav>

          {/* LOGO CENTERED */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2"
          >
            <h1 className="text-3xl font-semibold tracking-widest text-primary select-none">
              DIVN
            </h1>
          </Link>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">

            {searchOpen ? (
              <div className="flex items-center gap-2">
                <Input
                  type="search"
                  placeholder="Rechercher..."
                  className="w-32 sm:w-56 rounded-xl"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(true)}
                  className="hidden sm:flex"
                >
                  <Search className="h-5 w-5" />
                </Button>

                {/* CART */}
                <HeaderCart />
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
