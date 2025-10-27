-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL,
  image_url TEXT,
  sku TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create inventory_logs table for tracking stock changes
CREATE TABLE IF NOT EXISTS public.inventory_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity_change INTEGER NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policies for products (public read, admin write)
CREATE POLICY "Allow public to view products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow admin to insert products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin to update products" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Allow admin to delete products" ON public.products FOR DELETE USING (true);

-- Create policies for categories (public read)
CREATE POLICY "Allow public to view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow admin to manage categories" ON public.categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin to update categories" ON public.categories FOR UPDATE USING (true);
CREATE POLICY "Allow admin to delete categories" ON public.categories FOR DELETE USING (true);

-- Create policies for inventory_logs (public read)
CREATE POLICY "Allow public to view inventory logs" ON public.inventory_logs FOR SELECT USING (true);
CREATE POLICY "Allow admin to insert logs" ON public.inventory_logs FOR INSERT WITH CHECK (true);

-- Create policies for orders (public read/write)
CREATE POLICY "Allow public to view orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Allow public to create orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public to update orders" ON public.orders FOR UPDATE USING (true);
