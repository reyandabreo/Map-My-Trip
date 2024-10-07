
"use client"
import React, { useState } from 'react';
import { FaFacebookF, FaGoogle, FaApple } from 'react-icons/fa';

function SignUp(){
    const [passwordError, setPasswordError] = useState('');

    const validatePassword = (password) => {
      const regex = /^[a-z0-9]+$/;
      if (!regex.test(password)) {
        setPasswordError('Only letters: a-z and numbers: 0-9');
      } else {
        setPasswordError('');
      }
    };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full flex">
        
        <div className="w-1/2 p-10">
          <div className="mb-6 text-sm text-gray-600">
            Have an account?{' '}
            <a href="/auth/SignIn" className="text-orange-600 hover:underline">
              Sign In
            </a>
          </div>
          <h2 className="text-3xl font-bold mb-8">Sign Up</h2>
          <form>
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="John Doe"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="jdoe125@mail.com"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`w-full p-3 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                placeholder="Enter your password"
                onChange={(e) => validatePassword(e.target.value)}
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-2">
                  {passwordError}
                </p>
              )}
            </div>

            <div className="flex items-center mb-6">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I’ve read and agree with{' '}
                <a href="#" className="text-orange-600 hover:underline">
                  Terms of Service
                </a>{' '}
                and our{' '}
                <a href="#" className="text-orange-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-400 transition mb-6"
            >
              Sign Up
            </button>

            <div className="text-center text-gray-600 mb-6">Or sign up with</div>
            <div className="flex justify-center space-x-4">
              <a href="#" className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition">
                <FaFacebookF size={24} className="text-orange-600" />
              </a>
              <a href="#" className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition">
                <FaGoogle size={24} className="text-red-500" />
              </a>
              <a href="#" className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition">
                <FaApple size={24} className="text-black" />
              </a>
            </div>
          </form>
        </div>

        
        <div className="w-1/2 rounded-r-lg flex items-center justify-center">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('/images/signup_image.jpg')` }}></div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

