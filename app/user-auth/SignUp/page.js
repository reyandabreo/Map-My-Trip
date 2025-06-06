"use client";
import React, { useState } from "react";
import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";
import { useRouter } from "next/navigation"; // To handle redirection

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isTermsChecked, setIsTermsChecked] = useState(false); // State to track checkbox
  const router = useRouter(); // Initialize router for redirecting

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=\[\]{}|;:'",.<>?/\\])[A-Za-z\d!@#$%^&*()_\-+=\[\]{}|;:'",.<>?/\\]{8,}$/;
    if (!regex.test(password)) {
      setPasswordError("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!name || !email || !password) {
      alert("Please fill out all fields");
      return;
    }

    if (!isTermsChecked) {
      alert("Please agree to the Terms of Service and Privacy Policy to proceed.");
      return;
    }

    if (passwordError) {
      alert("Please fix the errors in the form.");
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }), 
    });

    const data = await res.json();
    if (data.message === "User created successfully") {
      // Redirect to login page after successful signup
      router.push("/user-auth/SignIn");
    } else {
      alert(data.message); // Handle any error message from the server
    }
  };

  return (
    <>
     {/* Back Button */}
     <button
            onClick={() => router.back()}
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              padding: '10px 20px',
              backgroundColor: 'rgba(224, 110, 3, 0.9)',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.3s, transform 0.3s',
              zIndex: 10, // Ensure the button is on top
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(212, 133, 14, 0.81)';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(224, 110, 3, 0.9)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Back
          </button>
    <div className="flex flex-col md:flex-row min-h-screen items-center justify-center bg-gray-100 p-2 md:p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full flex" style={{ margin: "20px", maxHeight: "90vh" }}>
        <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto">
          <div className="mb-6 text-sm text-gray-600">
            Have an account?{" "}
            <a href="/user-auth/SignIn" className="text-orange-600 hover:underline">
              Sign In
            </a>
          </div>
          <h2 className="text-3xl font-bold mb-8">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            {/* Attach handleSubmit to form */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="John Doe"
                value={name} // Bind input to state
                onChange={(e) => setName(e.target.value)} // Update state on change
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
                value={email} // Bind input to state
                onChange={(e) => setEmail(e.target.value)} // Update state on change
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`w-full p-3 border ${
                  passwordError ? "border-red-500" : "border-gray-300"
                } rounded-lg`}
                placeholder="Enter your password"
                value={password} // Bind input to state
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }} // Update state on change
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-2">
                  {passwordError}
                </p>
              )}
            </div>

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="terms"
                className="mr-2"
                checked={isTermsChecked} // Bind to state
                onChange={(e) => setIsTermsChecked(e.target.checked)} // Update state on change
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

        <div className="hidden md:flex w-1/2 rounded-r-lg flex items-center justify-center">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('/images/signup_image.jpg')`,
              borderRadius: "0 8px 8px 0",
            }}
          ></div>
        </div>
      </div>
    </div>
    </>
  );
}

export default SignUp;
