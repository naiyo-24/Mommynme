import { useContext, useState, useEffect, useMemo, useCallback } from "react";
import { Filter, Search } from "lucide-react";
import { supabase } from "../utils/supabaseClient";
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

// Define the type for a product
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
  images?: string[];
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
  const [selectedProductImages, setSelectedProductImages] = useState<string[]>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromQuery = queryParams.get("category");

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: productsData, error: productsError } = await supabase
          .from("products")
          .select("*");

        if (productsError) {
          throw productsError;
        }

        const productsWithImages = productsData.map((product) => ({
          ...product,
          images: [product.img2, product.img3].filter(Boolean),
        }));

        setProducts(productsWithImages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Update selectedCategories based on query parameter
  useEffect(() => {
    if (categoryFromQuery) {
      setSelectedCategories([categoryFromQuery]);
    }
  }, [categoryFromQuery]);

  // Debounced search handler
  const handleSearch = useCallback(
    debounce((query: string) => {
      setSearchQuery(query);
    }, 300),
    []
  );

  // Memoized filtered products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(product.category);
        const matchesPrice = product.price <= priceRange;

        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        switch (sortOption) {
          case "price-low-to-high":
            return a.price - b.price;
          case "price-high-to-low":
            return b.price - a.price;
          case "newest-first":
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          default:
            return 0;
        }
      });
  }, [products, searchQuery, selectedCategories, priceRange, sortOption]);

  // Handle viewing more images
  const handleViewMoreImages = useCallback((images: string[]) => {
    setSelectedProductImages(images.filter(Boolean));
    setIsModalOpen(true);
  }, []);

  // Close the modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProductImages([]);
  }, []);

  return (
    <div
      style={{ backgroundColor: "#E6E6FA" }}
      className="bg-gray-50 min-h-screen py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`w-full md:w-64 bg-white p-6 rounded-lg shadow-md h-fit transition-transform duration-300 ${
              showFilters
                ? "translate-x-0"
                : "-translate-x-full md:translate-x-0"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Filters</h3>
              <Filter className="w-5 h-5 text-gray-500" />
            </div>

            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="space-y-2">
                  {Array.from(
                    new Set(products.map((product) => product.category))
                  ).map((category) => (
                    <label
                      key={category}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() =>
                          setSelectedCategories((prev) =>
                            prev.includes(category)
                              ? prev.filter((c) => c !== category)
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

              {/* Price Range */}
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

          {/* Products Grid */}
          <div className="flex-1">
            {/* Search and Sort */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Mobile Filters Toggle Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center justify-center w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Filter className="w-5 h-5 mr-2" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </button>

                {/* Search Bar */}
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-1 focus:ring-purple-500 focus:border-purple"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>

                {/* Sort Dropdown */}
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

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const discountedPrice = calculateDiscountedPrice(
                  product.price,
                  product.offer
                );
                const isOutOfStock = product.quantity === 0;
                const hasMoreImages =
                  product.images && product.images.length > 0;

                // Debugging: Log the product and isOutOfStock value
                console.log(product, isOutOfStock);

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow"
                  >
                    {/* Product Image Slider */}
                    <div className="relative">
                      <Swiper
                        navigation={{
                          nextEl: `.swiper-button-next-${product.id}`,
                          prevEl: `.swiper-button-prev-${product.id}`,
                        }}
                        pagination={{ clickable: true }}
                        modules={[Navigation, Pagination]}
                        className="w-full h-48"
                      >
                        {/* Main image */}
                        <SwiperSlide>
                          <div
                            onClick={() =>
                              handleViewMoreImages([
                                product.image,
                                ...(product.images || []),
                              ])
                            }
                            className="cursor-pointer"
                          >
                            <img
                              src={
                                product.image || "https://placehold.co/600x400"
                              }
                              alt="Main Product Image"
                              className="w-full h-48 object-cover"
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "https://placehold.co/600x400";
                              }}
                            />
                          </div>
                        </SwiperSlide>

                        {/* Additional images */}
                        {product.images?.map((image, index) => (
                          <SwiperSlide key={index}>
                            <div
                              onClick={() =>
                                handleViewMoreImages([
                                  product.image,
                                  ...(product.images || []),
                                ])
                              }
                              className="cursor-pointer"
                            >
                              <img
                                src={image}
                                alt={`Product Image ${index + 1}`}
                                className="w-full h-48 object-cover"
                                loading="lazy"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "https://placehold.co/600x400";
                                }}
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>

                      {/* Custom Navigation Arrows */}
                      <div
                        className={`swiper-button-next swiper-button-next-${product.id}`}
                      ></div>
                      <div
                        className={`swiper-button-prev swiper-button-prev-${product.id}`}
                      ></div>

                      {/* Out of Stock Badge */}
                      {isOutOfStock && (
                        <div className="absolute top-2 left-2 bg-gray-600 text-white text-sm px-2 py-1 rounded-full">
                          Out of Stock
                        </div>
                      )}

                      {/* View More Button */}
                      {hasMoreImages && (
                        <button
                          onClick={() =>
                            handleViewMoreImages([
                              product.image,
                              ...(product.images || []),
                            ])
                          }
                          className="absolute bottom-2 right-2 bg-white text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-100 transition-colors"
                        >
                          View More
                        </button>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Product Name and Offer Badge */}
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold">
                          {product.name}
                        </h3>
                        {product.offer && (
                          <div className="bg-red-600 text-white text-sm px-2 py-1 rounded-full">
                            {product.offer}% off
                          </div>
                        )}
                      </div>

                      {/* Product Description */}
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {product.description}
                      </p>

                      {/* Price and Add to Cart Button */}
                      <div className="flex justify-between items-center mt-auto">
                        <div className="flex flex-col">
                          {product.offer ? (
                            <>
                              <span className="text-customPink font-bold">
                                ₹{discountedPrice.toFixed(2)}
                              </span>
                              <span className="text-sm text-gray-400 line-through">
                                ₹{product.price.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="text-customPink font-bold">
                              ₹{product.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className={`${
                            isOutOfStock
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-purple-600 hover:bg-purple-400"
                          } text-white px-4 py-2 rounded-md transition-colors`}
                          disabled={isOutOfStock}
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

      {/* ImageModal */}
      <ImageModal
        images={selectedProductImages}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}

// Helper function to calculate discounted price
const calculateDiscountedPrice = (price: number, offer?: string): number => {
  if (!offer) return price; // If no offer, return the original price

  const discountPercentage = parseFloat(offer); // Convert offer string to a number
  if (isNaN(discountPercentage)) return price; // If the offer is not a valid number, return the original price

  // Calculate and return the discounted price directly
  return price - (price * discountPercentage) / 100;
};
