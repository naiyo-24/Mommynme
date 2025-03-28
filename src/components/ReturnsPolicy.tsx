import React from 'react';
import { FaTimesCircle, FaMoneyBillWave, FaExchangeAlt } from 'react-icons/fa';

const ReturnsPolicy: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 sm:p-8 rounded-lg shadow-lg border border-purple-100">
      {/* Main Heading */}
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-purple-800">Returns Policy</h2>

      <div className="space-y-6 sm:space-y-8">
        {/* Cancellation Section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <FaTimesCircle className="text-2xl text-purple-600" />
            <h3 className="text-xl font-semibold text-purple-600">Cancellation</h3>
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Orders cannot be canceled once placed.</li>
            <li>
              For any changes required in colour customisation, please contact us on our{' '}
              <a
                href="https://wa.me/6289470702"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 font-semibold hover:underline"
              >
                WhatsApp
              </a>{' '}
              or{' '}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 font-semibold hover:underline"
              >
                Instagram
              </a>{' '}
              within 2-3 hours of placing the order.
            </li>
          </ul>
        </div>

        {/* Refunds Section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <FaMoneyBillWave className="text-2xl text-purple-600" />
            <h3 className="text-xl font-semibold text-purple-600">Refunds</h3>
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              We would be happy to refund for any product that is broken/damaged in transit or if the
              product doesn’t include something you’ve ordered.
            </li>
            <li>
              Please note that, after the product is dispatched from our side, we are dependent on the
              courier partners. Any delay on their side is not in our hands. So in this case, we will
              not initiate any refund.
            </li>
            <li>
              Bouquet wrapping will not be refunded for because it can be crumpled a little bit even
              after wrapping with bubble wrap and not being handled safely in transit.
            </li>
            <li>
              For any refunds, an unboxing video needs to be recorded and sent to our{' '}
              <a
                href="https://wa.me/6289470702"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 font-semibold hover:underline"
              >
                WhatsApp
              </a>{' '}
              or{' '}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 font-semibold hover:underline"
              >
                Instagram
              </a>{' '}
              within 48 hours of the product being delivered.
            </li>
            <li>
              The product needs to be resent to our address within 3 days of reviewing the complaint.
              Shipping charges for damaged goods will be borne by us.
            </li>
          </ul>
        </div>

        {/* Exchange Section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <FaExchangeAlt className="text-2xl text-purple-600" />
            <h3 className="text-xl font-semibold text-purple-600">Exchange</h3>
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>We do not provide exchange or returns for any products.</li>
            <li>
              If you have received a damaged product, please reach out to us on our{' '}
              <a
                href="https://wa.me/6289470702"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 font-semibold hover:underline"
              >
                WhatsApp
              </a>{' '}
              at <span className="font-semibold text-purple-600">6289470702</span> within 48 hours of
              the product being delivered.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPolicy;