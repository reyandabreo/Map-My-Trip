'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaPlane, 
  FaTrash 
} from 'react-icons/fa';

export default function ViewExistingPlan() {
  const router = useRouter();
  const [savedItineraries, setSavedItineraries] = useState([]);

  useEffect(() => {
    // Load itineraries from local storage when component mounts
    const storedItineraries = JSON.parse(localStorage.getItem('savedItineraries') || '[]');
    setSavedItineraries(storedItineraries);
  }, []);

  const handleViewItinerary = (itinerary) => {
    // Navigate to itinerary page with the selected itinerary
    const encodedItinerary = encodeURIComponent(JSON.stringify(itinerary.itinerary));
    const travelStyle = itinerary.travelStyle || 'balanced';
    const budget = itinerary.budget || 'medium';
    router.push(`/itinerary?itinerary=${encodedItinerary}&budget=${budget}&travelStyle=${travelStyle}`);
  };

  const handleDeleteItinerary = (idToDelete) => {
    // Remove itinerary from local storage
    const updatedItineraries = savedItineraries.filter(
      itinerary => itinerary.id !== idToDelete
    );
    
    // Update local storage and state
    localStorage.setItem('savedItineraries', JSON.stringify(updatedItineraries));
    setSavedItineraries(updatedItineraries);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 
    py-12 px-4 sm:px-6 lg:px-8 
    bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] 
    bg-opacity-50
    relative
    overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 relative"
        >
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-8 text-center">
            Your Saved Trips
          </h1>

          {savedItineraries.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-xl mb-4">No saved trips yet</p>
              <button 
                onClick={() => router.push('/navitems/Trips/CreateWithAi')}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Create Your First Trip
        </button>
            </div>
          ) : (
            <div className="space-y-6">
              {savedItineraries.map((itinerary) => (
                <motion.div
                  key={itinerary.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-200 relative"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-blue-500" />
                        {itinerary.destination}
                      </h2>
                      <div className="flex items-center text-gray-600 mt-2 space-x-4">
                        <span className="flex items-center">
                          <FaCalendarAlt className="mr-2 text-blue-400" />
                          {new Date(itinerary.startDate).toLocaleDateString()} - 
                          {new Date(itinerary.endDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <FaMoneyBillWave className="mr-2 text-green-400" />
                          {(itinerary.budget || 'Medium').charAt(0).toUpperCase() + (itinerary.budget || 'Medium').slice(1)} Budget
                        </span>
                        <span className="flex items-center">
                          <FaPlane className="mr-2 text-indigo-400" />
                          {(itinerary.travelStyle || 'Balanced').charAt(0).toUpperCase() + (itinerary.travelStyle || 'Balanced').slice(1)} Style
                        </span>
                </div>
              </div>
                    <div className="flex space-x-2">
                  <button
                        onClick={() => handleViewItinerary(itinerary)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                        View Details
                  </button>
                  <button
                        onClick={() => handleDeleteItinerary(itinerary.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                        <FaTrash />
                  </button>
                </div>
              </div>
                  <p className="text-gray-600 italic">
                    Created on: {new Date(itinerary.createdAt).toLocaleString()}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}



/*
'use client';

import { useEffect, useState } from 'react';

export default function ViewExistingPlan() {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch('/api/find-nearest-places');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPlaces(data);
      } catch (err) {
        console.error('Error fetching places:', err.message);
        setError(err.message);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <div>
      <h1>View Existing Plans</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {places.map((place, index) => (
            <li key={index}>
              <strong>{place.name}</strong>: {place.address}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

*/

