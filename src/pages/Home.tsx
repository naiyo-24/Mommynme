import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from "../components/CartContext";
import { ArrowRight, ShoppingCart, ChevronRight } from "lucide-react";
import { MediaCoverageSection } from "../components/MediaCoverageSection";
import { BrandCollaborationSection } from "../components/BrandCollaborationSection";
import "../styles/glassmorphism.css";
import { motion } from "framer-motion";

interface Poster {
  id: string;
  title: string;
  description: string;
  image_url: string;
  image2: string;
  image3: string;
}

interface BestSeller {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
  offer?: string;
  category: string;
  created_at: string;
  quantity: number;
  images?: string[];
  colors?: string[];
  
  // API fields
  item_code: string;
  item_name: string;
  item_group: string;
  valuation_rate: number;
  standard_rate: number;
  stock_uom: string;
  brand: string | null;
  in_stock: boolean;
}

interface Product {
  id: string;
  category: string;
  image: string | null;
}

export default function Home() {
  const [poster, setPoster] = useState<Poster | null>(null);
  const [bestSellers, setBestSellers] = useState<BestSeller[]>([]);
  const [categories, setCategories] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Example data to replace Supabase calls
  const examplePoster: Poster = {
    id: "1",
    title: "Summer Collection ",
    description: "Discover our new summer collection with exclusive designs",
    image_url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b",
    image2: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
    image3: "https://images.unsplash.com/photo-1483985988355-763728e1935b"
  };

  const exampleBestSellers: BestSeller[] = [
    {
      id: "1",
      title: "Premium Yoga Mat",
      description: "Eco-friendly yoga mat with perfect grip",
      price: 2499,
      image_url: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f",
      image2: "https://images.unsplash.com/photo-1545205597-3d9d02c29597",
      image3: "https://images.unsplash.com/photo-1593757147298-e064ed1419e5",
      offer: "15",
      category: "Fitness",
      created_at: "2023-06-15",
      quantity: 20
    },
    {
      id: "2",
      title: "Wireless Earbuds",
      description: "Crystal clear sound with noise cancellation",
      price: 1799,
      image_url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
      image2: "https://images.unsplash.com/photo-1593784991095-a205069470b6",
      image3: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb",
      offer: "10",
      category: "Electronics",
      created_at: "2023-07-10",
      quantity: 15
    },
    {
      id: "3",
      title: "Organic Cotton T-Shirt",
      description: "100% organic cotton, comfortable fit",
      price: 899,
      image_url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
      image2: "https://images.unsplash.com/photo-1527719327859-c6ce80353573",
      image3: "",
      category: "Clothing",
      created_at: "2023-05-22",
      quantity: 30,
      offer: ""
    },
    {
      id: "4",
      title: "Stainless Steel Water Bottle",
      description: "Keeps drinks cold for 24 hours",
      price: 649,
      image_url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
      image2: "https://images.unsplash.com/photo-1600166898405-da9535204843",
      image3: "https://images.unsplash.com/photo-1600267165477-6d4cc741b379",
      offer: "20",
      category: "Accessories",
      created_at: "2023-08-05",
      quantity: 25
    }
  ];

  const exampleCategories: Product[] = [
    {
      id: "1",
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df"
    },
    {
      id: "2",
      category: "Clothing",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f"
    },
    {
      id: "3",
      category: "Home & Living",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f"
    },
    {
      id: "4",
      category: "Fitness",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"
    },
    {
      id: "5",
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7"
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch products from API for Best Sellers
        const response = await fetch('https://sirfbill.mommynmecrochet.com/api/resource/Item?fields=["*"]', {
          method: 'GET',
          headers: {
            "Authorization": "token 37505715c181575:bfd8e5d121bcf82",
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        });
        
        const data = await response.json();
        
        if (data && Array.isArray(data.data)) {
          // Function to extract price from HTML description
          const extractPriceFromDescription = (desc: string): number | null => {
            if (!desc) return null;
            const priceMatch = desc.match(/₹(\d+)/);
            return priceMatch ? parseInt(priceMatch[1], 10) : null;
          };

          // Process image URLs to ensure they're complete
          const processImageUrl = (imageUrl: string | null): string | null => {
            if (!imageUrl) return null;
            
            // If it starts with "/files/", prepend the base URL
            if (imageUrl.startsWith('/files/')) {
              return `https://sirfbill.mommynmecrochet.com${imageUrl}`;
            }
            return imageUrl;
          };

          // Function to clean HTML tags from text
          const cleanHtmlText = (html: string): string => {
            if (!html) return "";
            return html.replace(/<\/?[^>]*>?/gm, ' ')
              .replace(/\s{2,}/g, ' ')
              .trim();
          };

          // Process the products and select the best sellers (top 4 products)
          const productsData: BestSeller[] = data.data
            .filter((item: any) => item.is_sales_item !== 0) // Only include sales items
            .slice(0, 4) // Take only first 4 items
            .map((item: any) => {
              // Extract price from description if valuation_rate is 0
              const extractedPrice = extractPriceFromDescription(item.description);
              const calculatedPrice = item.valuation_rate > 0 ? item.valuation_rate : 
                                     item.standard_rate > 0 ? item.standard_rate : 
                                     extractedPrice || 100; // Fallback price
              
              // Calculate "offer" by comparing standard_rate and valuation_rate
              let offer = null;
              if (item.standard_rate > 0 && item.valuation_rate > 0 && item.standard_rate > item.valuation_rate) {
                const discount = ((item.standard_rate - item.valuation_rate) / item.standard_rate) * 100;
                offer = discount.toFixed(0);
              }

              // Process the image path to ensure it's a complete URL
              const imageUrl = processImageUrl(item.image);
              
              return {
                id: item.name || item.item_code,
                name: item.item_name || item.name,
                price: calculatedPrice,
                category: item.item_group || "Uncategorized",
                description: cleanHtmlText(item.description) || "",
                image: imageUrl,
                created_at: item.creation,
                quantity: parseInt(item.opening_stock || "0", 10),
                colors: [],
                images: [imageUrl].filter(Boolean), // Only add valid image URLs
                
                // Original API fields
                item_code: item.item_code,
                item_name: item.item_name,
                item_group: item.item_group,
                valuation_rate: parseFloat(item.valuation_rate || "0"),
                standard_rate: parseFloat(item.standard_rate || "0"),
                stock_uom: item.stock_uom,
                brand: item.brand,
                
                // Additional useful fields
                offer: offer || "",
                in_stock: true // Always set products to be in stock
              };
            });
          
          setBestSellers(productsData);
        } else {
          // Fallback to example data if API response is not as expected
          console.error("Invalid API response format", data);
          setBestSellers(exampleBestSellers);
        }
        
        // Still use example data for posters and categories
        setPoster(examplePoster);
        setCategories(exampleCategories);
        
      } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback to example data if API fails
        setPoster(examplePoster);
        setBestSellers(exampleBestSellers);
        setCategories(exampleCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider");
  }
  const { addToCart } = cartContext;

  const handleCategoryClick = (category: string) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  const calculateDiscountedPrice = (price: number, offer: string) => {
    if (!offer) return price;
    const discount = parseFloat(offer) / 100;
    return price - price * discount;
  };

  const posterSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    fade: true,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-modern-primary/5 to-modern-secondary/10">
        <div className="glass-card p-8 rounded-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-modern-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-modern-primary/5 to-modern-secondary/10 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blur-circle w-64 h-64 bg-modern-accent/20 top-0 left-[10%]"></div>
        <div className="blur-circle w-96 h-96 bg-modern-primary/20 bottom-0 right-[5%]"></div>
        <div className="blur-circle w-72 h-72 bg-modern-secondary/20 top-[30%] right-[20%] float"></div>
      </div>
      
      {/* Hero Slider Section */}
      {poster && (
        <section className="relative h-[70vh] md:h-screen">
          <Slider {...posterSliderSettings}>
            {[poster.image_url, poster.image2, poster.image3]
              .filter(img => img) // Filter out empty strings
              .map((image, index) => (
                <div key={index} className="w-full h-[70vh] md:h-screen">
                  <img
                    src={image}
                    alt={`Poster ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/600x400";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
                </div>
              )
            )}
          </Slider>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center text-center z-10 px-4"
          >
            <div className="max-w-2xl glass-card p-8 md:p-12">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 md:mb-6"
              >
                {poster.title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg sm:text-xl text-white/90 mb-6 md:mb-8"
              >
                {poster.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  to="/products"
                  className="inline-flex bg-gradient-to-r from-modern-primary to-modern-secondary text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold items-center space-x-2 hover:shadow-lg transition-all duration-300"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Trust Badges Section */}
      <div className="bg-white/30 backdrop-blur-md py-8 border-t border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-4 glass-card hover-lift"
            >
              <div className="text-2xl font-bold text-modern-primary">100%</div>
              <div className="text-sm text-gray-700">Handmade</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-4 glass-card hover-lift"
            >
              <div className="text-2xl font-bold text-modern-primary">500+</div>
              <div className="text-sm text-gray-700">Happy Customers</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-4 glass-card hover-lift"
            >
              <div className="text-2xl font-bold text-modern-primary">Free</div>
              <div className="text-sm text-gray-700">Shipping Over ₹999</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-4 glass-card hover-lift"
            >
              <div className="text-2xl font-bold text-modern-primary">Easy</div>
              <div className="text-sm text-gray-700">Returns</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Best Sellers Section */}
      <section className="py-12 md:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-8">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold relative"
            >
              Best Sellers
              <div className="absolute -bottom-2 left-0 h-1 w-24 bg-gradient-to-r from-modern-primary to-modern-accent"></div>
            </motion.h2>
            <Link
              to="/products"
              className="flex items-center text-modern-primary hover:text-modern-secondary"
            >
              View All <ChevronRight className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {bestSellers.map((product, index) => {
              const discountedPrice = calculateDiscountedPrice(
                product.price,
                product.offer
              );

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card overflow-hidden group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image || "https://placehold.co/600x400"}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/600x400";
                      }}
                    />
                    
                    {/* Status Badges */}
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      {product.offer && parseInt(product.offer) > 0 && (
                        <div className="sale-badge">
                          {product.offer}% OFF
                        </div>
                      )}
                      
                      {/* All products are now in stock, so we don't show an out-of-stock badge */}
                    </div>
                  </div>

                  <div className="p-6 bg-white/30 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center mb-4">
                      <span className="text-lg font-bold text-modern-primary">
                        ₹{discountedPrice.toFixed(2)}
                      </span>
                      {product.offer && parseInt(product.offer) > 0 && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ₹{product.price.toFixed(2)}
                        </span>
                      )}
                      
                      {product.stock_uom && (
                        <span className="text-xs text-gray-500 ml-1">
                          /{product.stock_uom}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="w-full flex items-center justify-center py-2 rounded-md bg-gradient-to-r from-modern-primary to-modern-secondary hover:shadow-lg text-white transition-all duration-300"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Shop by Category Section */}
      {/* <section className="py-12 md:py-20 bg-white/20 backdrop-blur-md relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="blur-circle w-80 h-80 bg-modern-secondary/20 top-[10%] left-[5%]"></div>
          <div className="blur-circle w-96 h-96 bg-modern-primary/20 bottom-[10%] right-[15%]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-center mb-8 md:mb-12 relative inline-block mx-auto"
          >
            Shop by Category
            <div className="absolute -bottom-3 left-0 right-0 h-1 mx-auto w-48 bg-gradient-to-r from-modern-accent to-modern-primary"></div>
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group cursor-pointer hover-lift"
                onClick={() => handleCategoryClick(category.category)}
              >
                <div className="aspect-square glass-card overflow-hidden mb-3">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.category}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/600x400";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-medium text-center group-hover:text-modern-primary transition-colors duration-300">
                  {category.category}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Media Coverage Section */}
      <MediaCoverageSection />

      <BrandCollaborationSection />
    </div>
  );
}