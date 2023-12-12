import { useEffect, useState } from 'react'
import { CartItem, ShoppingCartContext } from '.'
import { ProviderProps } from '../../interfaces/common'



export const ShoppingCartProvider = ({ children }: ProviderProps) => {
  const loadCart = (): CartItem[] => {
    const cart = localStorage.getItem('cart')
    return (cart) ? JSON.parse(cart) : [];
  }

  const [items, setCartItems] = useState(loadCart());

  const addToCart = (item: CartItem) => {
    const isItemInCart = items.find(cartItem => cartItem.product.id === item.product.id);

    let updated: CartItem[];
    if (isItemInCart) {
      updated = items.map(
        cartItem => (cartItem.product.id === item.product.id)
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else updated = [...items, { ...item, quantity: 1 }]

    setCartItems(updated);
  }

  const removeFromCart = (item: CartItem) => {
    const isItemInCart = items.find(cartItem => cartItem.product.id === item.product.id);

    let updated: CartItem[];
    if (isItemInCart && isItemInCart.quantity === 1) {
      updated = items.filter(cartItem => cartItem.product.id !== item.product.id)
    } else updated = items.map(cartItem => (cartItem.product.id === item.product.id)
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem)

    setCartItems(updated);
  }

  const clearCart = () => setCartItems([])

  const calculateCartTotal = () => {
    const total = items.reduce((total, item) => {
      return total + item.product.price * item.quantity
    }, 0);
    return total;
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const items = loadCart();
    setCartItems(items);
  }, []);

  return (
    <ShoppingCartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        calculateCartTotal,
      }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

