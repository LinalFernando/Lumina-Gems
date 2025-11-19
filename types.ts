export enum GemCategory {
  PRECIOUS = 'Precious',
  SEMI_PRECIOUS = 'Semi-Precious',
  ORGANIC = 'Organic',
  RARE = 'Rare'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: GemCategory;
  carat: number;
  origin: string;
  imageUrl: string;
  cut: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type ViewState = 'HOME' | 'CATALOG' | 'PRODUCT_DETAIL' | 'CART' | 'CHECKOUT';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}