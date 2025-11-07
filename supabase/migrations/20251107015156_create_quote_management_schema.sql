/*
  # Hệ thống Quản lý Báo giá (見積管理)

  ## Tổng quan
  Tạo các bảng cho hệ thống quản lý báo giá bao gồm:
  - Khách hàng (顧客マスタ)
  - Thông tin báo giá chính (見積もり情報)
  - Chi tiết báo giá (見積もり明細情報)
  - Master chi tiết (明細マスタ) - bao gồm sản phẩm, công việc
  - Master giá (原価マスタ)
  - Master nhà cung cấp/đơn vị bên ngoài (外注先マスタ・仕入先マスタ)

  ## Các bảng mới cần tạo

  ### 1. customers (顧客マスタ)
  - `id` (uuid, primary key)
  - `code` (text, unique) - Mã khách hàng
  - `name` (text) - Tên khách hàng
  - `kana_name` (text) - Tên viết bằng katakana
  - `industry` (text) - Ngành công nghiệp
  - `postal_code` (text) - Mã bưu điện
  - `address` (text) - Địa chỉ
  - `phone` (text) - Điện thoại
  - `fax` (text) - Fax
  - `email` (text) - Email
  - `representative_name` (text) - Tên đại diện
  - `payment_terms` (text) - Điều khoản thanh toán
  - `status` (text) - Trạng thái (有効/無効)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. quote_headers (見積もり情報)
  - `id` (uuid, primary key) - ID báo giá
  - `quote_no` (text, unique) - Số báo giá
  - `quote_date` (date) - Ngày báo giá
  - `customer_id` (uuid, FK) - ID khách hàng
  - `title` (text) - Tiêu đề báo giá
  - `description` (text) - Mô tả
  - `representative` (text) - Người đại diện
  - `validity_date` (date) - Ngày hết hạn hiệu lực
  - `payment_terms` (text) - Điều khoản thanh toán
  - `total_amount` (numeric) - Tổng tiền
  - `tax_amount` (numeric) - Tiền thuế
  - `grand_total` (numeric) - Tổng cộng
  - `status` (text) - Trạng thái (下書き/提出/承認/否認)
  - `remarks` (text) - Ghi chú
  - `created_by` (uuid) - Người tạo
  - `approved_by` (uuid) - Người phê duyệt
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. quote_line_items (見積もり明細情報)
  - `id` (uuid, primary key) - ID chi tiết báo giá
  - `quote_header_id` (uuid, FK) - ID báo giá
  - `line_no` (integer) - Số thứ tự dòng
  - `item_type` (text) - Loại mục (商品/作業/外注)
  - `item_id` (uuid) - ID mục (có thể là product, task, hoặc outsourcing)
  - `item_name` (text) - Tên mục
  - `description` (text) - Mô tả chi tiết
  - `quantity` (numeric) - Số lượng
  - `unit` (text) - Đơn vị
  - `unit_price` (numeric) - Giá đơn vị
  - `amount` (numeric) - Thành tiền
  - `remarks` (text) - Ghi chú
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. products (商品マスタ)
  - `id` (uuid, primary key)
  - `code` (text, unique) - Mã sản phẩm
  - `name` (text) - Tên sản phẩm
  - `category` (text) - Danh mục
  - `description` (text) - Mô tả
  - `unit` (text) - Đơn vị
  - `standard_price` (numeric) - Giá tiêu chuẩn
  - `cost_price` (numeric) - Giá vốn
  - `status` (text) - Trạng thái
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 5. tasks (作業マスタ)
  - `id` (uuid, primary key)
  - `code` (text, unique) - Mã công việc
  - `name` (text) - Tên công việc
  - `category` (text) - Danh mục
  - `description` (text) - Mô tả
  - `unit` (text) - Đơn vị (時間/日/式)
  - `standard_price` (numeric) - Giá tiêu chuẩn
  - `cost_price` (numeric) - Giá vốn
  - `status` (text) - Trạng thái
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 6. outsourcing_items (外注先マスタ・仕入先マスタ)
  - `id` (uuid, primary key)
  - `code` (text, unique) - Mã đơn vị bên ngoài
  - `name` (text) - Tên đơn vị bên ngoài
  - `type` (text) - Loại (外注先/仕入先)
  - `category` (text) - Danh mục
  - `description` (text) - Mô tả
  - `unit` (text) - Đơn vị
  - `standard_price` (numeric) - Giá tiêu chuẩn
  - `cost_price` (numeric) - Giá vốn
  - `lead_time` (integer) - Thời gian giao hàng (ngày)
  - `supplier_id` (uuid) - ID nhà cung cấp
  - `status` (text) - Trạng thái
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 7. line_item_templates (借りなどの定型文のマスタ)
  - `id` (uuid, primary key)
  - `code` (text, unique) - Mã mẫu
  - `name` (text) - Tên mẫu
  - `category` (text) - Danh mục (見出し/フッター/注釈)
  - `content` (text) - Nội dung
  - `sort_order` (integer) - Thứ tự sắp xếp
  - `status` (text) - Trạng thái
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 8. quote_line_item_templates (見積もり明細の選択肢をもつマスタ)
  - `id` (uuid, primary key)
  - `template_id` (uuid, FK) - ID mẫu
  - `item_type` (text) - Loại mục
  - `item_id` (uuid) - ID mục
  - `sort_order` (integer) - Thứ tự sắp xếp
  - `created_at` (timestamptz)

  ### 9. cost_masters (原価マスタ)
  - `id` (uuid, primary key)
  - `item_id` (uuid) - ID mục (product/task/outsourcing)
  - `item_type` (text) - Loại mục (商品/作業/外注)
  - `cost_type` (text) - Loại chi phí (材料/人件費/その他)
  - `amount` (numeric) - Số tiền
  - `effective_date` (date) - Ngày có hiệu lực
  - `end_date` (date) - Ngày kết thúc
  - `remarks` (text) - Ghi chú
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 10. suppliers (仕入先マスタ)
  - `id` (uuid, primary key)
  - `code` (text, unique) - Mã nhà cung cấp
  - `name` (text) - Tên nhà cung cấp
  - `category` (text) - Danh mục
  - `postal_code` (text) - Mã bưu điện
  - `address` (text) - Địa chỉ
  - `phone` (text) - Điện thoại
  - `fax` (text) - Fax
  - `email` (text) - Email
  - `representative_name` (text) - Tên đại diện
  - `payment_terms` (text) - Điều khoản thanh toán
  - `status` (text) - Trạng thái
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

## Bảng đã tồn tại (sẽ cập nhật nếu cần)
*/

