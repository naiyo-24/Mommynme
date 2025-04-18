import React from 'react';
import { Mail, MapPin, Phone, MessageSquare, Instagram, Heart, Circle } from 'lucide-react';

export default function Contact() {
  return (
    <div style={{ backgroundColor: '#FFF9F9' }} className="min-h-screen">
      {/* Hero Section with cozy yarn texture */}
      <div style={{ 
        backgroundColor: '#FDF2FA',
        backgroundImage: 'radial-gradient(#E6E6FA 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} className="py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Circle size={400} className="text-purple-300" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center text-gray-800">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Let's Connect</h1>
            <p className="text-xl max-w-2xl mx-auto italic text-purple-700">
              "Where every stitch weaves a conversation of warmth and care"
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form - Now with cozy yarn-inspired design */}
          <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-purple-300 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-100 rounded-full opacity-20"></div>
            <h2 className="text-2xl font-bold mb-6 text-purple-800 font-serif flex items-center">
              <Heart className="w-6 h-6 mr-2 text-pink-500" />
              Stitch Us a Message
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-purple-100 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent bg-purple-50"
                  placeholder="Your beautiful name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-purple-100 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent bg-purple-50"
                  placeholder="your.cozy@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-purple-100 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent bg-purple-50"
                  placeholder="Your crochet inquiry..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                  Your Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border border-purple-100 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent bg-purple-50"
                  placeholder="Share your thoughts... each word is a stitch in our conversation"
                />
              </div>  
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-3 rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all shadow-md hover:shadow-lg flex items-center justify-center mt-0"
              >
                <Circle className="w-5 h-5 mr-2" />
                Weave Your Message
              </button>
            </form>
          </div>

          {/* Contact Information - Cozy and warm styling */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-purple-800 font-serif">Our Threads of Connection</h2>
              <p className="text-gray-600 mb-8 italic">
                "Just like every yarn has its perfect match, we're here to connect with you"
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg border border-purple-100">
                <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-purple-700" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-purple-800">Our Cozy Corner</h3>
                  <p className="text-gray-700">
                    2C, Smriti Apartment<br />
                    North Station Road, Agarpara<br />
                    Kolkata - 700109, West Bengal
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-pink-50 rounded-lg border border-pink-100">
                <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-pink-700" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-pink-800">Warm Call</h3>
                  <p className="text-gray-700">
                    +91 62894 70702<br />
                    Monday - Saturday, 10am - 7pm IST
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-green-800">Quick Stitch (WhatsApp)</h3>
                  <p className="text-gray-700">
                    <a href="https://wa.me/916289470702" className="text-green-600 hover:underline font-medium">
                      +91 62894 70702
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <Instagram className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-blue-800">Yarn Tales (Instagram)</h3>
                  <p className="text-gray-700">
                    <a href="https://instagram.com/_mommy.n.me_" className="text-blue-600 hover:underline font-medium">
                      @_mommy.n.me_
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-yellow-700" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-yellow-800">Love Letters</h3>
                  <p className="text-gray-700">
                    <a href="mailto:info@mommyandme.com" className="text-yellow-600 hover:underline font-medium">
                      atreyikundu.2002@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Map with cozy frame */}
            <div className="mt-12 border-4 border-purple-100 rounded-xl overflow-hidden shadow-md">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.965425106847!2d88.3812012!3d22.6831486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89d007fea4343%3A0x178c0ed467e5d73b!2sSmriti%20Apartment!5e0!3m2!1sen!2sin!4v1712345678901!5m2!1sen!2sin" 
                width="100%" 
                height="300" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Our Cozy Crochet Corner - Smriti Apartment"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section - Now "Common Yarn Questions" */}
      <section style={{ 
        backgroundColor: '#FDF2FA',
        backgroundImage: 'repeating-linear-gradient(45deg, #F3E5F5 0px, #F3E5F5 10px, #FDF2FA 10px, #FDF2FA 20px)'
      }} className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-purple-800 font-serif">Common Yarn Questions</h2>
          <p className="text-center text-purple-600 mb-12 italic max-w-2xl mx-auto">
            "Just like untangling yarn, we're here to unravel all your queries"
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "How do I care for my woolen crochet items?",
                answer: "Hand wash in lukewarm water with mild detergent and lay flat to dry, avoid iron to maintain the stitches."
              },
              {
                question: "Can I request custom crochet designs?",
                answer: "Absolutely ! You can surely request for crochet custom design. We would love to create a new piece that will hold your story. Please drop a DM on our Instagram about your custom order, we would love to customise that for you."
              },
              {
                question: "What yarns do you work with?",
                answer: "For our all of the crochet products, we do use premium quality acrylic yarn. For our earrings we do use high-quality cotton embroidery threads."
              },
              {
                question: "How long does a custom order take?",
                answer: "Custom orders does take a bit more longer time than our usual orders. Each of the stitches receive our undivided attention, so the whole time for the piece will depend on the complexity of the design"
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-purple-200 hover:border-purple-400 transition-all">
                <h3 className="font-semibold mb-2 text-purple-700 flex items-center">
                  <span className="inline-block w-3 h-3 bg-purple-400 rounded-full mr-2"></span>
                  {faq.question}
                </h3>
                <p className="text-gray-600 pl-5">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
