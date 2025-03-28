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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      ref={modalRef}
      tabIndex={-1}
    >
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full relative">
        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent event propagation
            onClose(); // Call the onClose function
          }}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-50"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Image slider */}
        {images.length > 0 ? (
          <Swiper
            navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }} // Enable navigation arrows
            pagination={{ clickable: true }} // Enable pagination dots
            modules={[Navigation, Pagination]} // Import and use the modules
            className="w-full h-96 relative" // Fixed height for Swiper container
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image || "https://placehold.co/600x400"} // Fallback image if the URL is invalid
                  alt={`Product Image ${index + 1}`}
                  className="w-full h-full object-contain" // Ensure the image fits within the container
                  loading="lazy" // Lazy load images
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/600x400"; // Fallback image on error
                  }}
                />
              </SwiperSlide>
            ))}
            {/* Navigation Arrows */}
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
          </Swiper>
        ) : (
          <div className="w-full h-96 flex items-center justify-center text-gray-600">
            No images available.
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;