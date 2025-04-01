import { ArrowRight } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export function BrandCollaborationSection() {
  const collaboration = {
    name: "Dot & Key",
    logo_url: "src/assets/images/Dot&key2.png",
    description: "Special edition wool-infused skincare collection",
    collaboration_url: "https://www.instagram.com/p/DG3A_qPz7La/?igsh=MWhmZXA4NW5tdDB5Yg==",
    photos: [
      "src/assets/images/Dot&key2.png",
      "src/assets/images/Dot&key1.png", 
      "src/assets/images/Dot&key.png"
    ]
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  };

  return (
    <section className="py-16 bg-cream-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brown-900 mb-4">
            Brand Collaboration
          </h2>
          <div className="w-24 h-1  bg-[#d55cfa] mx-auto"></div>
        </div>

        <div className="bg-cream-50 rounded-xl shadow-lg overflow-hidden">
          {/* Brand Header */}
          <div className="flex items-center justify-between p-6 bg-brown-900">
            <div className="flex items-center">
              <img 
                src={collaboration.logo_url}
                alt={collaboration.name}
                className="h-10 mr-4"
              />
              <span className="text-cream-50 font-medium text-xl">
                {collaboration.name}
              </span>
            </div>
            <a 
              href={collaboration.collaboration_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9962b3] hover:text-[#8335b0] text-sm"
            >
              View on Instagram
            </a>
          </div>

          {/* Photo Slider */}
          <div className="p-4">
            <Slider {...sliderSettings}>
              {collaboration.photos.map((photo, index) => (
                <div key={index} className="px-2">
                  <div className="relative pt-[100%]"> {/* Square aspect ratio */}
                    <img
                      src={photo}
                      alt={`${collaboration.name} collaboration ${index + 1}`}
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {/* Description */}
          <div className="p-6 text-center">
            <p className="text-brown-700 mb-6">
              {collaboration.description}
            </p>
            <a
              href={collaboration.collaboration_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-2 bg-[#9962b3] hover:bg-[#8335b0] text-white rounded-full transition-colors"
            >
              See Full Collaboration
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}