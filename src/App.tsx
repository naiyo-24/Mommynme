import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GlobalLoader from "./components/GlobalLoader";
import LoginSignupPage from "./pages/LoginSignupPage";
import NotFound from "./pages/NotFound";
import { HashLoader } from 'react-spinners';
// Removed Supabase import as we're now using localStorage for authentication

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const CartPage = lazy(() => import("./components/CartPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
};

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);

  useEffect(() => {
    // Check if user is authenticated based on localStorage
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsAuthenticated(isLoggedIn);
    };
    
    checkAuth();
    
    // Listen for storage changes (login/logout)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "isLoggedIn") {
        checkAuth();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Check login status regularly (every second)
    const checkLoginInterval = setInterval(checkAuth, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(checkLoginInterval);
    };
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <HashLoader color="#4f46e5" size={50} />
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <GlobalLoader />
        <Navbar />
        <main className="flex-grow">
          <ScrollToTop />
          <Suspense fallback={
            <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-white/80 backdrop-blur-sm">
              <HashLoader color="#4f46e5" size={50} />
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginSignupPage />} />
              
              {/* Protected Routes */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              
              {/* 404 Catch-all route - MUST be last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;