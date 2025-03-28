import { motion } from 'framer-motion';
import { FaShippingFast, FaHandshake, FaClock, FaBoxOpen, FaWhatsapp, FaInstagram } from 'react-icons/fa';

const ShippingPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-2xl mx-4 border border-purple-100"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-purple-800">
        Shipping Policy
      </h2>
      <div className="space-y-6 sm:space-y-8 text-gray-700 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto pr-2 sm:pr-4 text-sm sm:text-base">
        {/* Standard Shipping */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <FaShippingFast className="text-2xl text-purple-600" />
            <h3 className="text-lg sm:text-xl font-semibold text-purple-600">Standard Shipping</h3>
          </div>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Standard shipping rate is <span className="font-semibold text-purple-600">₹80</span> for all orders in India.
            </li>
            <li>
              Our usual shipping time is <span className="font-semibold text-purple-600">5-12 working days</span> (Saturday & Sunday are our days off).
            </li>
            <li>
              Please place your orders considering this timeline. Orders will not be cancelled on request in any case.
            </li>
          </ul>
        </div>

        {/* Shipping Partner */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <FaHandshake className="text-2xl text-purple-600" />
            <h3 className="text-lg sm:text-xl font-semibold text-purple-600">Shipping Partner</h3>
          </div>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Our orders are shipped using <span className="font-semibold text-purple-600">India Speed Post / DTDC</span>.
            </li>
            <li>
              You will receive the tracking ID within <span className="font-semibold text-purple-600">24 hours</span> of the product being shipped.
            </li>
          </ul>
        </div>

        {/* Bulk Orders / International Orders */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <FaBoxOpen className="text-2xl text-purple-600" />
            <h3 className="text-lg sm:text-xl font-semibold text-purple-600">Bulk Orders / International Orders</h3>
          </div>
          <p>
            Please reach out to us for bulk orders on our{' '}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 font-semibold hover:underline"
            >
              Instagram
            </a>.
          </p>
        </div>

        {/* Delivery Delays */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <FaClock className="text-2xl text-purple-600" />
            <h3 className="text-lg sm:text-xl font-semibold text-purple-600">Delivery Delays</h3>
          </div>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Please note that after a product leaves our side, we're dependent on our courier partners. Any delay on their side (connectivity to the state or otherwise) is not in our hands.
            </li>
            <li>
              Please reach out to us on our{' '}
              <a
                href={`https://wa.me/6289470702`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 font-semibold hover:underline"
              >
                WhatsApp <FaWhatsapp className="inline-block" />
              </a>{' '}
              at <span className="font-semibold text-purple-600">6289470702</span>. We will raise a complaint to help speed up the resolution but will not be held responsible for delays caused by the courier companies.
            </li>
            <li>
              Changes to an address can only be made within{' '}
              <span className="font-semibold text-purple-600">2 working days</span>. Please contact us via{' '}
              <a
                href="https://wa.me/6289470702"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 font-semibold hover:underline"
              >
                WhatsApp <FaWhatsapp className="inline-block" />
              </a>{' '}
              or{' '}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 font-semibold hover:underline"
              >
                Instagram <FaInstagram className="inline-block" />
              </a>.
            </li>
          </ul>
        </div>

        {/* Missing Packages & Delivery Disputes */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <FaBoxOpen className="text-2xl text-purple-600" />
            <h3 className="text-lg sm:text-xl font-semibold text-purple-600">Missing Packages & Delivery Disputes</h3>
          </div>
          <ul className="list-disc list-inside space-y-2">
            <li>
              If your order has been lost in transit or your tracking says it was delivered but you did not receive it, please contact us. We will raise a delivery dispute with our delivery partner.
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default ShippingPolicy;