-- 1. Khách hàng Master
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  kana_name text,
  industry text,
  postal_code text,
  address text,
  phone text,
  fax text,
  email text,
  representative_name text,
  payment_terms text,
  status text DEFAULT '有効' CHECK (status IN ('有効', '無効')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read customers"
  ON customers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage customers"
  ON customers FOR ALL
  TO authenticated
  USING (auth.jwt()->>'role' = 'admin')
  WITH CHECK (auth.jwt()->>'role' = 'admin');

-- 2. Sản phẩm Master
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  category text,
  description text,
  unit text DEFAULT '個',
  standard_price numeric DEFAULT 0,
  cost_price numeric DEFAULT 0,
  status text DEFAULT '有効' CHECK (status IN ('有効', '無効')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read products"
  ON products FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage products"
  ON products FOR ALL
  TO authenticated
  USING (auth.jwt()->>'role' = 'admin')
  WITH CHECK (auth.jwt()->>'role' = 'admin');

-- 3. Công việc Master
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  category text,
  description text,
  unit text DEFAULT '時間',
  standard_price numeric DEFAULT 0,
  cost_price numeric DEFAULT 0,
  status text DEFAULT '有効' CHECK (status IN ('有効', '無効')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read tasks"
  ON tasks FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage tasks"
  ON tasks FOR ALL
  TO authenticated
  USING (auth.jwt()->>'role' = 'admin')
  WITH CHECK (auth.jwt()->>'role' = 'admin');

-- 4. Nhà cung cấp Master
CREATE TABLE IF NOT EXISTS suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  category text,
  postal_code text,
  address text,
  phone text,
  fax text,
  email text,
  representative_name text,
  payment_terms text,
  status text DEFAULT '有効' CHECK (status IN ('有効', '無効')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read suppliers"
  ON suppliers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage suppliers"
  ON suppliers FOR ALL
  TO authenticated
  USING (auth.jwt()->>'role' = 'admin')
  WITH CHECK (auth.jwt()->>'role' = 'admin');

-- 5. Mục đơn vị bên ngoài / Nhà cung cấp
CREATE TABLE IF NOT EXISTS outsourcing_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  type text CHECK (type IN ('外注先', '仕入先')),
  category text,
  description text,
  unit text DEFAULT '式',
  standard_price numeric DEFAULT 0,
  cost_price numeric DEFAULT 0,
  lead_time integer DEFAULT 0,
  supplier_id uuid REFERENCES suppliers(id),
  status text DEFAULT '有効' CHECK (status IN ('有効', '無効')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE outsourcing_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read outsourcing_items"
  ON outsourcing_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage outsourcing_items"
  ON outsourcing_items FOR ALL
  TO authenticated
  USING (auth.jwt()->>'role' = 'admin')
  WITH CHECK (auth.jwt()->>'role' = 'admin');

-- 6. Mẫu định dạng chi tiết báo giá
CREATE TABLE IF NOT EXISTS line_item_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  category text CHECK (category IN ('見出し', 'フッター', '注釈')),
  content text NOT NULL,
  sort_order integer DEFAULT 0,
  status text DEFAULT '有効' CHECK (status IN ('有効', '無効')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE line_item_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read line_item_templates"
  ON line_item_templates FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage line_item_templates"
  ON line_item_templates FOR ALL
  TO authenticated
  USING (auth.jwt()->>'role' = 'admin')
  WITH CHECK (auth.jwt()->>'role' = 'admin');

-- 7. Mục mẫu báo giá
CREATE TABLE IF NOT EXISTS quote_line_item_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid NOT NULL REFERENCES line_item_templates(id) ON DELETE CASCADE,
  item_type text CHECK (item_type IN ('商品', '作業', '外注')),
  item_id uuid NOT NULL,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quote_line_item_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read quote_line_item_templates"
  ON quote_line_item_templates FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage quote_line_item_templates"
  ON quote_line_item_templates FOR ALL
  TO authenticated
  USING (auth.jwt()->>'role' = 'admin')
  WITH CHECK (auth.jwt()->>'role' = 'admin');

-- 8. Master chi phí
CREATE TABLE IF NOT EXISTS cost_masters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id uuid NOT NULL,
  item_type text CHECK (item_type IN ('商品', '作業', '外注')),
  cost_type text CHECK (cost_type IN ('材料', '人件費', 'その他')),
  amount numeric NOT NULL,
  effective_date date DEFAULT CURRENT_DATE,
  end_date date,
  remarks text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE cost_masters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read cost_masters"
  ON cost_masters FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage cost_masters"
  ON cost_masters FOR ALL
  TO authenticated
  USING (auth.jwt()->>'role' = 'admin')
  WITH CHECK (auth.jwt()->>'role' = 'admin');

-- 9. Tiêu đề báo giá
CREATE TABLE IF NOT EXISTS quote_headers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_no text UNIQUE NOT NULL,
  quote_date date DEFAULT CURRENT_DATE,
  customer_id uuid NOT NULL REFERENCES customers(id),
  title text NOT NULL,
  description text,
  representative text,
  validity_date date,
  payment_terms text,
  total_amount numeric DEFAULT 0,
  tax_amount numeric DEFAULT 0,
  grand_total numeric DEFAULT 0,
  status text DEFAULT '下書き' CHECK (status IN ('下書き', '提出', '承認', '否認')),
  remarks text,
  created_by uuid REFERENCES accounts(id),
  approved_by uuid REFERENCES accounts(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE quote_headers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read quote_headers"
  ON quote_headers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create and edit own quotes"
  ON quote_headers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can edit own quotes"
  ON quote_headers FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Admins can manage all quotes"
  ON quote_headers FOR ALL
  TO authenticated
  USING (auth.jwt()->>'role' = 'admin')
  WITH CHECK (auth.jwt()->>'role' = 'admin');

-- 10. Chi tiết báo giá
CREATE TABLE IF NOT EXISTS quote_line_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_header_id uuid NOT NULL REFERENCES quote_headers(id) ON DELETE CASCADE,
  line_no integer NOT NULL,
  item_type text CHECK (item_type IN ('商品', '作業', '外注', '見出し', 'フッター', '注釈')),
  item_id uuid,
  item_name text NOT NULL,
  description text,
  quantity numeric DEFAULT 1,
  unit text DEFAULT '個',
  unit_price numeric DEFAULT 0,
  amount numeric DEFAULT 0,
  remarks text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(quote_header_id, line_no)
);

ALTER TABLE quote_line_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read quote_line_items"
  ON quote_line_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage own quote line items"
  ON quote_line_items FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM quote_headers
      WHERE quote_headers.id = quote_header_id
      AND quote_headers.created_by = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all quote line items"
  ON quote_line_items FOR ALL
  TO authenticated
  USING (auth.jwt()->>'role' = 'admin')
  WITH CHECK (auth.jwt()->>'role' = 'admin');

-- Tạo Index
CREATE INDEX IF NOT EXISTS idx_customers_code ON customers(code);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_products_code ON products(code);
CREATE INDEX IF NOT EXISTS idx_tasks_code ON tasks(code);
CREATE INDEX IF NOT EXISTS idx_suppliers_code ON suppliers(code);
CREATE INDEX IF NOT EXISTS idx_outsourcing_items_code ON outsourcing_items(code);
CREATE INDEX IF NOT EXISTS idx_quote_headers_quote_no ON quote_headers(quote_no);
CREATE INDEX IF NOT EXISTS idx_quote_headers_customer_id ON quote_headers(customer_id);
CREATE INDEX IF NOT EXISTS idx_quote_headers_created_by ON quote_headers(created_by);
CREATE INDEX IF NOT EXISTS idx_quote_line_items_quote_header_id ON quote_line_items(quote_header_id);
CREATE INDEX IF NOT EXISTS idx_cost_masters_item_id ON cost_masters(item_id);
CREATE INDEX IF NOT EXISTS idx_line_item_templates_code ON line_item_templates(code);

-- Hàm tự động cập nhật updated_at
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_suppliers_updated_at BEFORE UPDATE ON suppliers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_outsourcing_items_updated_at BEFORE UPDATE ON outsourcing_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quote_headers_updated_at BEFORE UPDATE ON quote_headers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quote_line_items_updated_at BEFORE UPDATE ON quote_line_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cost_masters_updated_at BEFORE UPDATE ON cost_masters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
