"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaMapMarkerAlt, FaPlaneDeparture, FaHotel, FaUmbrellaBeach } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { motion } from "framer-motion";

const ItineraryComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [itinerary, setItinerary] = useState([]);
  const [editingState, setEditingState] = useState({
    isEditing: false,
    dayIndex: null,
    activityIndex: null,
  });
  const [editForm, setEditForm] = useState({
    time: "",
    description: "",
    type: "location" // Default type
  });
  const [completedActivities, setCompletedActivities] = useState({});
  const [currentPosition, setCurrentPosition] = useState({ day: 0, activity: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [allCompleted, setAllCompleted] = useState(false);
  const [currentView, setCurrentView] = useState("journey"); // "journey" or "map"
  const [theme, setTheme] = useState("adventure"); // "adventure", "beach", "urban"
  const [memories, setMemories] = useState({}); // For storing photos or notes
  const personRef = useRef(null);
  const timelineRef = useRef(null);

  // Activity types with corresponding icons
  const activityIcons = {
    location: <MdLocationOn className="text-xl" />,
    food: <IoMdRestaurant className="text-xl" />,
    hotel: <IoMdBed className="text-xl" />,
    attraction: <FaCamera className="text-xl" />,
    hiking: <MdHiking className="text-xl" />,
    beach: <MdBeachAccess className="text-xl" />,
    city: <MdOutlineLocationCity className="text-xl" />,
    flight: <IoMdAirplane className="text-xl" />
  };

  // Theme styles
  const themeStyles = {
    adventure: {
      primaryColor: "from-green-500 to-emerald-700",
      secondaryColor: "bg-amber-500",
      accentColor: "bg-orange-400",
      textColor: "text-emerald-800",
      startColor: "from-green-500 to-green-700",
      finishColor: "from-amber-500 to-amber-700"
    },
    beach: {
      primaryColor: "from-blue-400 to-cyan-600",
      secondaryColor: "bg-yellow-400",
      accentColor: "bg-orange-300",
      textColor: "text-cyan-800",
      startColor: "from-blue-400 to-blue-600",
      finishColor: "from-orange-400 to-orange-600"
    },
    urban: {
      primaryColor: "from-indigo-500 to-purple-700",
      secondaryColor: "bg-slate-600",
      accentColor: "bg-pink-400",
      textColor: "text-indigo-800",
      startColor: "from-slate-600 to-slate-800",
      finishColor: "from-purple-500 to-purple-700"
    }
  };

  const currentTheme = themeStyles[theme];

  useEffect(() => {
    const itineraryParam = searchParams.get("itinerary");
    if (itineraryParam) {
      try {
        const decodedItinerary = decodeURIComponent(itineraryParam);
        const parsedItinerary = JSON.parse(decodedItinerary);
        
        // Add activity types if not already present
        const enhancedItinerary = parsedItinerary.map(day => ({
          ...day,
          activities: day.activities.map(activity => ({
            ...activity,
            type: activity.type || getRandomActivityType(),
            notes: activity.notes || "",
          }))
        }));
        
        setItinerary(enhancedItinerary);
        
        // Initialize completed activities tracking
        const initialCompleted = {};
        enhancedItinerary.forEach((day, dayIndex) => {
          day.activities.forEach((_, actIndex) => {
            initialCompleted[`${dayIndex}-${actIndex}`] = false;
          });
        });
        setCompletedActivities(initialCompleted);
      } catch (error) {
        console.error("Error parsing itinerary JSON:", error);
      }
    }
  }, [searchParams]);

  const handleDone = (dayIndex, actIndex) => {
    setItinerary((prevItinerary) => {
      const updatedItinerary = [...prevItinerary];
      updatedItinerary[dayIndex].activities[actIndex].done = true;
      return updatedItinerary;
    });
  };

  const handleCancel = (dayIndex, actIndex) => {
    setItinerary((prevItinerary) => {
      const updatedItinerary = [...prevItinerary];
      updatedItinerary[dayIndex].activities.splice(actIndex, 1);
      return updatedItinerary;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">Your Travel Itinerary</h1>

        {itinerary.length > 0 ? (
          <div className="flex flex-col items-center space-y-8">
            {itinerary.map((day, dayIndex) => (
              <div key={dayIndex} className="w-full">
                <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center bg-blue-200 py-2 rounded-lg flex items-center justify-center space-x-2">
                  <FaPlaneDeparture className="text-blue-500" /> <span>{day.day}</span>
                </h2>
                <div className="relative flex flex-col items-center space-y-6">
                  {day.activities.map((activity, actIndex) => (
                    <motion.div
                      key={actIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center space-x-4 w-full"
                    >
                      <div className="relative flex flex-col items-center">
                        {actIndex === 0 && <FaMapMarkerAlt className="text-red-500 text-2xl mb-2" />}
                        <motion.div
                          className={`w-12 h-12 flex items-center justify-center text-white font-bold rounded-full shadow-md transition-all duration-300 ${activity.done ? 'bg-green-500' : 'bg-blue-500'}`}
                        >
                          {actIndex + 1}
                        </motion.div>
                        {actIndex < day.activities.length - 1 && (
                          <motion.div
                            className="w-1 bg-gray-300"
                            animate={{ height: activity.done ? 0 : 64 }}
                            transition={{ duration: 0.5 }}
                          ></motion.div>
                        )}
                      </div>
                      <div className="p-4 bg-white shadow-md rounded-lg w-full text-center border border-blue-400 flex flex-col items-center">
                        <p className="text-sm text-gray-600">{activity.time}</p>
                        <p className="text-lg font-medium text-gray-900 mt-2 flex items-center space-x-2">
                          {activity.type === "stay" && <FaHotel className="text-blue-500" />}
                          {activity.type === "sightseeing" && <FaUmbrellaBeach className="text-yellow-500" />}
                          <span>{activity.description}</span>
                        </p>
                        <div className="flex justify-center mt-3 space-x-4">
                          <button
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                            onClick={() => handleDone(dayIndex, actIndex)}
                          >
                            Done
                          </button>
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            onClick={() => handleCancel(dayIndex, actIndex)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <IoMdPerson className="text-blue-500 text-3xl mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No itinerary found.</p>
        )}
      </div>
      
      {/* Add these styles to your global CSS or style tag */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 2.5s infinite;
        }
        
        .shadow-text {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .moving-animation {
          animation: moveAnimation 1s ease-in-out;
        }
        
        .jump-animation {
          animation: jumpAnimation 0.5s ease-in-out;
        }
        
        @keyframes moveAnimation {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.2); }
          100% { transform: translateY(0) scale(1); }
        }
        
        @keyframes jumpAnimation {
          0% { transform: scale(1); }
          50% { transform: scale(1.5); }
          100% { transform: scale(1); }
        }
        
        @keyframes fall {
          0% { transform: translateY(0) rotate(0); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ItineraryComponent;