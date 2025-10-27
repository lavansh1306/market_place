import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardStatsProps {
  stats: {
    totalRevenue: number
    totalOrders: number
    totalProducts: number
    lowStockCount: number
  }
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      description: "From all orders",
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-600",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      description: "Orders placed",
      color: "bg-green-50 border-green-200",
      textColor: "text-green-600",
    },
    {
      title: "Products",
      value: stats.totalProducts,
      description: "In inventory",
      color: "bg-purple-50 border-purple-200",
      textColor: "text-purple-600",
    },
    {
      title: "Low Stock",
      value: stats.lowStockCount,
      description: "Items below 10 units",
      color: "bg-red-50 border-red-200",
      textColor: "text-red-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => (
        <Card key={stat.title} className={`border ${stat.color}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</div>
            <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
