"use client";
import React, { useState } from "react";
import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";
import { useRouter } from "next/navigation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isTermsChecked) {
      alert("Please agree to the Terms of Service and Privacy Policy to proceed.");
      return;
    }

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      router.push("/");
      console.log("Login successful:", data);
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full flex" style={{ margin: "20px", maxHeight: "90vh" }}>
        <div className="w-1/2 p-10 overflow-y-auto">
          <div className="mb-6 text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/user-auth/SignUp" className="text-orange-600 hover:underline">
              Sign Up
            </a>
          </div>
          <h2 className="text-3xl font-bold mb-8">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="jdoe125@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`w-full p-3 border ${error ? "border-red-500" : "border-gray-300"} rounded-lg`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">
                  {error}
                </p>
              )}
            </div>

            <div className="mb-6 text-sm text-gray-600">
            <a href="/user-auth/ForgotPassword" className="text-orange-600 hover:underline">
              forgot password?
            </a>
          </div>

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="terms"
                className="mr-2"
                checked={isTermsChecked}
                onChange={(e) => setIsTermsChecked(e.target.checked)}
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I’ve read and agree with{" "}
                <a href="#" className="text-orange-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and our{" "}
                <a href="#" className="text-orange-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-400 transition mb-6"
            >
              Sign In
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
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('/images/signin_image.jpg')`,
              borderRadius: "0 8px 8px 0",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
