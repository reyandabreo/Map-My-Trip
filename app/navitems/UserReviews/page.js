"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for app directory
import { Star, ArrowLeft, User, Clock, Image as ImageIcon, X, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserReviewPage = () => {
  const router = useRouter(); // Initialize the router
  const [reviews, setReviews] = useState([]); // State to hold reviews
  const [name, setName] = useState(""); // State for user name
  const [review, setReview] = useState(""); // State for review content
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && review && rating) {
      const newReview = {
        id: Date.now(),
        name,
        review,
        rating,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
      };
      setReviews([newReview, ...reviews]);
      setName("");
      setReview("");
      setRating(0);
    }
  };

  return (
    <>
   <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section with Background Image */}
      <div className="relative h-[300px] mb-12">
        <div className="absolute inset-0 bg-cover bg-center" style={{ 
          backgroundImage: "url('/images/everest.jpg')",
          backgroundBlendMode: "overlay",
        }}>
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          <button
            onClick={() => router.back()}
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              padding: '10px 20px',
              backgroundColor: 'rgba(255, 255, 255, 0)',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.3s, transform 0.3s',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Back
          </button>
          <h1 className="text-5xl font-bold text-center mb-4">
            Share Your Journey
          </h1>
          <p className="text-xl text-center max-w-2xl">
            Your stories inspire fellow travelers and help us improve
          </p>
        </div>
      </div>
      {/* Stats Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
          <div className="text-4xl font-bold text-orange-500 mb-2">--</div>
          <div className="text-gray-600">Happy Travelers</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
          <div className="text-4xl font-bold text-orange-500 mb-2">--</div>
          <div className="text-gray-600">Average Rating</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
          <div className="text-4xl font-bold text-orange-500 mb-2">--</div>
          <div className="text-gray-600">Reviews Shared</div>
        </div>
      </div>

      {/* Featured Reviews Gallery */}
      <div className="max-w-6xl mx-auto mb-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Memories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="relative group overflow-hidden rounded-xl">
              <img 
                src={`/images/travel${num}.jpg`} 
                alt={`Travel moment ${num}`}
                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-12">
        {/* Review Form Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 transform translate-x-20 -translate-y-20">
            <div className="absolute inset-0 bg-orange-100 rounded-full opacity-20"></div>
          </div>
          
          <h2 className="text-3xl font-bold mb-6 text-gray-800 relative z-10">Share Your Experience</h2>
          
          {/* Review Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="relative z-10"
          >
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Rating
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoveredRating || rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Your Review
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                rows="4"
                placeholder="Share your experience with us..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300"
            >
              Submit Review
            </button>
          </motion.form>
        </div>

        {/* Reviews List with Enhanced Styling */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Recent Reviews
          </h2>

          <div className="grid gap-6">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{review.name}</h3>
                      <div className="flex items-center space-x-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-500 text-sm flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {review.date}
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-4">{review.review}</p>

                {/* Review Images Grid */}
                {review.images?.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                    {review.images.map((image) => (
                      <div key={image.id} className="relative rounded-lg overflow-hidden">
                        <img
                          src={image.url}
                          alt="Review"
                          className="w-full h-32 object-cover hover:opacity-90 transition-opacity"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserReviewPage;
