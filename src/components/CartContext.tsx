import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  created_at: string;
  offer?: string;
  quantity: number;
  colors?: string[]; // Add colors to Product interface
}

interface CartItem extends Product {
  quantity: number;
  selectedColor?: string; // Add selectedColor to CartItem
}

interface CartContextType {
  cartItems: CartItem[];
  loading: boolean;
  addToCart: (product: Product, selectedColor?: string) => void; // Update to include color
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateColor: (id: string, color: string) => void; // Add method to update color
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data, error } = await supabase
            .from('carts')
            .select('items')
            .eq('user_id', user.id)
            .single();

          if (error && error.code !== 'PGRST116') {
            console.error('Error fetching cart:', error);
          } else {
            setCartItems(data?.items || []);
          }
        } else {
          const savedCart = localStorage.getItem('cartItems');
          if (savedCart) {
            setCartItems(JSON.parse(savedCart));
          }
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    if (!loading) {
      const saveCart = async () => {
        try {
          const { data: { user } } = await supabase.auth.getUser();

          if (user) {
            await supabase
              .from('carts')
              .upsert(
                { user_id: user.id, items: cartItems },
                { onConflict: 'user_id' }
              );
          } else {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
          }
        } catch (error) {
          console.error('Error saving cart:', error);
        }
      };

      saveCart();
    }
  }, [cartItems, loading]);

  const addToCart = (product: Product, selectedColor?: string) => {
    const existingItem = cartItems.find((item) => 
      item.id === product.id && item.selectedColor === selectedColor
    );

    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { 
        ...product, 
        quantity: 1, 
        selectedColor 
      }]);
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const updateColor = (id: string, color: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, selectedColor: color } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateColor,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};