export interface Service {
  id: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
  features: string[];
  image?: string;
}

export interface Product {
  id: string;
  name_tr: string;
  name_en: string;
  description_tr: string;
  description_en: string;
  price: number;
  category: ProductCategory;
  image_url: string;
  is_active: boolean;
  sort_order: number;
  is_customizable: boolean;
  is_popular?: boolean;
  created_at: string;
}

export type ProductMainCategory = 'photo-supplies' | 'disposable-cameras' | 'customizable-products';

export type ProductSubCategory = 
  | '35mm-color' | '35mm-bw' 
  | '120mm-color' | '120mm-bw'
  | 'disposable'
  | 'mug' | 'magnet' | 'puzzle' | 'keychain' | 'frame' | 'print';

export type ProductCategory = ProductMainCategory | ProductSubCategory;

export interface Order {
  id: string;
  customer_name: string;
  phone_number: string;
  access_code: string;
  film_type: string;
  status: OrderStatus;
  notes: string;
  notification_sent: boolean;
  created_at: string;
  updated_at: string;
  photos?: Photo[];
}

export type OrderStatus = 'processing' | 'ready' | 'delivered';

export interface Photo {
  id: string;
  order_id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  thumbnail_path: string;
  sort_order: number;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface EmailSubscriber {
  id: string;
  email: string;
  name: string;
  language: 'tr' | 'en';
  is_active: boolean;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Language = 'tr' | 'en';
