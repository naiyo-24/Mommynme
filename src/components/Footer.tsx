import { useState } from 'react';
import { Link } from 'react-router-dom';
import icon from '../assets/images/icon.png';
import ShippingPolicy from './ShippingPolicy'; // Import the ShippingPolicy component
import ReturnsPolicy from './ReturnsPolicy'; // Import the ReturnsPolicy component
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const [isShippingModalOpen, setIsShippingModalOpen] = useState<boolean>(false);
  const [isReturnsModalOpen, setIsReturnsModalOpen] = useState<boolean>(false);

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <img src={icon} alt="Logo" className="w-14 h-10" />
              <span className="text-xl font-bold">Mommy n Me</span>
            </div>
            <p className="text-gray-400">Your crochet aesthetics.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/about" className="hover:text-white">
                  Story
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsShippingModalOpen(true)}
                  className="hover:text-white"
                >
                  Shipping Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsReturnsModalOpen(true)}
                  className="hover:text-white"
                >
                  Returns Policy
                </button>
              </li>
              <li>
                <Link to="/track" className="hover:text-white">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Stay updated with our latest products and news.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 px-4 py-2 rounded-l-md flex-1 text-white"
              />
              <button className="bg-purple-600 px-4 py-2 rounded-r-md hover:bg-green-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; Mommy n Me. All rights reserved.</p>
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
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-6 sm:p-8 rounded-lg w-full max-w-2xl mx-4 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsShippingModalOpen(false)}
                className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
              >
                &times;
              </button>
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
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-6 sm:p-8 rounded-lg w-full max-w-2xl mx-4 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsReturnsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
              >
                &times;
              </button>
              <ReturnsPolicy />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;