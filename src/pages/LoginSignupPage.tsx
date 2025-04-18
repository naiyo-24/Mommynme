import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

interface FormState {
  name: string; // Added name field
  email: string;
  password: string;
  error: string;
  loading: boolean;
}

const LoginSignupPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
  });

  const { email, password, error, loading } = formState;
  const navigate = useNavigate();

  const registerCustomer = async (customerName: string, email: string, password: string) => {
    const apiUrl = "https://frappe-client1.sirfbill.com/api/resource/Customer";
    const payload = {
      customer_name: customerName,
      customer_type: "Individual",
      email_id: email,
      custom_password: password,
    };
  
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": "token 37505715c181575:bfd8e5d121bcf82",
      },
      body: JSON.stringify(payload),
    });
  
    if (response.ok) {
      const responseData = await response.json();
      const customerData = responseData.data;
      localStorage.setItem("customerProfile", JSON.stringify(customerData));
      localStorage.setItem("isLoggedIn", "true"); // Flag user as logged in
      alert("Registration successful! Welcome, " + customerData.customer_name);
      return customerData;
    }
  
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to register customer");
  };

  const fetchCustomerDetails = async () => {
    const apiUrl = "https://frappe-client1.sirfbill.com/api/resource/Customer?fields=[%22*%22]";

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Authorization": "token 37505715c181575:bfd8e5d121bcf82",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.data; // Return the list of customers
    }

    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch customer details");
  };

  const loginCustomer = async (email: string, password: string) => {
    const customers = await fetchCustomerDetails();

    const customer = customers.find(
      (cust: any) => cust.email_id === email && cust.custom_password === password
    );

    if (customer) {
      localStorage.setItem("customerProfile", JSON.stringify(customer));
      localStorage.setItem("isLoggedIn", "true"); // Flag user as logged in
      alert("Login successful! Welcome back, " + customer.customer_name);
      return customer;
    }

    throw new Error("Invalid email or password");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ ...formState, error: "", loading: true });

    try {
      // Replace with your authentication API calls
      if (isLogin) {
        try {
          await loginCustomer(email, password); // Validate email and password
          console.log("Login attempt with:", { email, password });
          navigate("/");
        } catch (error: any) {
          setFormState({
            ...formState,
            error: error.message || "Login failed. Please try again.",
            loading: false,
          });
        }
      } else {
        try {
          await registerCustomer(formState.name, email, password); // Pass name, email, and password
          console.log("Signup attempt with:", { email, password });
          alert("Signup successful! Please check your email for confirmation.");
          navigate("/");
        } catch (error: any) {
          setFormState({
            ...formState,
            error: error.message || "Customer registration failed. Please try again.",
            loading: false,
          });
        }
      }
    } catch (error: any) {
      setFormState({ 
        ...formState, 
        error: error.message || "Authentication failed. Please try again.",
        loading: false 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-purple-100"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-800 mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-purple-600">
            {isLogin ? "Sign in to continue" : "Join our community today"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <span className="w-4 h-4 mr-2">👤</span>
              Name
            </label>
            <input
              type="text"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Your Name"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Lock className="w-4 h-4 mr-2" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm p-3 bg-red-50 rounded-lg flex items-center"
            >
              <span className="flex-1">{error}</span>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-all ${
              loading
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            } text-white shadow-md hover:shadow-lg`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Processing...
              </>
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-600 hover:text-purple-800 font-medium transition-colors"
          >
            {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? "login" : "signup"}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="hidden lg:block ml-12 w-96"
        >
          <div className="bg-white p-8 rounded-xl shadow-lg border border-purple-100">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">
              {isLogin ? "Your Crochet Journey Awaits" : "Start Your Creative Journey"}
            </h2>
            <p className="text-gray-600 mb-6">
              {isLogin
                ? "Access your personalized patterns, saved projects, and exclusive member discounts."
                : "Join our community of yarn enthusiasts and unlock special benefits!"}
            </p>
            <ul className="space-y-3">
              {(isLogin
                ? [
                    "Track your project progress",
                    "Save favorite patterns",
                    "Get exclusive discounts",
                    "Join our community events",
                  ]
                : [
                    "Personalized recommendations",
                    "Early access to new patterns",
                    "Members-only tutorials",
                    "Priority customer support",
                  ]
              ).map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LoginSignupPage;