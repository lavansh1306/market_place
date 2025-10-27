import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import type { Product } from "@/lib/types"

export const revalidate = 3600 // Revalidate every hour (SSG)

async function getProducts(): Promise<Product[]> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("products").select("*").limit(12)

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return data || []
}

async function getCategories() {
  const supabase = await createClient()

  const { data, error } = await supabase.from("categories").select("*")

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return data || []
}

export default async function Home() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()])

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 text-balance">
              Welcome to NextMart
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto text-balance">
              Your premier inventory management platform. Browse our extensive catalog of quality products across
              multiple categories.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="#products">
                <Button size="lg">Browse Products</Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="px-4 py-12 bg-white border-y border-slate-200">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${encodeURIComponent(category.name)}`}
                  className="p-4 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
                >
                  <p className="font-semibold text-slate-900">{category.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section id="products" className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Featured Products</h2>
            <Link href="/products">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600">No products available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold mb-2">{products.length}+</p>
              <p className="text-slate-300">Products in Stock</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">{categories.length}</p>
              <p className="text-slate-300">Categories</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">24/7</p>
              <p className="text-slate-300">Customer Support</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
