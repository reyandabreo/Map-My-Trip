"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for app directory

const UserReviewPage = () => {
  const router = useRouter(); // Initialize the router
  const [reviews, setReviews] = useState([]); // State to hold reviews
  const [name, setName] = useState(""); // State for user name
  const [review, setReview] = useState(""); // State for review content

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && review) {
      const newReview = { id: Date.now(), name, review };
      setReviews([...reviews, newReview]); // Add the new review to the existing reviews
      setName(""); // Reset name input
      setReview(""); // Reset review input
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-6 px-8"
      style={{ backgroundImage: "url('/images/seychelles.jpg')" }} // Add your background image path here
    >
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 flex items-center text-white mb-4 hover:text-orange-900 z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12H3m0 0l6-6m-6 6l6 6"
          />
        </svg>
        Back
      </button>

      <h1 className="text-4xl font-bold text-center mb-8 text-orange-600">
        User Reviews
      </h1>

      {/* Review Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white bg-opacity-30 shadow-lg rounded-lg p-6 mb-8 border border-gray-200 backdrop-filter backdrop-blur-sm"
      >
        <h2 className="text-2xl font-semibold mb-4 text-orange-600">Leave a Review</h2>
        <div className="mb-4">
          <label className="block text-gray-800 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-900"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-800 mb-2" htmlFor="review">
            Review
          </label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-900"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition duration-200"
        >
          Submit Review
        </button>
      </form>

      {/* Review List */}
      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-orange-600">Existing Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet. Be the first to leave one!</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white bg-opacity-90 shadow-md rounded-lg p-4 mb-4 border border-gray-200 transition-transform transform hover:scale-105"
            >
              <h3 className="font-bold text-gray-800">{review.name}</h3>
              <p className="text-gray-600">{review.review}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserReviewPage;
