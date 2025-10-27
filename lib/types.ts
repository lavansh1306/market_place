export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  stock_quantity: number
  category: string
  image_url: string | null
  sku: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  description: string | null
  created_at: string
}

export interface Order {
  id: string
  product_id: string
  quantity: number
  total_price: number
  status: string
  created_at: string
  updated_at: string
}

export interface InventoryLog {
  id: string
  product_id: string
  quantity_change: number
  reason: string
  created_at: string
}
