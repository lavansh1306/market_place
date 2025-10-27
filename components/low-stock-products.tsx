import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Product } from "@/lib/types"

interface LowStockProductsProps {
  products: Product[]
}

export default function LowStockProducts({ products }: LowStockProductsProps) {
  const lowStockProducts = products.filter((p) => p.stock_quantity < 10).slice(0, 5)

  return (
    <Card className="border-red-200 bg-red-50">
      <CardHeader>
        <CardTitle className="text-red-900">Low Stock Alert</CardTitle>
      </CardHeader>
      <CardContent>
        {lowStockProducts.length > 0 ? (
          <div className="space-y-3">
            {lowStockProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-100"
              >
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{product.name}</p>
                  <p className="text-xs text-slate-600">{product.sku}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-600">{product.stock_quantity}</p>
                  <p className="text-xs text-slate-600">units</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-600 text-sm">All products have sufficient stock</p>
        )}
      </CardContent>
    </Card>
  )
}
