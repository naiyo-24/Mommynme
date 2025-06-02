import { useContext, useState } from 'react';
import { CartContext, CartItem } from './CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/glassmorphism.css';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useContext(CartContext);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };
  
  const toggleExpand = (id: string) => {
    if (expandedItem === id) {
      setExpandedItem(null);
    } else {
      setExpandedItem(id);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen py-12 bg-gradient-to-br from-modern-primary/5 to-modern-secondary/10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 rounded-xl text-center">
            <h1 className="text-2xl font-semibold mb-6">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Link 
              to="/products"
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-modern-primary to-modern-accent text-white font-medium hover:shadow-lg transition-all"
            >
              <ArrowLeft className="mr-2" size={16} /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-modern-primary/5 to-modern-secondary/10 relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blur-circle w-72 h-72 bg-modern-accent/20 top-[5%] right-[10%]"></div>
        <div className="blur-circle w-96 h-96 bg-modern-secondary/15 bottom-[10%] left-[5%]"></div>
        <div className="blur-circle w-64 h-64 bg-modern-primary/15 top-[40%] left-[20%] float"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">Your Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="glass-card overflow-hidden rounded-xl mb-6">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">{cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}</h2>
                  <button 
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm transition-colors"
                  >
                    <Trash2 size={16} /> Clear Cart
                  </button>
                </div>
                
                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const isExpanded = expandedItem === item.id;
                    
                    return (
                      <motion.div 
                        key={`${item.id}-${item.color}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white/40 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm border border-white/20"
                      >
                        <div className="p-4 flex gap-4">
                          <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                            <img 
                              src={item.image || 'https://placehold.co/200x200'} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "https://placehold.co/200x200";
                              }}
                            />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-medium text-gray-800">{item.name}</h3>
                                {item.category && (
                                  <p className="text-sm text-gray-500">{item.category}</p>
                                )}
                                {item.color && (
                                  <div className="flex items-center mt-1">
                                    <span className="text-sm text-gray-500 mr-2">Color:</span>
                                    <span 
                                      className="w-4 h-4 rounded-full border border-gray-300" 
                                      style={{ backgroundColor: item.color }}
                                    ></span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="text-right">
                                <p className="font-semibold text-modern-primary">₹{item.price.toFixed(2)}</p>
                                {item.standard_rate && item.standard_rate > item.price && (
                                  <p className="text-sm text-gray-400 line-through">
                                    ₹{item.standard_rate.toFixed(2)}
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center mt-2">
                              <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                                <button
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="px-2 text-sm font-medium">{item.quantity}</span>
                                <button
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                              
                              <div className="flex items-center gap-4">
                                <p className="font-semibold">
                                  ₹{(item.price * item.quantity).toFixed(2)}
                                </p>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div 
                          className="px-4 py-2 bg-gray-50/50 border-t border-gray-100 cursor-pointer hover:bg-gray-50/80 transition-colors flex justify-between items-center"
                          onClick={() => toggleExpand(item.id)}
                        >
                          <span className="text-sm text-gray-500">
                            {isExpanded ? 'Hide details' : 'Show details'}
                          </span>
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                        
                        {isExpanded && (
                          <div className="px-4 py-3 bg-gray-50/30 border-t border-gray-100">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              {item.item_code && (
                                <div>
                                  <span className="text-gray-500">Item Code:</span>
                                  <p>{item.item_code}</p>
                                </div>
                              )}
                              {item.brand && (
                                <div>
                                  <span className="text-gray-500">Brand:</span>
                                  <p>{item.brand}</p>
                                </div>
                              )}
                              {item.stock_uom && (
                                <div>
                                  <span className="text-gray-500">Unit:</span>
                                  <p>{item.stock_uom}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/products')}
              className="flex items-center gap-2 font-medium text-modern-primary hover:text-modern-secondary transition-colors"
            >
              <ArrowLeft size={16} /> Continue Shopping
            </button>
          </div>
          
          <div className="lg:w-1/3">
            <div className="glass-card rounded-xl overflow-hidden sticky top-6">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>₹{(cartItems.length > 0 ? 50 : 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>₹{(getTotalPrice() * 0.18).toFixed(2)}</span>
                  </div>
                  
                  <div className="h-px bg-gray-200 my-4"></div>
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{(getTotalPrice() + (cartItems.length > 0 ? 50 : 0) + getTotalPrice() * 0.18).toFixed(2)}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full mt-8 py-3 rounded-full bg-gradient-to-r from-modern-primary to-modern-accent text-white font-medium hover:shadow-lg transition-all"
                >
                  Proceed to Checkout
                </button>
                
                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>Secured checkout experience</p>
                  <p className="mt-1">All payments are processed securely</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}