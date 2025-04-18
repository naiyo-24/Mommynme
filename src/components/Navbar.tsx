import { useEffect, useState, useContext, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import icon from '../assets/images/icon.png';
import { ShoppingCart, Instagram, Menu, X, User, LogOut } from 'lucide-react';
import { CartContext } from './CartContext';

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/products', label: 'Shop Now' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
] as const;

const Navbar: React.FC = () => {
  const cartContext = useContext(CartContext);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const cartItemsCount = useMemo(
    () => cartContext?.cartItems?.length ?? 0,
    [cartContext?.cartItems]
  );

  useEffect(() => {
    const loggedInFlag = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedInFlag === "true");
    
    // Add event listener to detect changes in localStorage
    const handleStorageChange = () => {
      const updatedLoggedInFlag = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(updatedLoggedInFlag === "true");
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Check login status regularly (every 2 seconds)
    const checkLoginInterval = setInterval(() => {
      const currentLoggedInFlag = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(currentLoggedInFlag === "true");
    }, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(checkLoginInterval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("customerProfile");
    setIsLoggedIn(false);
    alert("You have been logged out.");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar fixed top-0 left-0 w-full z-50 px-4 py-4 shadow-md bg-[#cbb3e3]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden self-start"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Centered Logo & Navigation */}
        <div className="flex-1 flex flex-col items-center space-y-2 md:space-y-4">
          <Link to="/" className="flex items-center space-x-2" aria-label="Home">
            <img src={icon} alt="Mommy n Me Logo" className="w-14 h-10" />
            <span className="text-3xl font-title1 font-bold text-gray-900">
              Mommy n Me
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-7">
            {NAV_ITEMS.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`hover:text-purple-500 relative ${
                  isActive(path) ? 'text-purple-700 font-semibold' : ''
                }`}
                aria-current={isActive(path) ? "page" : undefined}
              >
                {label}
                {isActive(path) && (
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-purple-700 rounded-full" />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4 md:absolute md:right-6">
          <a
            href="https://www.instagram.com/_mommy.n.me_"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-customPink hover:text-customGreen transition-colors"
          >
            <Instagram className="w-6 h-6" />
          </a>

          <Link to="/cart" className="relative" aria-label="Cart">
            <ShoppingCart className="w-6 h-6 text-customPink hover:text-customGreen" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <div className="relative group">
              <Link 
                to="/profile" 
                aria-label="Profile"
                className="text-customPink hover:text-customGreen transition-colors"
              >
                <User className="w-6 h-6" />
              </Link>
              <div className="absolute right-0 hidden group-hover:block bg-white shadow-lg rounded-lg p-2 w-40">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center text-red-500 hover:text-red-700 px-2 py-1 text-sm"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link 
              to="/login" 
              aria-label="Login"
              className="text-customPink hover:text-customGreen transition-colors"
            >
              <User className="w-6 h-6" />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-[#cbb3e3] shadow-lg">
          {[...NAV_ITEMS, { 
            path: isLoggedIn ? '/profile' : '/login', 
            label: isLoggedIn ? 'Profile' : 'Login' 
          }].map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`block px-6 py-3 text-lg hover:bg-purple-100 ${
                isActive(path) ? 'text-purple-700 font-semibold' : 'text-gray-900'
              }`}
              onClick={() => setIsMenuOpen(false)}
              aria-current={isActive(path) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
          {isLoggedIn && (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-6 py-3 text-lg hover:bg-purple-100 text-gray-900"
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;