import { useCart } from './CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from "../utils/supabaseClient";

// Define the Product interface
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

// Define the CartItem interface
interface CartItem extends Product {
  quantity: number; // Quantity of the product in the cart
}

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    addToCart,
  } = useCart();

  const [allProducts, setAllProducts] = useState<Product[]>([]);

  // Fetch all products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products') // Replace 'products' with your table name
          .select('*');

        if (error) throw error;
        setAllProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Calculate total savings based on offers
  const calculateSavings = (items: CartItem[]) => {
    return items.reduce((totalSavings, item: CartItem) => {
      if (item.offer) {
        const discountPercentage = parseFloat(item.offer); // e.g., "10% off" -> 10
        if (!isNaN(discountPercentage)) {
          const discount = (item.price * item.quantity * discountPercentage) / 100;
          return totalSavings + discount;
        }
      }
      return totalSavings;
    }, 0);
  };

  const totalSavings = calculateSavings(cartItems);
  const totalPrice = getTotalPrice();
  const finalPrice = totalPrice - totalSavings;

  // Function to get recommended products
  const getRecommendedProducts = (cartItems: CartItem[], allProducts: Product[]) => {
    if (cartItems.length === 0) {
      // If the cart is empty, return random products
      return allProducts.sort(() => 0.5 - Math.random()).slice(0, 3);
    }

    // Get categories of products in the cart
    const categories = Array.from(new Set(cartItems.map((item: CartItem) => item.category)));

    // Filter products that belong to the same categories as the cart items
    const recommendedProducts = allProducts.filter(
      (product) =>
        categories.includes(product.category) &&
        !cartItems.some((item: CartItem) => item.id === product.id) // Exclude items already in the cart
    );

    // If there are not enough recommended products, add random products
    if (recommendedProducts.length < 3) {
      const randomProducts = allProducts
        .filter((product) => !cartItems.some((item: CartItem) => item.id === product.id))
        .sort(() => 0.5 - Math.random())
        .slice(0, 3 - recommendedProducts.length);
      return [...recommendedProducts, ...randomProducts];
    }

    return recommendedProducts.slice(0, 3); // Return up to 3 recommended products
  };

  const recommendedProducts = getRecommendedProducts(cartItems, allProducts);

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-6 sm:mb-8 text-center py-8">
        Your Shopping Cart
      </h1>
      {cartItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-gray-600"
        >
          <p className="text-lg">Your cart is empty.</p>
          <p className="mt-2">
            Explore our{' '}
            <a href="/products" className="text-purple-600 underline hover:text-purple-700">
              products
            </a>{' '}
            to add items to your cart.
          </p>
        </motion.div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <AnimatePresence>
            {cartItems.map((item: CartItem) => {
              const discountPercentage = item.offer ? parseFloat(item.offer) : 0;
              const discount = !isNaN(discountPercentage)
                ? (item.price * discountPercentage) / 100
                : 0;
              const offerPrice = item.price - discount;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-6"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image || 'fallback-image.jpg'}
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                    />
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold text-purple-900">
                        {item.name}
                      </h2>
                      <div className="flex items-center space-x-2">
                        <p className="text-gray-600 line-through">
                          ₹{item.price.toFixed(2)}
                        </p>
                        <p className="text-green-600 font-semibold">
                          ₹{offerPrice.toFixed(2)}
                        </p>
                      </div>
                      {item.offer && (
                        <p className="text-sm text-green-600">
                          {item.offer} off
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                      min="1"
                      className="w-16 px-2 py-1 border rounded-lg text-center focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Total and Savings Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mt-6 sm:mt-8"
          >
            <div className="space-y-4">
              {/* Display Total Items */}
              <div className="flex justify-between">
                <p className="text-gray-600">Total Items</p>
                <p className="text-purple-900 font-semibold">
                  {getTotalItems()} items
                </p>
              </div>

              {/* Subtotal */}
              <div className="flex justify-between">
                <p className="text-gray-600">Subtotal</p>
                <p className="text-purple-900 font-semibold">
                  ₹{totalPrice.toFixed(2)}
                </p>
              </div>

              {/* Savings */}
              <div className="flex justify-between">
                <p className="text-gray-600">Savings</p>
                <p className="text-green-600 font-semibold">
                  -₹{totalSavings.toFixed(2)}
                </p>
              </div>

              {/* Total Price */}
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <p className="text-xl font-bold text-purple-900">Total</p>
                  <p className="text-2xl font-bold text-purple-900">
                    ₹{finalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Clear Cart and Checkout Buttons */}
            <button
              onClick={clearCart}
              className="w-full mt-4 sm:mt-6 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Clear Cart
            </button>
            <button
              onClick={() => alert('Proceeding to checkout...')}
              className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </motion.div>

          {/* You Might Also Like Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 sm:mt-8"
          >
            <h2 className="text-2xl font-bold text-purple-900 mb-4">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {recommendedProducts.map((product: Product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <img
                    src={product.image || 'fallback-image.jpg'}
                    alt={product.name}
                    className="w-full h-32 sm:h-40 object-cover rounded-lg"
                  />
                  <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                  <p className="text-gray-600">₹{product.price.toFixed(2)}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CartPage;