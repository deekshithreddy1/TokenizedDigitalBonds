import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Shield, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface AuthenticationProps {
  onLogin: () => void;
}

const Authentication: React.FC<AuthenticationProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  
  const { signIn, signUp, isLoading, error } = useAuthStore();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
        onLogin();
      }
    } catch (err) {
      console.error('Authentication error:', err);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0033A0] rounded-full mb-4">
            <Lock size={30} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">CantonBond Enterprise</h1>
          <p className="text-gray-600 mt-2">Secure Digital Bond Tokenization Platform</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {isSignUp ? 'Create an Account' : 'Sign in to your account'}
            </h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={16} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2.5 px-4 rounded-lg text-white font-medium transition-colors ${
                  isLoading ? 'bg-blue-400' : 'bg-[#0033A0] hover:bg-blue-900'
                }`}
              >
                {isLoading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign in'}
              </button>
              
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="w-full mt-3 text-sm text-[#0033A0] hover:underline"
              >
                {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
              </button>
              
              <div className="flex justify-between mt-4 text-sm">
                <a href="#" className="text-[#0033A0] hover:underline">Forgot password?</a>
                <a href="#" className="text-[#0033A0] hover:underline">Need help?</a>
              </div>
            </form>
          </div>
          
          <div className="bg-gray-50 px-6 py-4 flex items-center">
            <Shield size={18} className="text-gray-500 mr-2" />
            <span className="text-xs text-gray-500">
              Protected by enterprise-grade security and compliant with financial regulations
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;