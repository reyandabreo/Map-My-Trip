"use client"
import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Here you would typically make an API call to handle password reset
    // For demo purposes, we'll just show a success message
    setSuccess('Password reset link has been sent to your email');
    setEmail('');

    const response = await fetch("/api/auth/forgotpassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  
    const data = await response.json();
    if (data.message === "Password reset email sent") {
      alert("Check your email for reset instructions.");
    } else {
      alert(data.message);
    }
  };
  

  return (
    <div className="flex flex-col md:flex-row min-h-screen items-center justify-center bg-gray-100 p-2 md:p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full flex" style={{ margin: "20px", maxHeight: "90vh" }}>
        <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto">
          <div className="mb-6 text-sm text-gray-600">
            Remember your password?{" "}
            <a href="/user-auth/SignIn" className="text-orange-600 hover:underline">
              Sign In
            </a>
          </div>
          
          <h2 className="text-3xl font-bold mb-8">Forgot Password?</h2>
          <p className="text-gray-600 mb-8">
            Don&apos;t worry! It happens. Please enter the email address associated with your account.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className={`w-full p-3 border ${error ? "border-red-500" : "border-gray-300"} rounded-lg`}
                placeholder="jdoe125@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-green-500 text-sm mt-2">
                  {success}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-400 transition mb-6"
            >
              Reset Password
            </button>
          </form>
        </div>

        <div className="hidden md:flex w-1/2 rounded-r-lg items-center justify-center">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('/images/lost.jpeg')`,
              borderRadius: "0 8px 8px 0",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;