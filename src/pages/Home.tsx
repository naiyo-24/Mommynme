import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { supabase } from "../utils/supabaseClient";
import { CartContext } from "../components/CartContext";
import { ArrowRight } from "lucide-react";

// Define types for your data
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
  title: string;
  description: string;
  price: number;
  image_url: string;
  image2: string;
  image3: string;
  offer: string;
  category: string; // Added to match Product type
  created_at: string; // Added to match Product type
  quantity: number; // Added to match Product type
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

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch poster data
        const { data: posterData, error: posterError } = await supabase
          .from("poster")
          .select("*")
          .single();
        if (posterError) throw posterError;
        setPoster(posterData);

        // Fetch best sellers
        const { data: bestSellersData, error: bestSellersError } =
          await supabase.from("best_seller").select("*");
        if (bestSellersError) throw bestSellersError;
        setBestSellers(bestSellersData || []);

        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("products")
          .select("id, category, image")
          .neq("category", null);
        if (categoriesError) throw categoriesError;
        setCategories(categoriesData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle "Add to Cart"
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider");
  }

  const { addToCart } = cartContext;

  // Function to handle category click
  const handleCategoryClick = (category: string) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  // Function to calculate discounted price
  const calculateDiscountedPrice = (price: number, offer: string) => {
    if (!offer) return price;
    const discount = parseFloat(offer) / 100;
    return price - price * discount;
  };

  // Slider settings for poster images
  const posterSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable automatic sliding
    autoplaySpeed: 3000, // Slide every 3 seconds
    pauseOnHover: true,
    arrows: false,
    fade: true, // Add fade transition for smoother slides
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Poster Section - Only Images */}
      {poster && (
        <section className="relative h-[70vh] md:h-screen">
          {/* Slider for Images */}
          <Slider {...posterSliderSettings}>
            {[poster.image_url, poster.image2, poster.image3].map(
              (image, index) => {
                console.log(`Rendering image ${index + 1}: ${image}`);
                return (
                  <div key={index} className="w-full h-[70vh] md:h-screen">
                    <img
                      src={image}
                      alt={`Poster Image ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error(`Failed to load image: ${image}`);
                        e.currentTarget.src = "https://placehold.co/600x400"; // Fallback image
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                  </div>
                );
              }
            )}
          </Slider>

          {/* Static Title and Description */}
          <div className="absolute inset-0 flex items-center justify-center text-center z-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-poppins text-white mb-4 md:mb-6">
                {poster.title}
              </h1>
              <p className="text-lg sm:text-xl font-title1 text-white/90 mb-6 md:mb-8">
                {poster.description}
              </p>
              <Link
                to="/products"
                className="inline-flex bg-pink-600 font-poppins text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold items-center space-x-2 hover:bg-pink-700 transition-all duration-300 hover:scale-105"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5 animate-[bounce-x_1s_ease-in-out_infinite]" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Best Seller Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 md:mb-16">
            Best Sellers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {bestSellers.length > 0 ? (
              bestSellers.map((product) => {
                const discountedPrice = calculateDiscountedPrice(
                  product.price,
                  product.offer
                );
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">
                        {product.title}
                      </h3>
                      <p className="text-pink-600 font-bold">
                        ₹{discountedPrice.toFixed(2)}{" "}
                        {product.offer && (
                          <span className="text-gray-500 line-through">
                            ₹{product.price.toFixed(2)}
                          </span>
                        )}
                      </p>
                      {product.offer && (
                        <p className="text-sm text-green-600 mb-2">
                          {product.offer}% off
                        </p>
                      )}
                      <button
                        onClick={() =>
                          addToCart({
                            id: product.id,
                            name: product.title, // Map `title` to `name`
                            price: product.price,
                            description: product.description,
                            image: product.image_url, // Map `image_url` to `image`
                            category: product.category,
                            created_at: new Date().toISOString(), // Add a default value
                            quantity: 1, // Add a default value
                            offer: product.offer,
                          })
                        }
                        className="mt-4 w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition-all duration-300 hover:scale-105"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center col-span-full">
                No best sellers found.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 md:mb-16">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                  onClick={() => handleCategoryClick(category.category)}
                >
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.category}
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                  ) : (
                    <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                  <h3 className="text-xl font-semibold">{category.category}</h3>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full">No categories found.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
