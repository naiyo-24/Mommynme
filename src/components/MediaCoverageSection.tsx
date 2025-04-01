import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface MediaCoverage {
  id: string;
  outlet: string;
  logo_url: string;
  article_title: string;
  article_excerpt: string;
  article_url: string;
  feature_image: string;
  publish_date: string;
  author: string;
}

export function MediaCoverageSection() {
  const [mediaCoverage] = useState<MediaCoverage[]>([
    {
      id: "1",
      outlet: "Times of India",
      logo_url: "/src/assets/images/TOI.png", // Updated path
      article_title: "For the love of yarns",
      article_excerpt: "Traditional crafts of knitting and crocheting...",
      article_url: "https://timesofindia.indiatimes.com/city/ranchi/for-the-love-of-yarns/articleshow/116947875.cms",
      feature_image: "/src/assets/images/TOI.png", // Updated path
      publish_date: "March 15, 2023",
      author: "Kristina Tewary"
    }
  ]);

  // Fallback image in case of loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://placehold.co/600x400?text=TOI+Feature";
    target.onerror = null; // Prevent infinite loop
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-black mb-4">
            As Featured In
          </h2>
          <div className="w-24 h-1 bg-[#d55cfa] mx-auto"></div>
        </div>

        {/* Main Feature Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#EAE5DD]">
          {/* Newspaper Header */}
          <div className="bg-[#9962b3] py-3 px-6 flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={mediaCoverage[0].logo_url} 
                alt={mediaCoverage[0].outlet} 
                className="h-8 mr-3"
                onError={handleImageError}
              />
              <span className="text-white font-medium">{mediaCoverage[0].outlet}</span>
            </div>
            <span className="text-white text-sm">{mediaCoverage[0].publish_date}</span>
          </div>

          {/* Feature Content */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Feature Image */}
              <div className="md:w-1/2">
                <div className="relative overflow-hidden rounded-lg border border-[#EAE5DD] min-h-[300px]">
                  <img
                    src={mediaCoverage[0].feature_image}
                    alt={mediaCoverage[0].article_title}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                    <p className="text-sm italic">"{mediaCoverage[0].article_excerpt}"</p>
                  </div>
                </div>
              </div>

              {/* Article Details */}
              <div className="md:w-1/2">
                <h3 className="text-2xl md:text-3xl font-serif text-[#5C4B3F] mb-4">
                  {mediaCoverage[0].article_title}
                </h3>
                <div className="prose max-w-none text-[#5C4B3F]/90 mb-6">
                  <p className="mb-4">
                    The Times of India highlights the revival of traditional knitting and crocheting 
                    crafts post-pandemic, featuring handmade woolen creations.
                  </p>
                </div>
                <a 
                  href={mediaCoverage[0].article_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-[#9962b3] hover:bg-[#8335b0] text-white rounded-full transition-colors"
                >
                  Read Full Article
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}