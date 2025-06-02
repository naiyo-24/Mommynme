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

  // Add scroll effect for navbar
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar fixed top-0 left-0 w-full z-50 px-4 py-3 transition-all duration-300 ${scrolled ? 'scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden self-start bg-glass-100 backdrop-blur-sm p-2 rounded-lg transition-all duration-300 hover:bg-glass-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="w-6 h-6 text-modern-dark" /> : <Menu className="w-6 h-6 text-modern-dark" />}
        </button>

        {/* Centered Logo & Navigation */}
        <div className="flex-1 flex flex-col md:flex-row items-center md:items-center md:justify-between space-y-2 md:space-y-0">
          <Link to="/" className="flex items-center space-x-2 hover-lift" aria-label="Home">
            <div className="bg-glass-200 backdrop-blur-sm p-2 rounded-full shadow-glass-sm">
              <img src={icon} alt="Mommy n Me Logo" className="w-10 h-10 object-contain" />
            </div>
            <span className="text-3xl font-title1 font-bold bg-gradient-to-r from-modern-primary to-modern-secondary bg-clip-text text-transparent">
              Mommy n Me
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 bg-glass-100 backdrop-blur-sm rounded-full px-2 py-1 shadow-glass-sm">
            {NAV_ITEMS.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`relative px-5 py-2 rounded-full transition-all duration-300 ${
                  isActive(path) 
                    ? 'bg-modern-primary text-white font-medium shadow-md' 
                    : 'text-modern-dark/80 hover:bg-glass-200'
                }`}
                aria-current={isActive(path) ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-2">
          <a
            href="https://www.instagram.com/_mommy.n.me_"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="bg-glass-100 backdrop-blur-sm p-2 rounded-full transition-all duration-300 hover:bg-glass-200 hover:shadow-glass-sm hover-lift"
          >
            <Instagram className="w-5 h-5 text-modern-primary" />
          </a>

          <Link 
            to="/cart" 
            className="bg-glass-100 backdrop-blur-sm p-2 rounded-full transition-all duration-300 hover:bg-glass-200 hover:shadow-glass-sm relative hover-lift" 
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5 text-modern-primary" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-modern-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-pulse-soft">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <div className="relative group">
              <Link 
                to="/profile" 
                aria-label="Profile"
                className="bg-glass-100 backdrop-blur-sm p-2 rounded-full transition-all duration-300 hover:bg-glass-200 hover:shadow-glass-sm block hover-lift"
              >
                <User className="w-5 h-5 text-modern-primary" />
              </Link>
              <div className="absolute right-0 mt-2 hidden group-hover:block bg-glass-300 backdrop-blur-md rounded-lg shadow-glass border border-white/20 overflow-hidden transform origin-top-right transition-all duration-300 animate-fade-in">
                <Link 
                  to="/profile"
                  className="block px-4 py-2 text-sm text-modern-dark hover:bg-glass-400 transition-all duration-200"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-500 hover:bg-glass-400 transition-all duration-200"
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
              className="bg-glass-100 backdrop-blur-sm p-2 rounded-full transition-all duration-300 hover:bg-glass-200 hover:shadow-glass-sm hover-lift"
            >
              <User className="w-5 h-5 text-modern-primary" />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu md:hidden">
          {[...NAV_ITEMS, { 
            path: isLoggedIn ? '/profile' : '/login', 
            label: isLoggedIn ? 'Profile' : 'Login' 
          }].map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={isActive(path) ? 'active' : ''}
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
              className="w-80% px-4 py-2 mt-2 text-red-500 border border-red-100 rounded-lg bg-red-50/50 backdrop-blur-sm hover:bg-red-100/50 transition-all duration-200"
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