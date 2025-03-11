"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaMapMarkerAlt, FaPlaneDeparture, FaHotel, FaUmbrellaBeach } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { motion } from "framer-motion";

const ItineraryComponent = () => {
  const searchParams = useSearchParams();
  const [itinerary, setItinerary] = useState([]);

  useEffect(() => {
    const itineraryParam = searchParams.get("itinerary");
    if (itineraryParam) {
      try {
        const decodedItinerary = decodeURIComponent(itineraryParam);
        const parsedItinerary = JSON.parse(decodedItinerary);
        setItinerary(parsedItinerary);
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
    </div>
  );
};

export default ItineraryComponent;
