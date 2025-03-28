import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginSignupPage from "./pages/LoginSignupPage"; // Import the LoginSignupPage

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const CartPage = lazy(() => import("./components/CartPage"));
// const NotFound = lazy(() => import("./pages/NotFound")); // Create this component

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <ScrollToTop />
          <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginSignupPage />} />
              {/* <Route path="*" element={<NotFound />} /> 404 Route */}
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;