import { createContext } from "react";
import { Product } from '../../interfaces/entities/product.interface';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShoppingCartContextProps {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
  calculateCartTotal: () => number;
}

export const ShoppingCartContext = createContext<ShoppingCartContextProps>({} as ShoppingCartContextProps);