import { useContext, useState, useEffect, useMemo, useCallback } from "react";
import { Filter, Search } from "lucide-react";
import { CartContext } from "../components/CartContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import debounce from "lodash.debounce";
import ImageModal from "../components/ImageModal";
import { useLocation } from "react-router-dom";
import "./Slider.css";
import "../styles/glassmorphism.css";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  html_description?: string;
  image: string | null;
  created_at: string;
  offer?: string;
  quantity: number;
  images?: string[];
  colors?: string[];
  specs?: Record<string, string>;
  
  // New fields from API response
  item_code: string;
  item_name: string;
  item_group: string;
  valuation_rate: number;
  standard_rate: number;
  stock_uom: string;
  brand: string | null;
  customer_code: string;
  opening_stock: number;
  disabled?: boolean;
  is_sales_item?: boolean;
  max_discount?: number;
  in_stock?: boolean;
}

export default function Products() {
  const cartContext = useContext(CartContext);
  
  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider");
  }

  const { addToCart } = cartContext;
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(2000);
  const [sortOption, setSortOption] = useState<string>("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProductImages, setSelectedProductImages] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromQuery = queryParams.get("category");

  const colorPalette: Record<string, string> = {
    "Red": "#FF0000",
    "Blue": "#0000FF",
    "Green": "#00FF00",
    "Black": "#000000",
    "White": "#FFFFFF",
    "Yellow": "#FFFF00",
    "Purple": "#800080",
    "Pink": "#FFC0CB",
    "Orange": "#FFA500",
    "Gray": "#808080"
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
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
          // Process HTML descriptions to extract price information
          const extractPriceFromDescription = (desc: string): number | null => {
            if (!desc) return null;
            // Look for price patterns like "₹90" in the description
            const priceMatch = desc.match(/₹(\d+)/);
            return priceMatch ? parseInt(priceMatch[1], 10) : null;
          };

          // Process HTML descriptions to extract color information
          const extractColorsFromDescription = (desc: string): string[] => {
            if (!desc) return [];
            // Common color keywords to look for
            const colorKeywords = ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 'Purple', 'Pink', 'Orange', 'Gray'];
            const colors = [];
            
            for (const color of colorKeywords) {
              if (desc.toLowerCase().includes(color.toLowerCase())) {
                colors.push(color);
              }
            }
            
            return colors.length > 0 ? colors : getRandomColors();
          };
          
          // Generate random colors for visual variety when no colors are specified
          const getRandomColors = (): string[] => {
            const allColors = ['#FF5252', '#4CAF50', '#2196F3', '#9C27B0', '#FFC107', '#FF9800', '#795548', '#607D8B'];
            const numColors = Math.floor(Math.random() * 3) + 1; // 1 to 3 colors
            const selectedColors = [];
            
            for (let i = 0; i < numColors; i++) {
              const randomIndex = Math.floor(Math.random() * allColors.length);
              selectedColors.push(allColors[randomIndex]);
            }
            
            return selectedColors;
          };

          // Function to extract specifications from HTML description
          const extractSpecsFromDescription = (desc: string): Record<string, string> => {
            if (!desc) return {};
            
            const specs: Record<string, string> = {};
            const sizeMatch = desc.match(/Size\s*:\s*([^<]+)/i);
            if (sizeMatch) specs.size = sizeMatch[1].trim();
            
            const yarnMatch = desc.match(/Yarn type\s*:\s*([^<]+)/i);
            if (yarnMatch) specs.yarnType = yarnMatch[1].trim();
            
            const materialMatch = desc.match(/Material\s*:\s*([^<]+)/i);
            if (materialMatch) specs.material = materialMatch[1].trim();

            // Extract other common specifications
            const dimensionsMatch = desc.match(/Dimensions\s*:\s*([^<]+)/i);
            if (dimensionsMatch) specs.dimensions = dimensionsMatch[1].trim();
            
            const weightMatch = desc.match(/Weight\s*:\s*([^<]+)/i);
            if (weightMatch) specs.weight = weightMatch[1].trim();
            
            return specs;
          };

          // Function to clean HTML tags from text
          const cleanHtmlText = (html: string): string => {
            if (!html) return "";
            return html.replace(/<[^>]*>?/gm, ' ')
              .replace(/\s{2,}/g, ' ')
              .trim();
          };

          const productsData: Product[] = data.data.map((item: any) => {
            // Extract price from description if valuation_rate is 0
            const extractedPrice = extractPriceFromDescription(item.description);
            const colors = extractColorsFromDescription(item.description);
            const calculatedPrice = item.valuation_rate > 0 ? item.valuation_rate : 
                                    item.standard_rate > 0 ? item.standard_rate : 
                                    extractedPrice || 100; // Fallback price
            
            // Calculate "offer" by comparing standard_rate and valuation_rate
            let offer = null;
            if (item.standard_rate > 0 && item.valuation_rate > 0 && item.standard_rate > item.valuation_rate) {
              const discount = ((item.standard_rate - item.valuation_rate) / item.standard_rate) * 100;
              offer = discount.toFixed(0);
            }

            // Process the image path to ensure it's a complete URL if needed
            let imageUrl = item.image;
            if (imageUrl && !imageUrl.startsWith('http')) {
              // Append base URL if it's a relative path
              imageUrl = `https://sirfbill.mommynmecrochet.com${imageUrl}`;
            }

            // Generate additional images for display purposes (in a real app, these would come from the API)
            const additionalImages = [];
            if (imageUrl) {
              additionalImages.push(imageUrl);
            }

            // Extract product specifications
            const specs = extractSpecsFromDescription(item.description);
            
            return {
              id: item.name || item.item_code,
              name: item.item_name || item.name,
              price: calculatedPrice,
              category: item.item_group || "Uncategorized",
              description: cleanHtmlText(item.description) || "",
              html_description: item.description || "",
              image: imageUrl,
              created_at: item.creation,
              quantity: parseInt(item.opening_stock || "0", 10),
              colors: colors,
              images: additionalImages,
              specs: specs,
              
              // Map all API fields directly
              item_code: item.item_code,
              item_name: item.item_name,
              item_group: item.item_group,
              valuation_rate: parseFloat(item.valuation_rate || "0"),
              standard_rate: parseFloat(item.standard_rate || "0"),
              stock_uom: item.stock_uom,
              brand: item.brand,
              customer_code: item.customer_code || "",
              opening_stock: parseInt(item.opening_stock || "0", 10),
              disabled: item.disabled === 1,
              is_sales_item: item.is_sales_item === 1,
              max_discount: parseFloat(item.max_discount || "0"),
              
              // Additional useful fields
              offer: offer,
              in_stock: parseInt(item.opening_stock || "0", 10) > 0 && item.disabled !== 1
            };
          });
        
          setProducts(productsData);
        } else {
          console.error("Invalid API response format", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts();
  }, []);
  

  useEffect(() => {
    if (categoryFromQuery) {
      setSelectedCategories([categoryFromQuery]);
    }
  }, [categoryFromQuery]);

  const handleSearch = useCallback(
    debounce((query: string) => {
      setSearchQuery(query);
    }, 300),
    []
  );

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategories.length === 0 || 
                             selectedCategories.includes(product.category);
        const matchesPrice = product.price <= priceRange;

        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        switch (sortOption) {
          case "price-low-to-high": return a.price - b.price;
          case "price-high-to-low": return b.price - a.price;
          case "newest-first": 
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          default: return 0;
        }
      });
  }, [products, searchQuery, selectedCategories, priceRange, sortOption]);

  const handleColorSelect = (productId: string, color: string) => {
    setSelectedColors(prev => ({ ...prev, [productId]: color }));
  };

  const handleAddToCart = (product: Product) => {
    if (product.colors && product.colors.length > 0 && !selectedColors[product.id]) {
      alert("Please select a color");
      return;
    }

    addToCart(product, product.colors ? selectedColors[product.id] : undefined);
  };

  const handleViewMoreImages = useCallback((images: string[]) => {
    setSelectedProductImages(images.filter(Boolean));
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProductImages([]);
  }, []);

  const calculateDiscountedPrice = (price: number, offer?: string): number => {
    if (!offer) return price;
    const discountPercentage = parseFloat(offer);
    return isNaN(discountPercentage) ? price : price - (price * discountPercentage) / 100;
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-modern-primary/5 to-modern-secondary/10 relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blur-circle w-72 h-72 bg-modern-accent/20 top-[5%] right-[10%]"></div>
        <div className="blur-circle w-96 h-96 bg-modern-secondary/15 bottom-[10%] left-[5%]"></div>
        <div className="blur-circle w-64 h-64 bg-modern-primary/15 top-[40%] left-[20%] float"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              translateX: showFilters || window.innerWidth >= 768 ? 0 : "-100%" 
            }}
            transition={{ duration: 0.4 }}
            className={`w-full md:w-64 glass-card p-6 h-fit`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg text-modern-primary">Filters</h3>
              <Filter className="w-5 h-5 text-modern-secondary" />
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3 text-gray-700">Categories</h4>
                <div className="space-y-2">
                  {Array.from(new Set(products.map(p => p.category))).map(category => (
                    <label key={category} className="flex items-center cursor-pointer hover:text-modern-primary transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => 
                          setSelectedCategories(prev =>
                            prev.includes(category)
                              ? prev.filter(c => c !== category)
                              : [...prev, category]
                          )
                        }
                        className="w-4 h-4 accent-modern-primary border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-600">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3 text-gray-700">Price Range</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full custom-slider"
                    style={{
                      "--range-color": "var(--color-modern-primary)", 
                      accentColor: "var(--color-modern-primary)"
                    } as any}
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹0</span>
                    <span>₹{priceRange}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-4 mb-6"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center justify-center w-full bg-gradient-to-r from-modern-primary to-modern-secondary text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <Filter className="w-5 h-5 mr-2" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </button>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-modern-primary focus:border-modern-primary bg-white/70"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>

                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-modern-primary focus:border-modern-primary bg-white/70"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-low-to-high">Price: Low to High</option>
                  <option value="price-high-to-low">Price: High to Low</option>
                  <option value="newest-first">Newest First</option>
                </select>
              </div>
            </motion.div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => {
                const isOutOfStock = product.quantity <= 0;
                const hasColors = product.colors && product.colors.length > 0;
                const discountedPrice = calculateDiscountedPrice(product.price, product.offer);

                return (
                  <motion.div 
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 % 0.5 }}
                    className="glass-card overflow-hidden flex flex-col h-full group relative"
                  >
                    {/* Product Image Slider */}
                    <div className="relative h-48">
                      <Swiper
                        navigation={{
                          nextEl: `.swiper-button-next-${product.id}`,
                          prevEl: `.swiper-button-prev-${product.id}`,
                        }}
                        pagination={{ clickable: true }}
                        modules={[Navigation, Pagination]}
                        className="w-full h-full"
                      >
                        <SwiperSlide>
                          <div
                            onClick={() => handleViewMoreImages([product.image, ...(product.images || [])])}
                            className="cursor-pointer h-full"
                          >
                            <img
                              src={product.image || "https://placehold.co/600x400"}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.src = "https://placehold.co/600x400";
                              }}
                            />
                          </div>
                        </SwiperSlide>
                        {product.images?.map((image, index) => (
                          <SwiperSlide key={index}>
                            <div
                              onClick={() => handleViewMoreImages([product.image, ...(product.images || [])])}
                              className="cursor-pointer h-full"
                            >
                              <img
                                src={image}
                                alt={`${product.name} ${index + 1}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) => {
                                  e.currentTarget.src = "https://placehold.co/600x400";
                                }}
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      <div className={`swiper-button-next swiper-button-next-${product.id}`}></div>
                      <div className={`swiper-button-prev swiper-button-prev-${product.id}`}></div>

                      {/* Product Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-2">
                        {isOutOfStock && (
                          <div className="out-of-stock-badge">
                            Out of Stock
                          </div>
                        )}
                        {product.offer && (
                          <div className="sale-badge">
                            {product.offer}% OFF
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="p-4 flex flex-col flex-grow bg-white/30 backdrop-blur-sm">
                      {/* Product Title & Badges */}
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <div className="flex flex-col items-end gap-1">
                          {/* Offer Badge */}
                          {product.offer && (
                            <span className="sale-badge">
                              {product.offer}% OFF
                            </span>
                          )}
                          
                          {/* Stock Status Badge */}
                          {product.in_stock ? (
                            product.quantity > 10 ? (
                              <span className="in-stock-badge">In Stock</span>
                            ) : (
                              <span className="low-stock-badge">Low Stock: {product.quantity} left</span>
                            )
                          ) : (
                            <span className="out-of-stock-badge">Out of Stock</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Product Description */}
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                      
                      {/* Specifications (if available) */}
                      {product.specs && Object.keys(product.specs).length > 0 && (
                        <div className="specs-container">
                          <p className="specs-title">Specifications:</p>
                          {Object.entries(product.specs).map(([key, value]) => (
                            <div key={key} className="spec-item">
                              <span className="spec-label">{key}:</span>
                              <span className="spec-value">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Color Options */}
                      {hasColors && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-700 mb-1">Available Colors:</p>
                          <div className="flex gap-2">
                            {product.colors?.map(color => (
                              <button
                                key={color}
                                onClick={() => handleColorSelect(product.id, color)}
                                className={`color-swatch ${
                                  selectedColors[product.id] === color ? "selected" : ""
                                }`}
                                style={{ backgroundColor: colorPalette[color] || color }}
                                title={color}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Product code/SKU */}
                      <div className="text-xs text-gray-500 mb-2">
                        Item Code: <span className="font-medium">{product.item_code}</span>
                      </div>

                      {/* Price and Add to Cart */}
                      <div className="mt-auto flex justify-between items-center">
                        <div>
                          {product.offer ? (
                            <>
                              <span className="font-bold text-lg text-modern-primary">
                                ₹{discountedPrice.toFixed(2)}
                              </span>
                              <span className="text-sm text-gray-400 line-through ml-2">
                                ₹{product.price.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="font-bold text-lg text-modern-primary">
                              ₹{product.price.toFixed(2)}
                            </span>
                          )}
                          {product.stock_uom && (
                            <span className="text-xs text-gray-500 block">per {product.stock_uom}</span>
                          )}
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={isOutOfStock}
                          className={`px-4 py-2 rounded-md ${
                            isOutOfStock
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-gradient-to-r from-modern-primary to-modern-secondary hover:shadow-lg text-white transition-all duration-300"
                          }`}
                        >
                          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-8 text-center"
              >
                <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <ImageModal
        images={selectedProductImages}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}