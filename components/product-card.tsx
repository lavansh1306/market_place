import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const isInStock = product.stock_quantity > 0

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow bg-white h-full flex flex-col">
        {/* Image */}
        <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
          <img
            src={product.image_url || "/placeholder.svg?height=200&width=200"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          {!isInStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <p className="text-sm text-slate-500 mb-1">{product.category}</p>
          <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-sm text-slate-600 mb-4 flex-1 line-clamp-2">{product.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-slate-900">${product.price.toFixed(2)}</span>
            <span className="text-xs text-slate-500">SKU: {product.sku}</span>
          </div>

          <Button className="w-full mt-4" disabled={!isInStock} size="sm">
            {isInStock ? "View Details" : "Unavailable"}
          </Button>
        </div>
      </div>
    </Link>
  )
}
