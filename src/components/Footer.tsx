import { useState } from "react";
import { Link } from "react-router-dom";
import icon from "../assets/images/icon.png";
import ShippingPolicy from "./ShippingPolicy";
import ReturnsPolicy from "./ReturnsPolicy";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Instagram, Heart } from "lucide-react";

const Footer = () => {
  const [isShippingModalOpen, setIsShippingModalOpen] =
    useState<boolean>(false);
  const [isReturnsModalOpen, setIsReturnsModalOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    setEmail("");
  };

  return (
    <footer className="bg-gradient-to-b from-modern-primary/5 to-modern-dark text-white py-14 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-10 w-80 h-80 bg-modern-accent/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-modern-primary/10 rounded-full blur-3xl opacity-50"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo and Description */}
          <div className="animate-fade-in">
            <div className="flex items-center space-x-3 mb-5">
              <div className="bg-glass-200 backdrop-blur-md p-2 rounded-full shadow-glass">
                <img src={icon} alt="Mommy n Me Logo" className="w-10 h-10 object-contain" />
              </div>
              <span className="text-2xl font-bold font-title1 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Mommy n Me
              </span>
            </div>
            <p className="text-gray-300 mb-5 leading-relaxed">
              Where every stitch tells a story of love, creativity, and
              craftsmanship.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.instagram.com/_mommy.n.me_"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-glass-200 backdrop-blur-sm p-2.5 rounded-full transition-all duration-300 hover:bg-glass-300 hover:shadow-glass-sm group"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-white group-hover:text-modern-accent" />
              </a>
              <a
                href="mailto:contact@mommynme.com"
                className="bg-glass-200 backdrop-blur-sm p-2.5 rounded-full transition-all duration-300 hover:bg-glass-300 hover:shadow-glass-sm group"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-white group-hover:text-modern-accent" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in" style={{animationDelay: "0.1s"}}>
            <h4 className="font-medium text-lg mb-6 text-white relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-10 after:bg-modern-accent">
              Explore
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/about"
                  className="hover:text-modern-accent transition-colors flex items-center text-gray-200 hover-lift"
                >
                  <span className="w-1.5 h-1.5 bg-modern-accent rounded-full mr-2.5 opacity-75"></span>
                  About us
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-modern-accent transition-colors flex items-center text-gray-200 hover-lift"
                >
                  <span className="w-1.5 h-1.5 bg-modern-accent rounded-full mr-2.5 opacity-75"></span>
                  Shop Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-modern-accent transition-colors flex items-center text-gray-200 hover-lift"
                >
                  <span className="w-1.5 h-1.5 bg-modern-accent rounded-full mr-2.5 opacity-75"></span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="animate-fade-in" style={{animationDelay: "0.2s"}}>
            <h4 className="font-medium text-lg mb-6 text-white relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-10 after:bg-modern-accent">
              Support
            </h4>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => setIsShippingModalOpen(true)}
                  className="hover:text-modern-accent transition-colors flex items-center w-full text-left text-gray-200 hover-lift"
                >
                  <span className="w-1.5 h-1.5 bg-modern-accent rounded-full mr-2.5 opacity-75"></span>
                  Shipping Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsReturnsModalOpen(true)}
                  className="hover:text-modern-accent transition-colors flex items-center w-full text-left text-gray-200 hover-lift"
                >
                  <span className="w-1.5 h-1.5 bg-modern-accent rounded-full mr-2.5 opacity-75"></span>
                  Returns & Exchanges
                </button>
              </li>
              <li className="opacity-0 h-0">
                {/* Hidden element for spacing consistency */}
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="animate-fade-in" style={{animationDelay: "0.3s"}}>
            <h4 className="font-medium text-lg mb-6 text-white relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-10 after:bg-modern-accent">
              Join Our Circle
            </h4>
            <p className="text-gray-300 mb-5 leading-relaxed">
              Get updates on new patterns, exclusive offers, and crochet
              inspiration.
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="bg-glass-200 backdrop-blur-sm text-white px-4 py-3 rounded-l-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-modern-accent flex-1 placeholder:text-gray-400"
                required
              />
              <button
                type="submit"
                className="bg-modern-primary hover:bg-modern-accent px-4 py-3 rounded-r-xl text-white transition-all duration-300 hover:shadow-lg"
                aria-label="Subscribe"
              >
                <Mail className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-16 pt-8 text-center text-gray-300">
          <p className="flex flex-wrap items-center justify-center divide-x divide-white/10 font-title1">
            <span className="px-3">
              &copy; {new Date().getFullYear()} Mommy n Me
            </span>
            <span className="px-3">Developed by <strong className="font-poppins">Subhankar Das</strong></span>
          </p>
        </div>
      </div>
    

      {/* Shipping Policy Modal */}
      <AnimatePresence>
        {isShippingModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-modern-dark/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setIsShippingModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-glass-300 backdrop-blur-lg p-8 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-white/20 shadow-glass"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-2xl font-bold text-modern-dark">
                  Shipping Policy
                </h3>
                <button
                  onClick={() => setIsShippingModalOpen(false)}
                  className="bg-glass-200 backdrop-blur-sm w-8 h-8 rounded-full flex items-center justify-center text-modern-dark hover:bg-glass-400 transition-all duration-300"
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl">
                <ShippingPolicy />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Returns Policy Modal */}
      <AnimatePresence>
        {isReturnsModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-modern-dark/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setIsReturnsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-glass-300 backdrop-blur-lg p-8 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-white/20 shadow-glass"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-2xl font-bold text-modern-dark">
                  Returns & Exchanges
                </h3>
                <button
                  onClick={() => setIsReturnsModalOpen(false)}
                  className="bg-glass-200 backdrop-blur-sm w-8 h-8 rounded-full flex items-center justify-center text-modern-dark hover:bg-glass-400 transition-all duration-300"
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl">
                <ReturnsPolicy />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
