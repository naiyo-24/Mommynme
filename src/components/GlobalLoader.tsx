// components/GlobalLoader.tsx
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

export default function GlobalLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800); // Adjust timing as needed
    
    return () => clearTimeout(timer);
  }, [location.pathname]); // Trigger on route path change

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <HashLoader color="#ba50c7" size={70} />
    </div>
  );
}