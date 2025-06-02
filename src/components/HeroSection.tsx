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
  
  // Auto-rotate slides
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
    <section className="relative h-[85vh] md:h-[90vh] overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Floating elements for youth appeal */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <motion.div
          initial={{ x: -100, y: -100, opacity: 0 }}
          animate={{ x: -20, y: -30, opacity: 0.8 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute w-44 h-44 rounded-full bg-gradient-to-r from-pink-200 to-pink-300 blur-xl top-[10%] left-[5%] opacity-40"
        />
        <motion.div
          initial={{ x: 100, y: 100, opacity: 0 }}
          animate={{ x: 30, y: 50, opacity: 0.8 }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 5 }}
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-purple-200 to-blue-200 blur-xl bottom-[20%] right-[8%] opacity-40"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0.4 }}
          animate={{ scale: 1.2, opacity: 0.8 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 2 }}
          className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-yellow-200 to-amber-200 blur-xl top-[40%] left-[20%] opacity-30"
        />
      </div>

      {/* Main image slider */}
      <div className="relative h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
              <img
                src={image}
                alt={`Hero slide ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/1200x800";
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-xl md:max-w-2xl lg:max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-white/20 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-xl"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="inline-block px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full mb-4"
              >
                New Collection
              </motion.span>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700"
              >
                {title}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7 }}
                className="text-lg text-slate-700 mb-6"
              >
                {description}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/products"
                  className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                
                <Link
                  to="/about"
                  className="inline-flex items-center bg-white/70 hover:bg-white/90 text-slate-800 px-6 py-3 rounded-full font-medium border border-slate-200 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                >
                  <span>Learn More</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center items-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white w-10"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrow controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/60 rounded-full p-2 backdrop-blur-sm transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-slate-800" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/60 rounded-full p-2 backdrop-blur-sm transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-slate-800" />
      </button>
    </section>
  );
};

export default HeroSection;
