
"use client"

import Link from "next/link"
import { useState } from "react"

// 🔥 On commente HeaderCart pour debug
// import dynamic from "next/dynamic"
// const HeaderCart = dynamic(() => import("./header-cart"), { ssr: false })

// Composants UI commentés pour le debug
// import { Search, Menu, X } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Contenu temporairement commenté pour isoler le bug */}
      {/*
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <nav>
            <Link href="/boutique">Boutique</Link>
            <Link href="/about">À propos</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <div>
            {searchOpen ? (
              <Input type="search" placeholder="Rechercher..." />
            ) : (
              <>
                <Button onClick={() => setSearchOpen(true)}>Recherche</Button>
                <HeaderCart />
              </>
            )}
          </div>
        </div>
      </div>
      */}
    </header>
  )
}
