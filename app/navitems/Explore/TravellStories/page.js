"use client"
import { useState, useEffect } from 'react';
import { ArrowLeft, Star, MapPin, Calendar, Camera, Heart, Share2, MessageCircle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const TravelStories = () => {
  const router = useRouter();
  const [stories, setStories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStory, setSelectedStory] = useState(null);
  const [form, setForm] = useState({
    name: '',
    location: '',
    date: '',
    experience: '',
    tips: '',
    category: '',
    rating: 0,
    budget: '',
    duration: '',
    images: [],
  });

  // Sample initial stories
  const initialStories = [
    {
      id: 1,
      name: "Sarah Parker",
      location: "Bali, Indonesia",
      date: "March 2024",
      experience: "My journey through Bali was absolutely magical! From the serene rice terraces of Tegalalang to the spiritual temples of Ubud, every moment was filled with wonder. The local people were incredibly welcoming, and the food was a culinary adventure.",
      tips: "Don't miss the sunrise at Mount Batur, and always carry a sarong for temple visits. Best time to visit the rice terraces is early morning.",
      category: "beach",
      rating: 5,
      budget: "$1500",
      duration: "10 days",
      images: ["/images/bali.jpg", "/images/bali2.jpg"],
      likes: 245,
      comments: 18
    },
    // Add more sample stories...
  ];

  const categories = [
    { id: 'all', name: 'All Stories' },
    { id: 'beach', name: 'Beach Getaways' },
    { id: 'mountain', name: 'Mountain Adventures' },
    { id: 'city', name: 'City Exploration' },
    { id: 'cultural', name: 'Cultural Experiences' },
    { id: 'wildlife', name: 'Wildlife & Nature' }
  ];

  useEffect(() => {
    // Initialize with sample stories
    setStories(initialStories);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setForm({ ...form, images: [...form.images, ...imageUrls] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStory = {
      ...form,
      id: stories.length + 1,
      likes: 0,
      comments: 0,
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
    setStories([newStory, ...stories]);
    setForm({
      name: '',
      location: '',
      date: '',
      experience: '',
      tips: '',
      category: '',
      rating: 0,
      budget: '',
      duration: '',
      images: [],
    });
    setShowForm(false);
  };

  const toggleLike = (storyId) => {
    setStories(stories.map(story => 
      story.id === storyId 
        ? { ...story, likes: story.likes + 1 } 
        : story
    ));
  };

  const filteredStories = selectedCategory === 'all' 
    ? stories 
    : stories.filter(story => story.category === selectedCategory);

  const openStory = (story) => {
    setSelectedStory(story);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeStory = () => {
    setSelectedStory(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  const StoryDetailModal = ({ story }) => {
    if (!story) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={closeStory}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={closeStory}
            className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image gallery */}
          <div className="relative h-96">
            <img
              src={story.images[0]}
              alt={story.location}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{story.date}</span>
              </div>
            </div>
          </div>

          {/* Story content */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">{story.name}'s Journey</h2>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{story.location}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-orange-500 font-semibold">{story.duration}</div>
                <div className="text-gray-600">Budget: {story.budget}</div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < story.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-600">({story.rating}/5)</span>
            </div>

            {/* Main content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Experience</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {story.experience}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Travel Tips</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {story.tips}
                </p>
              </div>

              {/* Engagement section */}
              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex items-center space-x-6">
                  <button 
                    onClick={() => toggleLike(story.id)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-orange-500"
                  >
                    <Heart className={`w-6 h-6 ${story.liked ? 'fill-orange-500 text-orange-500' : ''}`} />
                    <span>{story.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-orange-500">
                    <MessageCircle className="w-6 h-6" />
                    <span>{story.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-orange-500">
                    <Share2 className="w-6 h-6" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
          <button 
            onClick={() => router.back()} 
            className="flex items-center text-white  bg-opacity-50 rounded-lg px-3 py-2 hover:text-orange-900 z-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0h12m-12 0l4-4m-4 4l4 4" />
            </svg>
            Back
          </button>
        </div>

      {/* Hero Section */}
      <div className="relative h-96">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <img 
          src="/images/place_6.jpg" 
          alt="Travel Stories" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Stories</h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Discover inspiring journeys and share your own adventures with fellow travelers
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-8 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Share Your Story
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-orange-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredStories.map((story) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => openStory(story)}
            >
              <div className="relative h-64">
                <img
                  src={story.images[0]}
                  alt={story.location}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-medium text-gray-700">
                  {story.duration}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="w-4 h-4 text-orange-500 mr-2" />
                  <span className="text-gray-600">{story.location}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{story.name}'s Journey</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{story.experience}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => toggleLike(story.id)}
                      className="flex items-center space-x-1 hover:text-orange-500"
                    >
                      <Heart className="w-4 h-4" />
                      <span>{story.likes}</span>
                    </button>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{story.comments}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{story.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Story Detail Modal */}
      <AnimatePresence>
        {selectedStory && <StoryDetailModal story={selectedStory} />}
      </AnimatePresence>

      {/* Share Story Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Share Your Travel Story</h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleInputChange}
                    placeholder="Where did you travel?"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              {/* Trip Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Travel Date</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={form.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 7 days"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Budget</label>
                  <input
                    type="text"
                    name="budget"
                    value={form.budget}
                    onChange={handleInputChange}
                    placeholder="e.g., $1000"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              {/* Category Selection */}
              <div>
                <label className="block text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="beach">Beach Getaway</option>
                  <option value="mountain">Mountain Adventure</option>
                  <option value="city">City Exploration</option>
                  <option value="cultural">Cultural Experience</option>
                  <option value="wildlife">Wildlife & Nature</option>
                </select>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-gray-700 mb-2">Share Your Experience</label>
                <textarea
                  name="experience"
                  value={form.experience}
                  onChange={handleInputChange}
                  placeholder="Tell us about your journey..."
                  className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              {/* Travel Tips */}
              <div>
                <label className="block text-gray-700 mb-2">Travel Tips</label>
                <textarea
                  name="tips"
                  value={form.tips}
                  onChange={handleInputChange}
                  placeholder="Share your recommendations and tips..."
                  className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-gray-700 mb-2">Rate Your Experience</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm({ ...form, rating: star })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= form.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-gray-700 mb-2">Upload Images</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full"
                  />
                  {form.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      {form.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-24 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newImages = form.images.filter((_, i) => i !== index);
                              setForm({ ...form, images: newImages });
                            }}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Share Story
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TravelStories; 