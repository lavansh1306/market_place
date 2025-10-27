import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import DashboardStats from "@/components/dashboard-stats"
import RecentOrders from "@/components/recent-orders"
import LowStockProducts from "@/components/low-stock-products"

// SSR - No caching, always fresh data
export const revalidate = 0

async function getStats() {
  const supabase = await createClient()

  const [productsRes, ordersRes, categoriesRes] = await Promise.all([
    supabase.from("products").select("*"),
    supabase.from("orders").select("*"),
    supabase.from("categories").select("*"),
  ])

  const products = productsRes.data || []
  const orders = ordersRes.data || []
  const categories = categoriesRes.data || []

  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total_price), 0)
  const totalOrders = orders.length
  const totalProducts = products.length
  const lowStockCount = products.filter((p) => p.stock_quantity < 10).length

  return {
    totalRevenue,
    totalOrders,
    totalProducts,
    lowStockCount,
    products,
    orders,
    categories,
  }
}

export default async function DashboardPage() {
  const stats = await getStats()

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600 mt-1">Real-time inventory and sales overview</p>
          </div>
          <Link href="/admin">
            <Button>Admin Panel</Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <DashboardStats stats={stats} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <RecentOrders orders={stats.orders} products={stats.products} />
          </div>

          {/* Low Stock Alert */}
          <div>
            <LowStockProducts products={stats.products} />
          </div>
        </div>
      </div>
    </main>
  )
}
