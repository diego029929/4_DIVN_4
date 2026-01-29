"use client"

import Image from "next/image"
import { FaTrash } from "react-icons/fa"
import { useState } from "react"

type CartItem = {
  id: string
  name: string
  price: number
  size: string
  image: string
  quantity: number
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: "1",
      name: "T-shirt Oversize",
      price: 29.99,
      size: "M",
      image: "/products/tshirt.jpg",
      quantity: 1,
    },
    {
      id: "2",
      name: "Hoodie Noir",
      price: 59.99,
      size: "L",
      image: "/products/hoodie.jpg",
      quantity: 1,
    },
  ])

  const removeItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id))
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🛒 Mon panier</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border rounded-xl p-4 shadow-sm bg-white"
          >
            {/* Image */}
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              className="rounded-lg object-cover"
            />

            {/* Infos produit */}
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <p className="text-sm text-gray-500">Taille : {item.size}</p>
              <p className="font-bold mt-1">{item.price.toFixed(2)} €</p>
            </div>

            {/* Bouton supprimer */}
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:text-red-700 transition"
              title="Supprimer"
            >
              <FaTrash size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
