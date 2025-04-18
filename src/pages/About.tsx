import img from "../assets/images/About.png";

export default function About() {
  return (
    <div style={{ backgroundColor: "#E6E6FA" }}>
      {/* Hero Section */}
      <div
        className="relative pt-20 py-12 md:py-20"
        style={{ backgroundColor: "#ede1fc" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-black">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 font-poppins">
              About <span className="text-purple-600">Mommy n Me</span>
            </h1>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto text-gray-700 font-light">
              Where every stitch tells a story of love, creativity, and
              craftsmanship.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-purple-600 font-poppins">
              Story <span className="text-black"> of the founder</span>
              </h2>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Welcome to{" "}
                <span className="font-semibold text-purple-600">
                  Mommy n Me
                </span>
                , where every stitch tells a story! We’re a passionate crochet
                brand from the{" "}
                <span className="font-semibold">City of Joy, Kolkata</span>,
                dedicated to bringing handmade warmth, beauty, and craftsmanship
                to your life.
              </p>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Our journey began in{" "}
                <span className="font-semibold">August 2022</span> when my mom
                and I turned our shared love for crochet into something bigger.
                What started as a hobby soon grew into a brand fueled by
                creativity, craftsmanship, and a deep appreciation for handmade
                art.
              </p>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                As our love for crochet grew, so did our family of{" "}
                <span className="font-semibold">5 artisans across India</span>.
                Today, we are proud to work with talented craftsmen who help us
                bring beautiful, handmade creations to life.
              </p>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                With over{" "}
                <span className="font-semibold">25,000+ followers</span> on
                Instagram and a growing community, we are on a mission to
                celebrate slow fashion, sustainability, and the charm of
                handcrafted goods. Every piece we create is a labor of love,
                crafted with care and precision.
              </p>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Our journey began with a simple yet unique creation—
                <span className="font-semibold">crochet earrings</span>. In
                2022, my mom and I wanted to combine our love for crochet with
                wearable art. We created our first pair of earrings with
                intricate designs, vibrant colors, and a whole lot of heart.
                They were an instant hit, and that’s how{" "}
                <span className="font-semibold">Mommy n Me</span> was born.
              </p>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                What started as a few earrings for ourselves quickly turned into
                a growing collection, loved by so many who appreciate the beauty
                of handmade, one-of-a-kind pieces. From the very beginning, we
                have been incredibly blessed with diverse orders from our
                customers. Every product we showcase on our Instagram feed is a
                reflection of the love and trust our customers have given us.
              </p>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                As our brand grew, so did our creativity. We started offering
                customized pieces, making each creation even more special and
                personal.
              </p>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Today, <span className="font-semibold">Mommy n Me</span> is home
                to a variety of handcrafted treasures—
                <span className="font-semibold">
                  Earrings, Flowers, Flower pots, Claw clips, Hair accessories
                  and Bows, Keychains, Plushies, Room decor
                </span>
                , and so much more! Every product is made with love, precision,
                and the belief that handmade art brings warmth and joy to
                everyday life.
              </p>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Thank you for being part of our journey! Whether you’re here for
                a cozy crochet piece or to support handmade artistry, we’re so
                glad you’re here. Follow our story on Instagram or shop our
                latest creations—we can’t wait to share our craft with you!
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img
                src={img}
                alt="Team meeting"
                className="rounded-lg shadow-lg w-full h-auto max-w-md mx-auto md:max-w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 md:mb-16 text-purple-600 font-poppins">
            Our <span className="text-black">Leadership Team</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                name: "Sarah Anderson",
                role: "CEO & Founder",
                image:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80", // Placeholder image
              },
              {
                name: "Michael Roberts",
                role: "Head of Sustainability",
                image:
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e", // Placeholder image
              },
              {
                name: "Atreyi Kundu",
                role: "Product Director",
                image:
                  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
                />
                <h3 className="text-xl font-semibold mb-2 text-purple-600">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Values Section */}
      <section
        style={{ backgroundColor: "#E6E6FA" }}
        className="py-12 md:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 md:mb-16 text-purple-600 font-poppins">
            Our <span className="text-black">Values</span>
          </h2>
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
                  "Whether it’s a cute keychain or a custom creation, we make it personal — because you deserve one-of-a-kind, always.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-4 text-purple-600">
                  {value.title}
                </h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
