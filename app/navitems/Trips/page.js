"use client"
import Link from 'next/link';
import { ClipboardList, CalendarCheck, Bot, ArrowLeft } from 'lucide-react'; // Icons for View Existing Plan, Make My Plan, Create with AI, and Back Button
import { useRouter } from 'next/navigation'; // For the back button

const Trips = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 flex items-center text-white mb-4 hover:text-orange-900 z-50"
      >
        <ArrowLeft className="w-6 h-6 mr-2" />
        <span className="text-lg font-medium">Back</span>
      </button>

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75"></div>
        <img 
          src="/images/trip_1.jpg" 
          alt="Plan Your Trips" 
          className="w-full h-96 object-cover" 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Plan Your Next Adventure
          </h1>
          <p className="text-lg text-white max-w-2xl">
            Manage your trips and create customized plans with ease. Start planning today!
          </p>
        </div>
      </div>

      {/* Trips Options */}
      <div className="py-12 px-8 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          Choose your trip planning option
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
          Whether you&apos;re looking to view existing plans, create new ones, or let AI assist you, we have the tools you need.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* View Existing Plan Card */}
          <Link href="/navitems/Trips/ViewExistingPlan">
            <div className="bg-white shadow-md hover:shadow-lg transition transform hover:scale-105 rounded-lg p-8 flex flex-col items-center text-center">
              <ClipboardList className="text-purple-500 w-16 h-16 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">View Existing Plan</h3>
              <p className="text-gray-600 mb-4">
                Access and manage your current trip plans with ease.
              </p>
              <span className="text-purple-500 underline font-semibold">
                View Plans
              </span>
            </div>
          </Link>

          {/* Make My Plan Card */}
          <Link href="/navitems/Trips/MakeMyPlan">
            <div className="bg-white shadow-md hover:shadow-lg transition transform hover:scale-105 rounded-lg p-8 flex flex-col items-center text-center">
              <CalendarCheck className="text-blue-500 w-16 h-16 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Make My Plan</h3>
              <p className="text-gray-600 mb-4">
                Customize and build your own travel itinerary.
              </p>
              <span className="text-blue-500 underline font-semibold">
                Start Planning
              </span>
            </div>
          </Link>

          {/* Create with AI Card */}
          <Link href="/navitems/Trips/CreateWithAi">
            <div className="bg-white shadow-md hover:shadow-lg transition transform hover:scale-105 rounded-lg p-8 flex flex-col items-center text-center">
              <Bot className="text-green-500 w-16 h-16 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Create with AI</h3>
              <p className="text-gray-600 mb-4">
                Let AI generate a travel plan tailored to your preferences.
              </p>
              <span className="text-green-500 underline font-semibold">
                Create Now
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-12 bg-gradient-to-r from-teal-400 to-blue-500 text-white text-center">
        <h2 className="text-4xl font-semibold mb-6">
          Ready to plan your trip?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Explore the best tools to plan your perfect trip, whether you do it yourself or let AI help.
        </p>
        <div>
          <a href="/navitems/Trips/MakeMyPlan" className="inline-block px-8 py-4 bg-white text-teal-500 rounded-lg font-semibold hover:bg-gray-100 transition">
            Start Planning
          </a>
        </div>
      </div>
    </div>
  );
};

export default Trips;
