'use client';

// import { DistanceMatrixService } from '@react-google-maps/api';
import React from 'react';
import { useState } from 'react';

export default function ViewExistingPlan() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);
  const [visitedPlaces, setVisitedPlaces] = useState(new Set()); // Track visited places
  const [activeStep, setActiveStep] = useState(1); // Track the active step

  const findNearestPlaces = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/find-nearest-places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude, longitude, placeName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPlaces(data);
      setActiveStep(1); // Reset to first step when new data is fetched
    } catch (err) {
      console.error('Error fetching nearest places:', err.message);
      setError(err.message);
    }
  };

  const handleVisit = (placeName) => {
    setVisitedPlaces((prevVisited) => new Set(prevVisited).add(placeName));
  };

  const handleRemove = (placeName) => {
    setPlaces((prevPlaces) => prevPlaces.filter((place) => place.name !== placeName));
    setVisitedPlaces((prevVisited) => {
      const newVisited = new Set(prevVisited);
      newVisited.delete(placeName);
      return newVisited;
    });
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white space-y-8">
      <h1 className="text-3xl font-semibold text-gray-800">Find Nearest Places</h1>

      <form className="w-full max-w-lg space-y-6" onSubmit={findNearestPlaces}>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Place Name</label>
          <input
            type="text"
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter place name (e.g., Bandra)"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Latitude</label>
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Latitude"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Longitude</label>
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
            placeholder="Longitude"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 focus:ring-4 focus:ring-orange-300"
        >
          Find Nearest Places
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {/* Progress Tracker and Places List */}
      <div className="grid grid-cols-[auto,1fr] gap-x-4 w-full max-w-lg mt-12">
        {places.map((place, index) => {
          const isVisited = visitedPlaces.has(place.name);
          return (
            <React.Fragment key={place.name}>
              {/* Progress Tracker Circle and Line */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full border-2 ${isVisited ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'}`}
                >
                  {isVisited && (
                    <svg className="w-4 h-4 text-white mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                {/* Connecting line */}
                {index !== places.length - 1 && <div className="w-1 bg-gray-300 flex-grow"></div>}
              </div>

              {/* Place Card */}
              <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="text-sm font-medium text-gray-800">{place.name}</div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleVisit(place.name)}
                    className="w-24 py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 focus:ring-4 focus:ring-orange-300"
                  >
                    {isVisited ? 'Visited' : 'Mark as Visited'}
                  </button>
                  <button
                    onClick={() => handleRemove(place.name)}
                    className="w-24 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:ring-4 focus:ring-red-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </React.Fragment>
          );
        })}
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
