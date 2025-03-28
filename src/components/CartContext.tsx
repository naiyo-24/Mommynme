import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient'; // Import Supabase client

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  created_at: string;
  offer?: string; // Optional offer field
  quantity: number;
}

interface CartItem extends Product {
  quantity: number; // Quantity of the product in the cart
}

interface CartContextType {
  cartItems: CartItem[];
  loading: boolean; // Add loading state
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch cart items from Supabase on initial render
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        console.log('User:', user); // Debugging: Check if user is logged in

        if (user) {
          // Fetch cart from Supabase
          const { data, error } = await supabase
            .from('carts')
            .select('items')
            .eq('user_id', user.id)
            .single();

          if (error && error.code !== 'PGRST116') {
            // Handle errors other than "no rows found"
            console.error('Error fetching cart:', error);
          } else {
            // Set cart items (empty array if no cart found)
            setCartItems(data?.items || []);
          }
        } else {
          // Fetch cart from local storage
          const savedCart = localStorage.getItem('cartItems');
          if (savedCart) {
            setCartItems(JSON.parse(savedCart));
          }
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCart();
  }, []);

  // Save cart items to Supabase or local storage whenever they change
  useEffect(() => {
    if (!loading) { // Only save if not loading
      const saveCart = async () => {
        try {
          const { data: { user } } = await supabase.auth.getUser();

          if (user) {
            // Save cart to Supabase
            const { error } = await supabase
              .from('carts')
              .upsert(
                { user_id: user.id, items: cartItems }, // Payload
                { onConflict: 'user_id' } // Conflict resolution
              );

            if (error) {
              console.error('Error saving cart:', error);
            }
          } else {
            // Save cart to local storage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
          }
        } catch (error) {
          console.error('Error saving cart:', error);
        }
      };

      saveCart();
    }
  }, [cartItems, loading]);

  // Add a product to the cart
  const addToCart = (product: Product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Remove a product from the cart
  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Update the quantity of a product in the cart
  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Get the total number of items in the cart
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Get the total price of items in the cart
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading, // Add loading state
        addToCart,
        removeFromCart,
        updateQuantity,
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