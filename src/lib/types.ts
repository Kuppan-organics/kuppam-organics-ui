export interface ProductVariant {
  quantity: string;
  price: number;
  discount: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  badge?: 'organic' | 'bestseller' | 'new' | 'sale';
  weight: string;
  inStock: boolean;
  nutritionalInfo?: string;
  farmingMethod?: string;
  variants?: ProductVariant[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  productCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar?: string;
}

export interface Outlet {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  timings: string;
  mapUrl?: string;
}
