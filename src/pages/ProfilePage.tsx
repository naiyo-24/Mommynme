import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingBag, Gift, Heart, ChevronRight, LogOut, Edit } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  total: number;
  status: 'Delivered' | 'Processing' | 'Shipped';
}

interface UserProfile {
  name: string;
  email: string;
  joinDate: string;
  favoriteYarn: string;
  crochetSkill: string;
}

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'offers' | 'profile'>('profile');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in and fetch profile data from localStorage
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    if (!isLoggedIn) {
      // If not logged in, redirect to login page
      navigate("/login");
      return;
    }

    try {
      // Get customer data from localStorage
      const customerProfileStr = localStorage.getItem("customerProfile");
      
      if (customerProfileStr) {
        const customerData = JSON.parse(customerProfileStr);
        
        // Map Frappe API customer data to our UserProfile interface
        setUserProfile({
          name: customerData.customer_name || 'User',
          email: customerData.email_id || '',
          joinDate: new Date(customerData.creation).toLocaleDateString() || 'Recent',
          favoriteYarn: 'Not specified',
          crochetSkill: 'Beginner'
        });
      } else {
        console.error('No customer profile data found in localStorage');
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    }

    // Load sample orders (this could be replaced with an API call later)
    setOrders(sampleOrders);
    setLoading(false);
  }, [navigate]);

  // Sample offers data
  const offers = [
    {
      id: 1,
      title: "Winter Wool Collection",
      discount: "20% OFF",
      code: "WINTER20",
      validUntil: "Dec 31, 2023",
      description: "On all woolen yarns and crochet kits"
    },
    {
      id: 2,
      title: "Loyalty Discount",
      discount: "15% OFF",
      code: "LOYAL15",
      validUntil: "Ongoing",
      description: "Your exclusive member discount"
    },
    {
      id: 3,
      title: "Birthday Special",
      discount: "25% OFF",
      code: "BDAY25",
      validUntil: "Jan 15, 2024",
      description: "Celebrate with us! Valid during your birthday month"
    }
  ];

  // Sample orders data - this would be replaced by real orders from an API
  const sampleOrders: Order[] = [
    {
      id: "ORD-78945",
      date: "Nov 15, 2023",
      items: [
        { 
          name: "Chunky Wool Yarn Bundle", 
          quantity: 2, 
          price: 24.99, 
          image: "https://images.unsplash.com/photo-1618354691373-d8514fecafcb" 
        },
        { 
          name: "Premium Crochet Hook Set", 
          quantity: 1, 
          price: 18.50, 
          image: "https://images.unsplash.com/photo-1604176354204-9268737828e4" 
        }
      ],
      total: 68.48,
      status: "Delivered"
    },
    {
      id: "ORD-78123",
      date: "Dec 3, 2023",
      items: [
        { 
          name: "Winter Scarf Pattern Kit", 
          quantity: 1, 
          price: 32.99, 
          image: "https://images.unsplash.com/photo-1511192336575-5a79af67b614" 
        }
      ],
      total: 32.99,
      status: "Shipped"
    }
  ];

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("customerProfile");
    localStorage.removeItem("isLoggedIn");
    
    // Navigate to login page
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-modern-primary/10 to-modern-secondary/10">
        <div className="bg-glass-300 backdrop-blur-md p-8 rounded-3xl shadow-glass animate-pulse-soft flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-modern-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-modern-primary/5 to-modern-secondary/10 pb-12">
      {/* Profile Header - Glassmorphic Enhancement */}
      <div className="bg-gradient-to-r from-modern-primary to-modern-secondary relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-modern-accent/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-modern-primary/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="py-12 px-6 text-white relative z-10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center backdrop-blur-sm">
            <div className="w-24 h-24 rounded-full bg-glass-300 backdrop-blur-md flex items-center justify-center mb-4 md:mb-0 md:mr-6 shadow-glass border border-white/20 animate-fade-in">
              <User size={40} className="text-white" />
            </div>
            <div className="flex-1 animate-slide-up">
              <h1 className="text-3xl font-bold mb-1">{userProfile?.name}</h1>
              <p className="text-white/90 mb-2">{userProfile?.email}</p>
              <p className="text-white/80 text-sm">
                Member since {userProfile?.joinDate} • {userProfile?.crochetSkill} Crocheter
              </p>
            </div>
            <button 
              onClick={handleLogout}
              className="mt-4 md:mt-0 flex items-center text-white bg-glass-200 hover:bg-glass-300 px-5 py-2.5 rounded-xl transition-all duration-300 shadow-glass-sm border border-white/10 backdrop-blur-sm"
            >
              <LogOut size={18} className="mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        {/* Navigation Tabs - Glassmorphic Enhancement */}
        <div className="flex backdrop-blur-sm bg-glass-200 rounded-2xl mb-8 p-1 shadow-glass border border-white/20 overflow-hidden">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 px-6 py-3 font-medium flex items-center justify-center rounded-xl transition-all duration-300 ${
              activeTab === 'orders' 
                ? 'bg-modern-primary text-white shadow-md' 
                : 'text-modern-dark/70 hover:bg-glass-300'
            }`}
          >
            <ShoppingBag size={18} className="mr-2" />
            My Orders
          </button>
          <button
            onClick={() => setActiveTab('offers')}
            className={`flex-1 px-6 py-3 font-medium flex items-center justify-center rounded-xl transition-all duration-300 ${
              activeTab === 'offers' 
                ? 'bg-modern-primary text-white shadow-md' 
                : 'text-modern-dark/70 hover:bg-glass-300'
            }`}
          >
            <Gift size={18} className="mr-2" />
            My Offers
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 px-6 py-3 font-medium flex items-center justify-center rounded-xl transition-all duration-300 ${
              activeTab === 'profile' 
                ? 'bg-modern-primary text-white shadow-md' 
                : 'text-modern-dark/70 hover:bg-glass-300'
            }`}
          >
            <User size={18} className="mr-2" />
            Profile Info
          </button>
        </div>

        {/* Tab Content - Glassmorphic Enhancement */}
        <div className="bg-glass-200 backdrop-blur-md rounded-3xl shadow-glass border border-white/20 overflow-hidden animate-fade-in">
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-modern-dark mb-8 flex items-center">
                <ShoppingBag className="mr-3 text-modern-primary" /> Order History
              </h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-12 bg-glass-100 rounded-2xl backdrop-blur-sm">
                  <p className="text-modern-dark/70 mb-4">You haven't placed any orders yet</p>
                  <button 
                    onClick={() => navigate('/products')}
                    className="px-8 py-3 bg-modern-primary text-white rounded-xl hover:bg-modern-primary/90 transition-all duration-300 shadow-md"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div 
                      key={order.id} 
                      className="border border-white/20 rounded-2xl p-6 hover:shadow-glass transition-all duration-300 bg-glass-100 backdrop-blur-sm group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-modern-dark">{order.id}</h3>
                          <p className="text-modern-dark/60 text-sm">{order.date}</p>
                        </div>
                        <div className={`px-4 py-1.5 rounded-full text-sm font-medium shadow-glass-sm ${
                          order.status === 'Delivered' ? 'bg-green-100/70 backdrop-blur-sm text-green-800 border border-green-200/50' :
                          order.status === 'Shipped' ? 'bg-blue-100/70 backdrop-blur-sm text-blue-800 border border-blue-200/50' :
                          'bg-yellow-100/70 backdrop-blur-sm text-yellow-800 border border-yellow-200/50'
                        }`}>
                          {order.status}
                        </div>
                      </div>
                      
                      <div className="space-y-5 mb-5">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center bg-glass-100 p-3 rounded-xl backdrop-blur-sm group-hover:bg-glass-200 transition-all duration-300">
                            <div className="w-16 h-16 rounded-xl mr-4 overflow-hidden border border-white/30 shadow-glass-sm">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://placehold.co/600x400';
                                }}
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-modern-dark">{item.name}</h4>
                              <p className="text-modern-dark/60 text-sm">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-modern-primary font-medium">${item.price.toFixed(2)}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-white/10">
                        <button className="text-modern-primary hover:text-modern-secondary text-sm font-medium transition-colors duration-300">
                          View Details
                        </button>
                        <div className="text-right">
                          <p className="text-sm text-modern-dark/60">Total</p>
                          <p className="font-bold text-lg text-modern-dark">${order.total.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Offers Tab */}
          {activeTab === 'offers' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-modern-dark mb-8 flex items-center">
                <Gift className="mr-3 text-modern-primary" /> My Special Offers
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.map((offer) => (
                  <div 
                    key={offer.id} 
                    className="border border-white/20 rounded-2xl p-6 bg-glass-200 backdrop-blur-md hover:shadow-glass transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Background decorative elements */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-modern-accent/10 rounded-full blur-xl"></div>
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-modern-primary/10 rounded-full blur-xl"></div>
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-lg text-modern-dark">{offer.title}</h3>
                        <span className="bg-modern-primary text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md">
                          {offer.discount}
                        </span>
                      </div>
                      <p className="text-modern-dark/70 mb-4">{offer.description}</p>
                      
                      <div className="bg-glass-100 p-4 rounded-xl border border-white/20 mb-4 shadow-glass-sm backdrop-blur-sm">
                        <p className="text-sm text-modern-dark/60 mb-1">Use code:</p>
                        <p className="font-mono font-bold text-modern-primary text-lg tracking-wider">{offer.code}</p>
                      </div>
                      
                      <p className="text-sm text-modern-dark/60">
                        <span className="font-medium">Valid until:</span> {offer.validUntil}
                      </p>
                      
                      <button 
                        onClick={() => navigate('/products')}
                        className="mt-5 w-full py-3 bg-modern-primary hover:bg-modern-primary/90 text-white rounded-xl transition-all duration-300 shadow-md group-hover:shadow-lg"
                      >
                        Shop Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-modern-dark mb-8 flex items-center">
                <User className="mr-3 text-modern-primary" /> Profile Information
              </h2>
              
              <div className="max-w-2xl space-y-6">
                <div className="bg-glass-200 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-glass-sm relative overflow-hidden">
                  {/* Background decorative element */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-modern-primary/10 rounded-full blur-xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="font-bold text-lg text-modern-dark">Personal Details</h3>
                      <button 
                        onClick={() => setEditMode(!editMode)}
                        className="text-modern-primary hover:text-modern-secondary flex items-center transition-colors duration-300 bg-glass-100 px-4 py-2 rounded-xl border border-white/20 shadow-glass-sm"
                      >
                        <Edit size={16} className="mr-1.5" /> Edit
                      </button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="bg-glass-100 p-4 rounded-xl border border-white/10">
                        <p className="text-sm text-modern-dark/60 mb-1">Full Name</p>
                        <p className="font-medium text-modern-dark">{userProfile?.name}</p>
                      </div>
                      <div className="bg-glass-100 p-4 rounded-xl border border-white/10">
                        <p className="text-sm text-modern-dark/60 mb-1">Email</p>
                        <p className="font-medium text-modern-dark">{userProfile?.email}</p>
                      </div>
                      <div className="bg-glass-100 p-4 rounded-xl border border-white/10">
                        <p className="text-sm text-modern-dark/60 mb-1">Member Since</p>
                        <p className="font-medium text-modern-dark">{userProfile?.joinDate}</p>
                      </div>
                      <div className="bg-glass-100 p-4 rounded-xl border border-white/10">
                        <p className="text-sm text-modern-dark/60 mb-1">Crochet Skill Level</p>
                        <p className="font-medium text-modern-dark">{userProfile?.crochetSkill}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-glass-200 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-glass-sm relative overflow-hidden">
                  {/* Background decorative element */}
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-modern-accent/10 rounded-full blur-xl"></div>
                  
                  <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-6 text-modern-dark">Preferences</h3>
                    
                    <div className="grid md:grid-cols-2 gap-8 mb-6">
                      <div className="bg-glass-100 p-4 rounded-xl border border-white/10">
                        <p className="text-sm text-modern-dark/60 mb-1">Favorite Yarn Type</p>
                        <p className="font-medium text-modern-dark">{userProfile?.favoriteYarn}</p>
                      </div>
                      <div className="bg-glass-100 p-4 rounded-xl border border-white/10">
                        <p className="text-sm text-modern-dark/60 mb-1">Newsletter Subscription</p>
                        <p className="font-medium text-modern-dark">Subscribed</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => alert('Update preferences functionality would go here')}
                      className="px-8 py-3 bg-modern-primary hover:bg-modern-primary/90 text-white rounded-xl transition-all duration-300 shadow-md"
                    >
                      Update Preferences
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;