import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient"; // Import Supabase client

// Define the type for the component's state
interface FormState {
  email: string;
  password: string;
  error: string;
}

const LoginSignupPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true); // Toggle between login and signup
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
    error: "",
  });

  const { email, password, error } = formState;
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ ...formState, error: "" });

    try {
      if (isLogin) {
        // Login
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        alert("Logged in successfully!");
        navigate("/"); // Redirect to home page after login
      } else {
        // Signup
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert("Signup successful! Check your email for confirmation.");
        navigate("/"); // Redirect to home page after signup
      }
    } catch (error: any) {
      setFormState({ ...formState, error: error.message });
    }
  };

  // Persist login state
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        console.log("User is logged in:", session.user);
      } else {
        console.log("User is logged out");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-purple-900 mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
              className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) =>
                setFormState({ ...formState, password: e.target.value })
              }
              className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-600 underline hover:text-purple-700"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
      </motion.div>

      {/* Marketing Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? "login" : "signup"}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="hidden lg:block ml-12 w-96"
        >
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">
              {isLogin ? "Welcome Back!" : "Join Us Today!"}
            </h2>
            <p className="text-gray-600">
              {isLogin
                ? "Login to access your personalized dashboard and exclusive offers."
                : "Sign up now to enjoy seamless shopping and amazing discounts!"}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LoginSignupPage;