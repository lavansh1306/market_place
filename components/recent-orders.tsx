import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Order, Product } from "@/lib/types"

interface RecentOrdersProps {
  orders: Order[]
  products: Product[]
}

export default function RecentOrders({ orders, products }: RecentOrdersProps) {
  const recentOrders = orders.slice(-10).reverse()

  const getProductName = (productId: string) => {
    return products.find((p) => p.id === productId)?.name || "Unknown Product"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Product</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Quantity</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Total</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4">{getProductName(order.product_id)}</td>
                    <td className="py-3 px-4">{order.quantity}</td>
                    <td className="py-3 px-4 font-semibold">${order.total_price.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-slate-100 text-slate-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{new Date(order.created_at).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
