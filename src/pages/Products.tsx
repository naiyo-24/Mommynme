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

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  img2?: string;
  img3?: string;
  created_at: string;
  offer?: string;
  quantity: number;
  images?: string[];  // Make elements non-optional if you prefer
  colors?: string[];
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

  // Example product data - replace this with your API call
  const exampleProducts: Product[] = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 199.99,
      category: "Electronics",
      description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      img2: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      img3: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
      created_at: "2023-10-15",
      offer: "15",
      quantity: 10,
      colors: ["Black", "Blue", "White"]
    },
    {
      id: "2",
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      category: "Clothing",
      description: "Comfortable and eco-friendly t-shirt made from 100% organic cotton.",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
      img2: "https://images.unsplash.com/photo-1527719327859-c6ce80353573",
      created_at: "2023-11-20",
      quantity: 25,
      colors: ["White", "Gray", "Red"]
    },
    {
      id: "3",
      name: "Stainless Steel Water Bottle",
      price: 24.95,
      category: "Accessories",
      description: "Durable 1L stainless steel water bottle that keeps drinks cold for 24 hours.",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
      created_at: "2023-09-05",
      offer: "10",
      quantity: 15,
      colors: ["Silver", "Black"]
    },
    {
      id: "4",
      name: "Smart Fitness Tracker",
      price: 79.99,
      category: "Electronics",
      description: "Track your steps, heart rate, sleep patterns and more with this advanced fitness tracker.",
      image: "https://images.unsplash.com/photo-1551645120-d70bfe84c826",
      img2: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
      created_at: "2023-12-01",
      quantity: 8,
      colors: ["Black", "Pink"]
    },
    {
      id: "5",
      name: "Leather Wallet",
      price: 49.99,
      category: "Accessories",
      description: "Genuine leather wallet with multiple card slots and cash compartment.",
      image: "https://images.unsplash.com/photo-1591561954555-607968c989ab",
      created_at: "2023-08-12",
      quantity: 0, // Out of stock
      colors: ["Brown", "Black"]
    },
    {
      id: "6",
      name: "Wireless Charging Pad",
      price: 34.99,
      category: "Electronics",
      description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
      image: "https://images.unsplash.com/photo-1587034861059-51a6f187a1be",
      created_at: "2023-11-15",
      offer: "20",
      quantity: 12
    }
  ];

  useEffect(() => {
    // Replace this with your actual API call
    const fetchProducts = async () => {
      try {
        // Replace this with your actual API call
        const response = await fetch('your-api-endpoint/products');
        const productsData: Product[] = await response.json();
        
        const productsWithData = productsData.map((product) => ({
          ...product,
          // Use type assertion if you're sure the filter removes all undefined/null
          images: [product.img2, product.img3].filter((img): img is string => !!img),
          colors: product.colors || getRandomColors()
        }));
    
        setProducts(productsWithData);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Fallback to example data if API fails
        const fallbackProducts = exampleProducts.map(p => ({
          ...p,
          images: [p.img2, p.img3].filter((img): img is string => !!img),
          colors: p.colors || getRandomColors()
        }));
        setProducts(fallbackProducts);
      }
    };

    const getRandomColors = () => {
      const colorKeys = Object.keys(colorPalette);
      const count = Math.min(Math.floor(Math.random() * 3) + 1, colorKeys.length);
      return colorKeys.sort(() => 0.5 - Math.random()).slice(0, count);
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
    <div style={{ backgroundColor: "#E6E6FA" }} className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`w-full md:w-64 bg-white p-6 rounded-lg shadow-md h-fit transition-transform duration-300 ${
              showFilters ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Filters</h3>
              <Filter className="w-5 h-5 text-gray-500" />
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="space-y-2">
                  {Array.from(new Set(products.map(p => p.category))).map(category => (
                    <label key={category} className="flex items-center cursor-pointer">
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
                        className="w-4 h-4 accent-purple-600 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-600">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full custom-slider purple-slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹0</span>
                    <span>₹{priceRange}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center justify-center w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Filter className="w-5 h-5 mr-2" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </button>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-1 focus:ring-purple-500 focus:border-purple"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>

                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="px-4 py-2 rounded-lg border focus:ring-1 focus:ring-purple-500 focus:border-purple"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-low-to-high">Price: Low to High</option>
                  <option value="price-high-to-low">Price: High to Low</option>
                  <option value="newest-first">Newest First</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const isOutOfStock = product.quantity <= 0;
                const hasColors = product.colors && product.colors.length > 0;
                const discountedPrice = calculateDiscountedPrice(product.price, product.offer);

                return (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow relative">
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

                      {isOutOfStock && (
                        <div className="absolute top-2 left-2 bg-gray-600 text-white text-sm px-2 py-1 rounded-full">
                          Out of Stock
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        {product.offer && (
                          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {product.offer}% OFF
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                      {/* Color Options */}
                      {hasColors && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-700 mb-1">Colors:</p>
                          <div className="flex gap-2">
                            {product.colors?.map(color => (
                              <button
                                key={color}
                                onClick={() => handleColorSelect(product.id, color)}
                                className={`w-6 h-6 rounded-full border-2 transition-all ${
                                  selectedColors[product.id] === color
                                    ? "border-black scale-110"
                                    : "border-gray-300 hover:border-gray-500"
                                }`}
                                style={{ backgroundColor: colorPalette[color] || color }}
                                title={color}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-auto flex justify-between items-center">
                        <div>
                          {product.offer ? (
                            <>
                              <span className="font-bold text-lg text-purple-600">
                                ₹{discountedPrice.toFixed(2)}
                              </span>
                              <span className="text-sm text-gray-400 line-through ml-2">
                                ₹{product.price.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="font-bold text-lg text-purple-600">
                              ₹{product.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={isOutOfStock}
                          className={`px-4 py-2 rounded-md ${
                            isOutOfStock
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-purple-600 hover:bg-purple-700 text-white"
                          }`}
                        >
                          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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