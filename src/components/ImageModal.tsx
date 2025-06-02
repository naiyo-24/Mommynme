import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useRef } from "react";

// Define the props for the ImageModal component
interface ImageModalProps {
  images: string[]; // Array of image URLs to display in the modal
  isOpen: boolean; // Whether the modal is open or closed
  onClose: () => void; // Function to close the modal
}

// ImageModal component
const ImageModal = ({ images, isOpen, onClose }: ImageModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on Esc key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Focus on modal when it opens
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  // Don't render the modal if it's not open
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-modern-dark/40 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      ref={modalRef}
      tabIndex={-1}
      onClick={onClose} // Close when clicking the backdrop
    >
      <div 
        className="bg-glass-300 backdrop-blur-md p-8 rounded-3xl max-w-4xl w-full relative shadow-glass border border-white/20 animate-slide-up"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-modern-accent/10 rounded-full blur-xl opacity-70"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-modern-primary/10 rounded-full blur-xl opacity-70"></div>
        
        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent event propagation
            onClose(); // Call the onClose function
          }}
          className="absolute top-5 right-5 p-2.5 bg-glass-200 backdrop-blur-sm rounded-full shadow-glass-sm hover:bg-glass-400 transition-all duration-300 z-50 w-10 h-10 flex items-center justify-center text-modern-dark/80 hover:text-modern-dark"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Image slider */}
        <div className="relative z-10 bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-glass-sm">
          {images.length > 0 ? (
            <Swiper
              navigation={{ 
                nextEl: ".swiper-button-next", 
                prevEl: ".swiper-button-prev" 
              }}
              pagination={{ 
                clickable: true,
                bulletActiveClass: "swiper-pagination-bullet-active bg-modern-primary" 
              }}
              modules={[Navigation, Pagination]}
              className="w-full h-[28rem] relative"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index} className="p-4">
                  <div className="w-full h-full relative overflow-hidden rounded-xl shadow-glass-sm">
                    <img
                      src={image || "https://placehold.co/600x400"}
                      alt={`Product Image ${index + 1}`}
                      className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/600x400";
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
              {/* Navigation Arrows with modern styling */}
              <div className="swiper-button-next !text-modern-primary after:!text-lg"></div>
              <div className="swiper-button-prev !text-modern-primary after:!text-lg"></div>
            </Swiper>
          ) : (
            <div className="w-full h-96 flex flex-col gap-4 items-center justify-center text-modern-dark/60">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="9" cy="9" r="2"></circle>
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
              </svg>
              <p>No images available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;