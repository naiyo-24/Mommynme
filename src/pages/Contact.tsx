import React from 'react';
import { Mail, MapPin, Phone, MessageSquare, Instagram, Heart, Circle } from 'lucide-react';
import "../styles/glassmorphism.css";
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-modern-primary/5 to-modern-secondary/10 relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blur-circle w-72 h-72 bg-modern-accent/15 top-[10%] right-[15%]"></div>
        <div className="blur-circle w-96 h-96 bg-modern-primary/15 bottom-[10%] left-[5%]"></div>
        <div className="blur-circle w-64 h-64 bg-modern-secondary/15 top-[40%] left-[20%] float"></div>
      </div>
      
      {/* Hero Section */}
      <div className="py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-7xl mx-auto px-6 relative"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif text-gray-800">Let's Connect</h1>
            <p className="text-xl max-w-2xl mx-auto italic text-modern-primary glass-card px-8 py-4 inline-block">
              "Where every stitch weaves a conversation of warmth and care"
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Contact Information */}
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="glass-card p-8 rounded-lg relative overflow-hidden"
          >
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-modern-primary/30 rounded-full opacity-60 blur-2xl"></div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-modern-primary font-serif flex items-center">
                <Heart className="w-6 h-6 mr-2 text-modern-accent" />
                Stitch Us a Message
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <span className="w-2 h-2 bg-modern-secondary rounded-full mr-2"></span>
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-white/30 rounded-lg focus:ring-2 focus:ring-modern-primary focus:border-transparent glass-button"
                    placeholder="Your beautiful name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <span className="w-2 h-2 bg-modern-secondary rounded-full mr-2"></span>
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-white/30 rounded-lg focus:ring-2 focus:ring-modern-primary focus:border-transparent glass-button"
                    placeholder="your.cozy@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <span className="w-2 h-2 bg-modern-secondary rounded-full mr-2"></span>
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-white/30 rounded-lg focus:ring-2 focus:ring-modern-primary focus:border-transparent glass-button"
                    placeholder="Your crochet inquiry..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <span className="w-2 h-2 bg-modern-secondary rounded-full mr-2"></span>
                    Your Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border border-white/30 rounded-lg focus:ring-2 focus:ring-modern-primary focus:border-transparent glass-button"
                    placeholder="Share your thoughts... each word is a stitch in our conversation"
                  />
                </div>  
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-modern-primary to-modern-secondary text-white py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center mt-0"
                >
                  <Circle className="w-5 h-5 mr-2" />
                  Weave Your Message
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-2xl font-bold mb-6 text-modern-primary font-serif relative inline-block"
              >
                Our Threads of Connection
                <div className="absolute -bottom-2 left-0 right-0 h-1 w-40 bg-gradient-to-r from-modern-accent to-modern-primary"></div>
              </motion.h2>
              <p className="text-gray-600 mb-8 italic">
                "Just like every yarn has its perfect match, we're here to connect with you"
              </p>
            </div>

            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="glass-card p-4 hover-lift"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-modern-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-modern-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-modern-primary">Our Cozy Corner</h3>
                    <p className="text-gray-700">
                      2C, Smriti Apartment<br />
                      North Station Road, Agarpara<br />
                      Kolkata - 700109, West Bengal
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="glass-card p-4 hover-lift"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-modern-accent/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-modern-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-modern-accent">Warm Call</h3>
                    <p className="text-gray-700">
                      +91 62894 70702<br />
                      Monday - Saturday, 10am - 7pm IST
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="glass-card p-4 hover-lift"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-modern-secondary/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-modern-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-modern-secondary">Quick Stitch (WhatsApp)</h3>
                    <p className="text-gray-700">
                      <a href="https://wa.me/916289470702" className="text-modern-secondary hover:underline font-medium">
                        +91 62894 70702
                      </a>
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="glass-card p-4 hover-lift"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-modern-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-6 h-6 text-modern-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-modern-primary">Yarn Tales (Instagram)</h3>
                    <p className="text-gray-700">
                      <a href="https://instagram.com/_mommy.n.me_" className="text-modern-primary hover:underline font-medium">
                        @_mommy.n.me_
                      </a>
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="glass-card p-4 hover-lift"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-modern-accent/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-modern-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-modern-accent">Love Letters</h3>
                    <p className="text-gray-700">
                      <a href="mailto:atreyikundu.2002@gmail.com" className="text-modern-accent hover:underline font-medium">
                        atreyikundu.2002@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Map with cozy frame */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-12 glass-card p-2 shadow-glass overflow-hidden"
            >
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
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-modern-primary font-serif relative inline-block">
              Common Yarn Questions
              <div className="absolute -bottom-2 left-0 right-0 h-1 w-32 bg-gradient-to-r from-modern-accent to-modern-primary mx-auto"></div>
            </h2>
            <p className="text-center text-gray-600 mt-4 mb-8 italic max-w-2xl mx-auto">
              "Just like untangling yarn, we're here to unravel all your queries"
            </p>
          </motion.div>
          
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 hover-lift"
              >
                <h3 className="font-semibold mb-2 text-modern-primary flex items-center">
                  <span className="inline-block w-3 h-3 bg-modern-accent rounded-full mr-2"></span>
                  {faq.question}
                </h3>
                <p className="text-gray-700 pl-5">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}