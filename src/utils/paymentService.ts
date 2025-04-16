import Razorpay from 'razorpay';
import { supabase } from '../utils/supabaseClient';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!
});

interface OrderItem {
  product_id: string;
  quantity: number;
  price: number;
}

interface OrderDetails {
  id: string;
  amount: number;
  currency: string;
  status: string;
  items: OrderItem[];
  user_id?: string;
  payment_id?: string;
  payment_method?: string;
}

export const createRazorpayOrder = async (amount: number, currency: string = 'INR') => {
  const options = {
    amount: amount * 100, // Razorpay expects amount in paise
    currency,
    receipt: `order_rcpt_${Date.now()}`
  };
  
  try {
    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
};

export const verifyPayment = async (paymentId: string, orderId: string, amount: number) => {
  try {
    // Verify with Razorpay API
    const payment = await razorpay.payments.fetch(paymentId);
    
    // Check if payment is successful and matches order details
    const isVerified = (
      payment.status === 'captured' &&
      payment.order_id === orderId &&
      payment.amount === amount * 100 // Convert to paise
    );

    return isVerified;
  } catch (error) {
    console.error('Payment verification failed:', error);
    return false;
  }
};

export const saveOrderToDatabase = async (orderData: OrderDetails) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([{
      id: orderData.id,
      amount: orderData.amount,
      currency: orderData.currency,
      status: orderData.status,
      items: orderData.items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      })),
      payment_id: orderData.payment_id,
      payment_method: orderData.payment_method,
      user_id: orderData.user_id
    }]);
    
  if (error) throw error;
  return data;
};