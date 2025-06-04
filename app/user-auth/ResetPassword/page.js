"use client";
import { Suspense } from "react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Extract token from query params

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validatePassword = (password) => {
    // Password must be at least 8 characters, include an uppercase letter, a number, and a special character
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (!validatePassword(password)) {
      setError(
        'Password must be at least 8 characters long, include an uppercase letter, a number, and a special character'
      );
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!token) {
      setError('Invalid or missing token. Please use the correct reset link.');
      return;
    }

    try {
      const response = await fetch("/api/auth/resetpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Your password has been reset successfully');
        setPassword('');
        setConfirmPassword('');
      } else {
        setError(data.message || 'Failed to reset password. Please try again.');
      }
    } catch (err) {
      console.error("Error:", err);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen items-center justify-center bg-gray-100 p-2 md:p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full flex" style={{ margin: '20px', maxHeight: '90vh' }}>
        <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto">
          <div className="mb-6 text-sm text-gray-600">
            Remember your password?{' '}
            <a href="/user-auth/SignIn" className="text-orange-600 hover:underline">
              Sign In
            </a>
          </div>

          <h2 className="text-3xl font-bold mb-8">Reset Password</h2>
          <p className="text-gray-600 mb-8">
            Please enter your new password below.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                New Password
              </label>
              <input
                type="password"
                id="password"
                className={`w-full p-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className={`w-full p-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                placeholder="Re-enter your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              backgroundImage: `url('/images/prague.jpg')`,
              borderRadius: '0 8px 8px 0',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default function Page(){
  return(
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
}
