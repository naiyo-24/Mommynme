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
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50 pb-12">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-12 px-6 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="w-24 h-24 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-4 md:mb-0 md:mr-6">
            <User size={40} className="text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-1">{userProfile?.name}</h1>
            <p className="text-purple-100 mb-2">{userProfile?.email}</p>
            <p className="text-purple-100 text-sm">
              Member since {userProfile?.joinDate} • {userProfile?.crochetSkill} Crocheter
            </p>
          </div>
          <button 
            onClick={handleLogout}
            className="mt-4 md:mt-0 flex items-center text-white bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all"
          >
            <LogOut size={18} className="mr-2" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        {/* Navigation Tabs */}
        <div className="flex border-b border-purple-200 mb-8">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 font-medium flex items-center ${activeTab === 'orders' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600 hover:text-purple-500'}`}
          >
            <ShoppingBag size={18} className="mr-2" />
            My Orders
          </button>
          <button
            onClick={() => setActiveTab('offers')}
            className={`px-6 py-3 font-medium flex items-center ${activeTab === 'offers' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600 hover:text-purple-500'}`}
          >
            <Gift size={18} className="mr-2" />
            My Offers
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 font-medium flex items-center ${activeTab === 'profile' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600 hover:text-purple-500'}`}
          >
            <User size={18} className="mr-2" />
            Profile Info
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
                <ShoppingBag className="mr-2" /> Order History
              </h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">You haven't placed any orders yet</p>
                  <button 
                    onClick={() => navigate('/products')}
                    className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-purple-100 rounded-lg p-5 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-lg">Order #{order.id}</h3>
                          <p className="text-gray-500 text-sm">{order.date}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </div>
                      </div>
                      
                      <div className="space-y-4 mb-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-lg mr-4 overflow-hidden">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://placehold.co/600x400';
                                }}
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-purple-700 font-medium">${item.price.toFixed(2)}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-purple-100">
                        <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                          View Details
                        </button>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Total</p>
                          <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
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
            <div className="p-6">
              <h2 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
                <Gift className="mr-2" /> My Special Offers
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.map((offer) => (
                  <div key={offer.id} className="border border-purple-200 rounded-xl p-5 bg-gradient-to-br from-purple-50 to-white hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg">{offer.title}</h3>
                      <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {offer.discount}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{offer.description}</p>
                    
                    <div className="bg-white p-3 rounded-lg border border-purple-100 mb-4">
                      <p className="text-sm text-gray-500 mb-1">Use code:</p>
                      <p className="font-mono font-bold text-purple-700 text-lg">{offer.code}</p>
                    </div>
                    
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Valid until:</span> {offer.validUntil}
                    </p>
                    
                    <button 
                      onClick={() => navigate('/products')}
                      className="mt-4 w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                    >
                      Shop Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
                <User className="mr-2" /> Profile Information
              </h2>
              
              <div className="max-w-2xl">
                <div className="bg-purple-50 rounded-xl p-6 mb-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg">Personal Details</h3>
                    <button className="text-purple-600 hover:text-purple-800 flex items-center">
                      <Edit size={16} className="mr-1" /> Edit
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Full Name</p>
                      <p className="font-medium">{userProfile?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <p className="font-medium">{userProfile?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Member Since</p>
                      <p className="font-medium">{userProfile?.joinDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Crochet Skill Level</p>
                      <p className="font-medium">{userProfile?.crochetSkill}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-4">Preferences</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Favorite Yarn Type</p>
                      <p className="font-medium">{userProfile?.favoriteYarn}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Newsletter Subscription</p>
                      <p className="font-medium">Subscribed</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => alert('Update preferences functionality would go here')}
                    className="mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    Update Preferences
                  </button>
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