import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from "../components/CartContext";
import { ArrowRight, ShoppingCart, ChevronRight } from "lucide-react";
import { MediaCoverageSection } from "../components/MediaCoverageSection";
import { BrandCollaborationSection } from "../components/BrandCollaborationSection";

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
  category: string;
  created_at: string;
  quantity: number;
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
    title: "Summer Collection 2023",
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
        
        // Replace these with your actual API calls
        // Example:
        // const posterResponse = await fetch('your-api-endpoint/poster');
        // const posterData = await posterResponse.json();
        // setPoster(posterData);
        
        // Using example data for now
        setPoster(examplePoster);
        setBestSellers(exampleBestSellers);
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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
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
                  <div className="absolute inset-0 bg-black/40" />
                </div>
              )
            )}
          </Slider>

          <div className="absolute inset-0 flex items-center justify-center text-center z-10 px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 md:mb-6">
                {poster.title}
              </h1>
              <p className="text-lg sm:text-xl text-white/90 mb-6 md:mb-8">
                {poster.description}
              </p>
              <Link
                to="/products"
                className="inline-flex bg-pink-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold items-center space-x-2 hover:bg-pink-700 transition-all duration-300 hover:scale-105"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Trust Badges Section */}
      {/* <div className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <div className="text-2xl font-bold text-pink-600">100%</div>
              <div className="text-sm text-gray-600">Handmade</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-pink-600">500+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-pink-600">Free</div>
              <div className="text-sm text-gray-600">Shipping Over ₹999</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-pink-600">Easy</div>
              <div className="text-sm text-gray-600">Returns</div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Best Sellers Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold">Best Sellers</h2>
            <Link
              to="/products"
              className="flex items-center text-pink-600 hover:text-pink-800"
            >
              View All <ChevronRight className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {bestSellers.map((product) => {
              const discountedPrice = calculateDiscountedPrice(
                product.price,
                product.offer
              );

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/600x400";
                      }}
                    />
                    {product.offer && (
                      <div className="absolute top-4 right-4 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {product.offer}% OFF
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 line-clamp-1">
                      {product.title}
                    </h3>

                    <div className="flex items-center mb-4">
                      <span className="text-lg font-bold text-pink-600">
                        ₹{discountedPrice.toFixed(2)}
                      </span>
                      {product.offer && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ₹{product.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() =>
                        addToCart({
                          ...product,
                          name: product.title,
                          image: product.image_url,
                        })
                      }
                      className="w-full flex items-center justify-center bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 md:mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group cursor-pointer"
                onClick={() => handleCategoryClick(category.category)}
              >
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
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
                <h3 className="text-lg font-medium text-center group-hover:text-pink-600">
                  {category.category}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Coverage Section */}
      <MediaCoverageSection />

      <BrandCollaborationSection />
    </div>
  );
}