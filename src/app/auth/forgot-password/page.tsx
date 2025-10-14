"use client"
import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (email) {
      console.log('Reset email sent to:', email);
      alert('Password reset link has been sent to your email!');
    } else {
      alert('Please enter your email address');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-[#d92335] to-[#830f1b] rounded-full p-4">
            <Mail className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">Forgot Password?</h2>
        <p className="text-center text-gray-600 mb-8">
          No worries! Enter your email address and we&lsquo;ll send you a link to reset your password.
        </p>

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#d92335] text-white py-3 rounded-lg font-semibold cursor-pointer transform hover:scale-[1.02] transition-all shadow-lg mb-4"
        >
          Send Reset Link
        </button>

        {/* Back to Login */}
        <a
          href="/auth/login"
          className="flex items-center justify-center text-gray-600 hover:text-[#d92335] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sign In
        </a>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;