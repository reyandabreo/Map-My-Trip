import Link from 'next/link';
import { MapPin, BookOpen } from 'lucide-react'; // Icons for NewSpots and TravelStories

const Explore = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75"></div>
        <img 
          src="/images/explore.jpg" 
          alt="Explore Destinations" 
          className="w-full h-96 object-cover" 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Start Your Journey
          </h1>
          <p className="text-lg text-white max-w-2xl">
            Discover new destinations and read inspiring travel stories. Your next adventure awaits!
          </p>
        </div>
      </div>

      {/* Explore Options */}
      <div className="py-12 px-8 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          Choose from the options below
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
          Explore popular destinations or get inspired by travel stories shared by fellow adventurers.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* New Spots Card */}
          <Link href="/navitems/Explore/NewSpots">
            <div className="bg-white shadow-md hover:shadow-lg transition transform hover:scale-105 rounded-lg p-8 flex flex-col items-center text-center">
              <MapPin className="text-blue-500 w-16 h-16 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">New Spots</h3>
              <p className="text-gray-600 mb-4">
                Discover new popular destinations around the world.
              </p>
              <span className="text-blue-500 underline font-semibold">
                Explore Now
              </span>
            </div>
          </Link>

          {/* Travel Stories Card */}
          <Link href="/navitems/Explore/TravellStories">
            <div className="bg-white shadow-md hover:shadow-lg transition transform hover:scale-105 rounded-lg p-8 flex flex-col items-center text-center">
              <BookOpen className="text-green-500 w-16 h-16 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Travel Stories</h3>
              <p className="text-gray-600 mb-4">
                Share your travel experiences and inspire others.
              </p>
              <span className="text-green-500 underline font-semibold">
                Read Stories
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-12 bg-gradient-to-r from-teal-400 to-blue-500 text-white text-center">
        <h2 className="text-4xl font-semibold mb-6">
          Ready for your next adventure?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Discover the best spots and share your travel stories to help others create unforgettable memories.
        </p>
        <div>
          <a  href="/navitems/Explore/NewSpots" className="inline-block px-8 py-4 bg-white text-teal-500 rounded-lg font-semibold hover:bg-gray-100 transition">
            Explore Destinations
          </a>
        </div>
      </div>
    </div>
  );
};

export default Explore;

