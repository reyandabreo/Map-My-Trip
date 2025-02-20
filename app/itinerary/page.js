"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";

const ItineraryComponent = () => {
  const searchParams = useSearchParams();
  const [itinerary, setItinerary] = useState([]);

  useEffect(() => {
    const itineraryParam = searchParams.get("itinerary");
    console.log("Raw itinerary param:", itineraryParam);
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

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Your Itinerary
        </h1>

        {itinerary.length > 0 ? (
          <div className="flex flex-col items-center space-y-8">
            {itinerary.map((day, index) => (
              <div key={index} className="w-full">
                <h2 className="text-xl font-semibold text-blue-600 mb-4 text-center">
                  {day.day}
                </h2>
                <div className="relative flex flex-col items-center space-y-6">
                  {day.activities.map((activity, actIndex) => (
                    <div key={actIndex} className="flex items-center space-x-4 w-full">
                      <div className="relative flex flex-col items-center">
                        {actIndex === 0 && (
                          <FaMapMarkerAlt className="text-red-500 text-2xl mb-2" />
                        )}
                        <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full shadow-md">
                          {actIndex + 1}
                        </div>
                        {actIndex < day.activities.length - 1 && (
                          <div className="w-1 h-16 bg-gray-300"></div>
                        )}
                      </div>
                      <div className="p-4 bg-white shadow-md rounded-lg w-full text-center">
                        <p className="text-sm text-gray-600">{activity.time}</p>
                        <p className="text-lg font-medium text-gray-900 mt-2">
                          {activity.description}
                        </p>
                      </div>
                    </div>
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
