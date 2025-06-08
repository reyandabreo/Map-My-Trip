"use client";
import React, { useState, useRef } from "react";
import { FaHome, FaHotel, FaUtensils, FaPlane, FaHouseUser } from "react-icons/fa";
import { MdLocalActivity } from "react-icons/md";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [budget, setBudget] = useState("");
  const [people, setPeople] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const inputRef = useRef(null);

  const fetchSuggestions = (query) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const API_KEY = "AlzaSyIalcONhypW28MsJ2b6OGhMVBGvschtgJe";
    const apiUrl = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${query}&components=country:us|country:pr&language=en&key=${API_KEY}`;

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "OK") {
          setSuggestions(result.predictions);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length > 2) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.description);
    setSuggestions([]);
  };

  const handleSubmit = async () => {
    const formData = {
      budget,
      people,
      startDate,
      endDate,
      place: inputValue,
    };
  
    try {
      // Send the form data to the backend API
      const response = await fetch("/api/auto-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data); // Debugging log
  
        // Ensure itinerary is a string
        const itinerary = typeof data.itinerary === "string" ? data.itinerary : JSON.stringify(data.itinerary);
  
        // Redirect to the itinerary page with the generated itinerary
        router.push(`/itinerary?itinerary=${encodeURIComponent(itinerary)}`);
      } else {
        console.error("Error generating itinerary");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-4 space-y-4">
      {/* Category Toggle Section */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-4 md:mb-6">
        {[
          { label: "Search All", icon: <FaHome />, category: "all" },
          { label: "Hotels", icon: <FaHotel />, category: "hotels" },
          { label: "Things to Do", icon: <MdLocalActivity />, category: "activities" },
          { label: "Restaurants", icon: <FaUtensils />, category: "restaurants" },
          { label: "Flights", icon: <FaPlane />, category: "flights" },
          { label: "Holiday Homes", icon: <FaHouseUser />, category: "homes" },
        ].map(({ label, icon, category }) => (
          <div
            key={category}
            className={`flex items-center px-2 py-1 sm:px-3 sm:py-2 rounded-md cursor-pointer transition-colors ${
              activeCategory === category
                ? "border-b-2 border-orange-500 text-orange-500"
                : "text-gray-700"
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            <div className="text-lg sm:text-xl mr-1">{icon}</div>
            <span className="text-sm sm:text-base font-semibold">{label}</span>
          </div>
        ))}
      </div>

      {/* Input Fields */}
      {activeCategory === "all" && (
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {/* Budget */}
          <div className="flex flex-col">
            <label className="text-xs sm:text-sm text-gray-500 mb-1">Budget</label>
            <input
              type="number"
              placeholder="Enter Budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none transition-all text-sm sm:text-base"
              min="0"
            />
          </div>

          {/* No. of People */}
          <div className="flex flex-col">
            <label className="text-xs sm:text-sm text-gray-500 mb-1">No. of People</label>
            <input
              type="number"
              placeholder="Number of People"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none transition-all text-sm sm:text-base"
              min="1"
            />
          </div>

          {/* Start Date */}
          <div className="flex flex-col">
            <label className="text-xs sm:text-sm text-gray-500 mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none transition-all text-sm sm:text-base"
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col">
            <label className="text-xs sm:text-sm text-gray-500 mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none transition-all text-sm sm:text-base"
              min={startDate}
            />
          </div>
        </div>


      )}

      {/* Search Bar */}
      <div className="flex items-center w-full max-w-3xl relative px-2 sm:px-4">
        <input
          ref={inputRef}
          type="text"
          placeholder="Places to go, things to do, hotels..."
          value={inputValue}
          onChange={handleInputChange}
          className="flex-grow px-3 py-2 sm:py-3 sm:px-4 bg-gray-100 border border-gray-300 rounded-l-full text-gray-800 focus:ring-2 focus:ring-orange-500 outline-none text-sm sm:text-base"
        />
        <button
          className="bg-orange-500 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-r-full hover:bg-orange-600 transition-all text-sm sm:text-base"
          onClick={handleSubmit}
        >
          Search
        </button>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <ul className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto text-sm sm:text-base">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                {suggestion.description}
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
};

export default SearchBar;