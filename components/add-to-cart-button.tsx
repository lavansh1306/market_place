"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"

interface AddToCartButtonProps {
  product: Product
  disabled?: boolean
}

export default function AddToCartButton({ product, disabled = false }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      // Simulate adding to cart
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: product.id,
          quantity,
          total_price: product.price * quantity,
        }),
      })

      if (response.ok) {
        alert(`Added ${quantity} ${quantity === 1 ? "item" : "items"} to cart`)
        setQuantity(1)
      } else {
        alert("Failed to add to cart")
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
      alert("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <label htmlFor="quantity" className="text-sm font-medium text-slate-700">
          Quantity:
        </label>
        <div className="flex items-center border border-slate-300 rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 text-slate-600 hover:bg-slate-100"
            disabled={disabled}
          >
            −
          </button>
          <input
            id="quantity"
            type="number"
            min="1"
            max={product.stock_quantity}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
            className="w-12 text-center border-0 py-2"
            disabled={disabled}
          />
          <button
            onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
            className="px-3 py-2 text-slate-600 hover:bg-slate-100"
            disabled={disabled || quantity >= product.stock_quantity}
          >
            +
          </button>
        </div>
      </div>
      <Button onClick={handleAddToCart} disabled={disabled || isLoading} className="w-full" size="lg">
        {isLoading ? "Adding..." : "Add to Cart"}
      </Button>
    </div>
  )
}
