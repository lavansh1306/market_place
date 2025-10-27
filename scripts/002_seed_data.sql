-- Insert categories
INSERT INTO public.categories (name, description) VALUES
  ('Electronics', 'Electronic devices and gadgets'),
  ('Clothing', 'Apparel and fashion items'),
  ('Books', 'Physical and digital books'),
  ('Home & Garden', 'Home improvement and garden supplies'),
  ('Sports', 'Sports equipment and accessories')
ON CONFLICT (name) DO NOTHING;

-- Insert sample products
INSERT INTO public.products (name, description, price, stock_quantity, category, sku, image_url) VALUES
  ('Wireless Headphones', 'High-quality wireless headphones with noise cancellation', 79.99, 45, 'Electronics', 'WH-001', '/placeholder.svg?height=300&width=300'),
  ('USB-C Cable', 'Durable USB-C charging cable, 2 meters', 12.99, 150, 'Electronics', 'USB-001', '/placeholder.svg?height=300&width=300'),
  ('Cotton T-Shirt', 'Comfortable 100% cotton t-shirt', 19.99, 200, 'Clothing', 'TSHIRT-001', '/placeholder.svg?height=300&width=300'),
  ('Running Shoes', 'Professional running shoes with cushioning', 89.99, 60, 'Sports', 'SHOES-001', '/placeholder.svg?height=300&width=300'),
  ('JavaScript Guide', 'Complete guide to modern JavaScript', 34.99, 80, 'Books', 'BOOK-001', '/placeholder.svg?height=300&width=300'),
  ('Desk Lamp', 'LED desk lamp with adjustable brightness', 44.99, 35, 'Home & Garden', 'LAMP-001', '/placeholder.svg?height=300&width=300'),
  ('Yoga Mat', 'Non-slip yoga mat, 6mm thickness', 29.99, 90, 'Sports', 'YOGA-001', '/placeholder.svg?height=300&width=300'),
  ('Wireless Mouse', 'Ergonomic wireless mouse with precision tracking', 24.99, 120, 'Electronics', 'MOUSE-001', '/placeholder.svg?height=300&width=300'),
  ('Coffee Maker', 'Programmable coffee maker, 12-cup capacity', 59.99, 25, 'Home & Garden', 'COFFEE-001', '/placeholder.svg?height=300&width=300'),
  ('Winter Jacket', 'Waterproof winter jacket with insulation', 129.99, 40, 'Clothing', 'JACKET-001', '/placeholder.svg?height=300&width=300')
ON CONFLICT (sku) DO NOTHING;
