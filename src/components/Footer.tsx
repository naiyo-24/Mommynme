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
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src={icon} alt="Mommy n Me Logo" className="w-14 h-10" />
              <span className="text-2xl font-bold font-title1 text-white">
                Mommy n Me
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Where every stitch tells a story of love, creativity, and
              craftsmanship.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/_mommy.n.me_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              {/* Add other social links as needed */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors flex items-center text-gray-400"
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  About us
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-white transition-colors flex items-center text-gray-400"
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Shop Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors flex items-center text-gray-400"
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Support</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => setIsShippingModalOpen(true)}
                  className="hover:text-white transition-colors flex items-center w-full text-left text-gray-400"
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Shipping Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsReturnsModalOpen(true)}
                  className="hover:text-white transition-colors flex items-center w-full text-left text-gray-400"
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Returns & Exchanges
                </button>
              </li>
              <li>
                {/* <Link 
                  to="/faq" 
                  className="hover:text-white transition-colors flex items-center text-gray-400"
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  FAQ
                </Link> */}
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">
              Join Our Circle
            </h4>
            <p className="text-gray-400 mb-4">
              Get updates on new patterns, exclusive offers, and crochet
              inspiration.
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="bg-gray-800 text-white px-4 py-3 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent flex-1"
                required
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 px-4 py-3 rounded-r-lg text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
       
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p className="flex items-center justify-center divide-x divide-gray-700, font-title1">
              <span className="px-2">
                &copy; {new Date().getFullYear()} Mommy n Me
              </span>
              <span className="px-2">Developed by <strong className="font-poppins">Subhankar Das</strong></span>
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
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsShippingModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white p-6 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-purple-800">
                  Shipping Policy
                </h3>
                <button
                  onClick={() => setIsShippingModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>
              <ShippingPolicy />
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
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsReturnsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white p-6 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-purple-800">
                  Returns & Exchanges
                </h3>
                <button
                  onClick={() => setIsReturnsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>
              <ReturnsPolicy />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
