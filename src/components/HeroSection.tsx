import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";

interface HeroSectionProps {
  images: string[];
  title: string;
  description: string;
}

const HeroSection = ({ images, title, description }: HeroSectionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProduct] = useState({
    name: "Crochet Sweater YT785",
    description: "The perfect blend of warmth and style for the season",
    price: 3599.99,
    originalPrice: 4999.99,
    image: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8"
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[85vh] md:h-[90vh] overflow-hidden bg-[#FFF8E7]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-[#FFD700]/10 rounded-bl-[100px]" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="z-10"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              GET YOUR OWN
              <br />
              UNIQUE <span className="bg-[#FFD700] px-2">LOOK</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-xl text-gray-600 mb-8 max-w-lg"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/products"
                className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-black/90 transition-all duration-300 flex items-center"
              >
                VIEW CATALOG
              </Link>
              <Link
                to="/about"
                className="bg-transparent border-2 border-black px-8 py-4 rounded-full font-medium hover:bg-black hover:text-white transition-all duration-300 flex items-center"
              >
                KNOW MORE
              </Link>
            </motion.div>

            {/* Featured Product Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="mt-12 bg-white rounded-2xl p-4 shadow-lg max-w-sm"
            >
              <div className="flex gap-4">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="w-32 h-32 object-cover rounded-xl"
                />
                <div>
                  <h3 className="font-bold text-lg">{featuredProduct.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{featuredProduct.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">₹{featuredProduct.price}</span>
                    <span className="text-sm text-gray-500 line-through">₹{featuredProduct.originalPrice}</span>
                  </div>
                  <button className="mt-2 bg-[#FFD700] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#FFD700]/90 transition-all duration-300">
                    BUY NOW
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Image Slider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative h-full hidden lg:block"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Product Highlight Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="absolute top-20 right-0 bg-white p-4 rounded-2xl shadow-lg z-20 w-48"
              >
                <div className="flex items-center justify-between mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1618354691373-d8514fecafcb"
                    alt="Product"
                    className="w-10 h-10 object-cover rounded-lg"
                  />
                  <h4 className="font-bold">BRO GLOW</h4>
                </div>
                <p className="text-sm text-gray-600">The best model of this season</p>
              </motion.div>

              {/* Main Image */}
              <div className="relative w-full h-[70vh] rounded-3xl overflow-hidden">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Reviews Card */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7 }}
                className="absolute bottom-20 right-10 bg-white p-4 rounded-2xl shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <img
                        key={i}
                        src={`https://i.pravatar.cc/40?img=${i}`}
                        alt={`Reviewer ${i}`}
                        className="w-8 h-8 rounded-full border-2 border-white"
                      />
                    ))}
                  </div>
                  <span className="font-bold">150k+</span>
                </div>
                <p className="text-sm mt-1">Happy Customers</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center items-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-black w-10"
                : "bg-black/50 hover:bg-black/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrow Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/60 rounded-full p-2 backdrop-blur-sm transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-black" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/60 rounded-full p-2 backdrop-blur-sm transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-black" />
      </button>
    </section>
  );
};

export default HeroSection;