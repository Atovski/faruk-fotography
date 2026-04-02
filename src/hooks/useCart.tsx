'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

// For now, let's just use any or Product for the product inside cart. Since ProductExt has mainCategory and images, we can use an extended product type.
export interface CartProduct {
  id: string;
  name_tr: string;
  name_en: string;
  price: number;
  image_url: string;
  images?: string[];
  stock: number;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: CartProduct, quantity?: number) => void;
  updateQty: (id: string, delta: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  total: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('faruk_cart');
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse cart');
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('faruk_cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (product: CartProduct, quantity: number = 1) => {
    setCart(prev => {
      const ex = prev.find(i => i.product.id === product.id);
      if (ex) {
        const newQty = Math.min(ex.quantity + quantity, product.stock);
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: newQty } : i);
      }
      return [...prev, { product, quantity: Math.min(quantity, product.stock) }];
    });
    setCartOpen(true);
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => 
      prev.map(i => {
        if (i.product.id === id) {
          const newQty = Math.max(0, Math.min(i.quantity + delta, i.product.stock));
          return { ...i, quantity: newQty };
        }
        return i;
      }).filter(i => i.quantity > 0)
    );
  };

  const setQty = (id: string, qty: number) => {
    setCart(prev => 
      prev.map(i => {
        if (i.product.id === id) {
          const newQty = Math.max(0, Math.min(qty, i.product.stock));
          return { ...i, quantity: newQty };
        }
        return i;
      }).filter(i => i.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.product.id !== id));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart, cartOpen, setCartOpen, addToCart, updateQty, setQty, removeFromCart, clearCart, total, totalItems
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
