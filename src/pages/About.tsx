import img from "../assets/images/About.png";
import "../styles/glassmorphism.css";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function About() {
  return (
    <div className="bg-gradient-to-br from-modern-primary/5 to-modern-secondary/10 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blur-circle w-80 h-80 bg-modern-accent/15 top-[5%] right-[10%]"></div>
        <div className="blur-circle w-96 h-96 bg-modern-primary/15 bottom-[5%] left-[5%]"></div>
        <div className="blur-circle w-72 h-72 bg-modern-secondary/15 top-[40%] left-[20%] float"></div>
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative pt-20 py-12 md:py-20 z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 font-poppins">
              About <span className="text-modern-primary">Mommy n Me</span>
            </h1>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto text-gray-700 font-light">
              Where every stitch tells a story of love, creativity, and
              craftsmanship.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Mission Section */}
      <section className="py-12 md:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-2 md:order-1"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-modern-primary font-poppins relative inline-block">
                Story <span className="text-gray-800"> of the founder</span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 w-32 bg-gradient-to-r from-modern-primary to-modern-accent"></div>
              </h2>

              <div className="space-y-4">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-gray-700 text-lg leading-relaxed glass-card p-4"
                >
                  Welcome to{" "}
                  <span className="font-semibold text-modern-primary">
                    Mommy n Me
                  </span>
                  , where every stitch tells a story! We're a passionate crochet
                  brand from the{" "}
                  <span className="font-semibold">City of Joy, Kolkata</span>,
                  dedicated to bringing handmade warmth, beauty, and craftsmanship
                  to your life.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-gray-700 text-lg leading-relaxed glass-card p-4"
                >
                  Our journey began in{" "}
                  <span className="font-semibold">August 2022</span> when my mom
                  and I turned our shared love for crochet into something bigger.
                  What started as a hobby soon grew into a brand fueled by
                  creativity, craftsmanship, and a deep appreciation for handmade
                  art.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-gray-700 text-lg leading-relaxed glass-card p-4"
                >
                  As our love for crochet grew, so did our family of{" "}
                  <span className="font-semibold">5 artisans across India</span>.
                  Today, we are proud to work with talented craftsmen who help us
                  bring beautiful, handmade creations to life.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-gray-700 text-lg leading-relaxed glass-card p-4"
                >
                  With over{" "}
                  <span className="font-semibold">25,000+ followers</span> on
                  Instagram and a growing community, we are on a mission to
                  celebrate slow fashion, sustainability, and the charm of
                  handcrafted goods. Every piece we create is a labor of love,
                  crafted with care and precision.
                </motion.p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-1 md:order-2"
            >
              <div className="glass-card p-2 shadow-glass pulse-glow">
                <img
                  src={img}
                  alt="Team meeting"
                  className="rounded-lg w-full h-auto max-w-md mx-auto md:max-w-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-modern-primary font-poppins relative inline-block">
              Our <span className="text-gray-800">Values</span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 w-24 bg-gradient-to-r from-modern-accent to-modern-primary mx-auto"></div>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Made with Love",
                description:
                  "Every piece is handmade — from our hands to your heart, with a little extra love in every stitch.",
              },
              {
                title: "Quality That Feels Like a Warm Hug",
                description:
                  "Soft, sturdy, and stitched to last — we believe your crochet should be as cozy as it is charming.",
              },
              {
                title: "Crafted Just for You",
                description:
                  "Whether it's a cute keychain or a custom creation, we make it personal — because you deserve one-of-a-kind, always.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="glass-card p-6 hover-lift"
              >
                <h3 className="text-xl font-semibold mb-4 text-modern-primary">
                  {value.title}
                </h3>
                <p className="text-gray-700">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
