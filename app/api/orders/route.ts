import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          product_id: body.product_id,
          quantity: body.quantity,
          total_price: body.total_price,
          status: "pending",
        },
      ])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Update product stock
    const { data: product } = await supabase
      .from("products")
      .select("stock_quantity")
      .eq("id", body.product_id)
      .single()

    if (product) {
      await supabase
        .from("products")
        .update({ stock_quantity: product.stock_quantity - body.quantity })
        .eq("id", body.product_id)

      // Log inventory change
      await supabase.from("inventory_logs").insert([
        {
          product_id: body.product_id,
          quantity_change: -body.quantity,
          reason: "Order placed",
        },
      ])
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
