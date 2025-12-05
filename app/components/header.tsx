"use client"

import Link from "next/link"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import dynamic from "next/dynamic"

// 🔥 Import dynamique pour éviter l’erreur useCart pendant le build
const HeaderCart = dynamic(() => import("./header-cart"), { ssr: false })

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/boutique" className="text-lg hover:text-primary transition-colors">
                  Boutique
                </Link>
                <Link href="/boutique?category=homme" className="text-lg hover:text-primary transition-colors">
                  Homme
                </Link>
                <Link href="/boutique?category=femme" className="text-lg hover:text-primary transition-colors">
                  Femme
                </Link>
                <Link href="/boutique?category=accessoires" className="text-lg hover:text-primary transition-colors">
                  Accessoires
                </Link>
                <Link href="/about" className="text-lg hover:text-primary transition-colors">
                  À propos
                </Link>
                <Link href="/contact" className="text-lg hover:text-primary transition-colors">
                  Contact
                </Link>
                <Link
                  href="/admin/orders"
                  className="text-lg hover:text-primary transition-colors border-t border-border/40 pt-4 mt-2"
                >
                  Admin
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm hover:text-primary transition-colors">
                Boutique
              </DropdownMenuTrigger>
              <DropdownMenuContent>
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
            <Link href="/about" className="text-sm hover:text-primary transition-colors">
              À propos
            </Link>
            <Link href="/admin/orders" className="text-sm hover:text-primary transition-colors">
              Admin
            </Link>
          </nav>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-2xl font-bold tracking-wider text-primary">DIVN</h1>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {searchOpen ? (
              <div className="flex items-center gap-2">
                <Input type="search" placeholder="Rechercher..." className="w-32 sm:w-48" autoFocus />
                <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} className="hidden sm:flex">
                  <Search className="h-5 w-5" />
                </Button>

                <Link href="/contact" className="hidden lg:block">
                  <Button variant="ghost" className="text-sm">
                    Contact
                  </Button>
                </Link>

                {/* 🔥 Remplacement du panier par HeaderCart */}
                <HeaderCart />
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  )
}
