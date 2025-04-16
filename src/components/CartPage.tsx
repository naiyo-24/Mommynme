import { useCart } from './CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

// Define the Product interface
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
}

// Define the CartItem interface
interface CartItem extends Product {
  quantity: number;
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

  // Example product data to replace Supabase call
  const exampleProducts: Product[] = [
    {
      id: "1",
      name: "Premium Yoga Mat",
      price: 2499,
      category: "Fitness",
      description: "Eco-friendly yoga mat with perfect grip",
      image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f",
      created_at: "2023-06-15",
      offer: "15",
      quantity: 20
    },
    {
      id: "2",
      name: "Wireless Earbuds",
      price: 1799,
      category: "Electronics",
      description: "Crystal clear sound with noise cancellation",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
      created_at: "2023-07-10",
      offer: "10",
      quantity: 15
    },
    {
      id: "3",
      name: "Organic Cotton T-Shirt",
      price: 899,
      category: "Clothing",
      description: "100% organic cotton, comfortable fit",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
      created_at: "2023-05-22",
      quantity: 30
    },
    {
      id: "4",
      name: "Stainless Steel Water Bottle",
      price: 649,
      category: "Accessories",
      description: "Keeps drinks cold for 24 hours",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
      created_at: "2023-08-05",
      offer: "20",
      quantity: 25
    },
    {
      id: "5",
      name: "Smart Fitness Tracker",
      price: 1999,
      category: "Fitness",
      description: "Track your steps, heart rate, and sleep patterns",
      image: "https://images.unsplash.com/photo-1551645120-d70bfe84c826",
      created_at: "2023-09-12",
      quantity: 18
    }
  ];

  // Fetch all products - replaced Supabase with example data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Replace this with your actual API call if needed:
        // const response = await fetch('your-api-endpoint/products');
        // const data = await response.json();
        // setAllProducts(data);
        
        setAllProducts(exampleProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to example data if API fails
        setAllProducts(exampleProducts);
      }
    };

    fetchProducts();
  }, []);

  // Calculate total savings based on offers
  const calculateSavings = (items: CartItem[]) => {
    return items.reduce((totalSavings, item: CartItem) => {
      if (item.offer) {
        const discountPercentage = parseFloat(item.offer);
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
        !cartItems.some((item: CartItem) => item.id === product.id)
    );

    // If there are not enough recommended products, add random products
    if (recommendedProducts.length < 3) {
      const randomProducts = allProducts
        .filter((product) => !cartItems.some((item: CartItem) => item.id === product.id))
        .sort(() => 0.5 - Math.random())
        .slice(0, 3 - recommendedProducts.length);
      return [...recommendedProducts, ...randomProducts];
    }

    return recommendedProducts.slice(0, 3);
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
                      src={item.image || 'https://placehold.co/600x400'}
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/600x400';
                      }}
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
                          {item.offer}% off
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

          {/* Rest of your component remains the same */}
          {/* ... (keep all the existing JSX for totals, recommendations, etc) ... */}
        </div>
      )}
    </div>
  );
};

export default CartPage;