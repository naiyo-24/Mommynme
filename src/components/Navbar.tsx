import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import icon from '../assets/images/icon.png';
import { ShoppingCart, Instagram, Menu, X, User } from 'lucide-react'; // Import User icon
import  { CartContext }  from './CartContext';

export default function Navbar() {
  const cartContext = useContext(CartContext);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItems = cartContext?.cartItems ?? [];

  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <nav className="navbar fixed top-0 left-0 w-full z-50 px-4 py-4 shadow-md bg-[#cbb3e3]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden self-start"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Centered Logo, Brand Name, and Navigation */}
        <div className="flex-1 flex flex-col items-center space-y-2 md:space-y-4">
          {/* Logo and Brand Name */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={icon} alt="Logo" className="w-14 h-10" />
            <span className="text-3xl font-title1 font-bold text-gray-900">
              Mommy n Me
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-7">
            {[
              { path: '/', label: 'Home' },
              { path: '/products', label: 'Shop Now' },
              { path: '/about', label: 'About' },
              { path: '/contact', label: 'Contact' },
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`hover:text-purple-500 relative ${
                  isActive(path) ? 'text-purple-700 font-semibold' : ''
                }`}
              >
                {label}
                {isActive(path) && (
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-purple-700 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4 md:absolute md:right-6">
          {/* Instagram Icon */}
          <a
            href="https://www.instagram.com/_mommy.n.me_?igsh=MXg4YnJ6dDN1aDBwNA%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-customPink hover:text-customGreen transition-colors"
          >
            <Instagram className="w-6 h-6" />
          </a>

          {/* Login Icon */}
          <Link to="/login" className="text-customPink hover:text-customGreen transition-colors">
            <User className="w-6 h-6" />
          </Link>

          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-customPink hover:text-customGreen" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-[#cbb3e3] shadow-lg">
          {[
            { path: '/', label: 'Home' },
            { path: '/products', label: 'Shop Now' },
            { path: '/about', label: 'About' },
            { path: '/contact', label: 'Contact' },
            { path: '/login', label: 'Login' }, // Add Login to mobile menu
          ].map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`block px-6 py-3 text-lg hover:bg-purple-100 ${
                isActive(path) ? 'text-purple-700 font-semibold' : 'text-gray-900'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}