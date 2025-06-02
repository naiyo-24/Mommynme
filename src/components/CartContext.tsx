import React, { createContext, useContext, useEffect, useState } from 'react';

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
  colors?: string[];
  item_code?: string;
  stock_uom?: string;
  standard_rate?: number;
  brand?: string | null;
}

interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  loading: boolean;
  addToCart: (product: Product, selectedColor?: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateColor: (id: string, color: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load cart from local storage
    const fetchCart = () => {
      try {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    // Save cart to local storage whenever it changes
    if (!loading) {
      try {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    }
  }, [cartItems, loading]);

  const addToCart = (product: Product, selectedColor?: string) => {
    setCartItems(prevCart => {
      // Check if product is already in cart
      const existingProductIndex = prevCart.findIndex(
        item => item.id === product.id && item.selectedColor === selectedColor
      );

      if (existingProductIndex !== -1) {
        // If product exists, increase quantity
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1
        };
        return updatedCart;
      } else {
        // If product doesn't exist, add it to cart
        return [...prevCart, { ...product, quantity: 1, selectedColor }];
      }
    });
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
    return cartItems.reduce((total, item) => {
      // Calculate discounted price if there's an offer
      const price = item.offer 
        ? item.price - (item.price * (parseFloat(item.offer) / 100))
        : item.price;
      return total + price * item.quantity;
    }, 0);
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