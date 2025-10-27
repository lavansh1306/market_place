import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import AddToCartButton from "@/components/add-to-cart-button"
import type { Product } from "@/lib/types"

export const revalidate = 1800 // Revalidate every 30 minutes (ISR)

async function getProduct(id: string): Promise<Product | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error || !data) {
    return null
  }

  return data
}

async function getRelatedProducts(category: string, currentId: string): Promise<Product[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .neq("id", currentId)
    .limit(4)

  if (error) {
    return []
  }

  return data || []
}

export async function generateStaticParams() {
  const supabase = await createClient()

  const { data } = await supabase.from("products").select("id")

  return (data || []).map((product) => ({
    id: product.id,
  }))
}

interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.category, product.id)
  const isInStock = product.stock_quantity > 0

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="px-4 py-4 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-blue-600 hover:underline">
              Home
            </Link>
            <span className="text-slate-400">/</span>
            <Link href="/products" className="text-blue-600 hover:underline">
              Products
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-600">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Image */}
            <div className="bg-white rounded-lg p-6 flex items-center justify-center min-h-96">
              <img
                src={product.image_url || "/placeholder.svg?height=400&width=400"}
                alt={product.name}
                className="max-w-full max-h-96 object-contain"
              />
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-slate-500 mb-2">{product.category}</p>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{product.name}</h1>
                <p className="text-slate-600">{product.description}</p>
              </div>

              <div className="border-t border-b border-slate-200 py-6 space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
                  <span className="text-sm text-slate-500">SKU: {product.sku}</span>
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Stock Available</p>
                    <p className={`text-lg font-semibold ${isInStock ? "text-green-600" : "text-red-600"}`}>
                      {isInStock ? `${product.stock_quantity} units` : "Out of Stock"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <AddToCartButton product={product} disabled={!isInStock} />
                <Link href="/products">
                  <Button variant="outline" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              {/* Product Info */}
              <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                <h3 className="font-semibold text-slate-900">Product Information</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>SKU: {product.sku}</li>
                  <li>Category: {product.category}</li>
                  <li>Added: {new Date(product.created_at).toLocaleDateString()}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="w-full h-40 bg-slate-100">
                        <img
                          src={relatedProduct.image_url || "/placeholder.svg?height=160&width=160"}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-slate-900 line-clamp-2 mb-2">{relatedProduct.name}</h3>
                        <p className="text-lg font-bold text-slate-900">${relatedProduct.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
