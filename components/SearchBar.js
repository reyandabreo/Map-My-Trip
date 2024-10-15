"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaHome, FaHotel, FaUtensils, FaPlane, FaHouseUser } from "react-icons/fa";
import { MdLocalActivity } from "react-icons/md";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState(""); // To track the input value
  const [suggestions, setSuggestions] = useState([]); // To store the autocomplete suggestions
  const [activeCategory, setActiveCategory] = useState("all"); // Track selected category
  const [budget, setBudget] = useState("");
  const [people, setPeople] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const inputRef = useRef(null);

  // Fetch autocomplete suggestions from GoMaps API
  const fetchSuggestions = (query) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const API_KEY = "AlzaSyIalcONhypW28MsJ2b6OGhMVBGvschtgJe"; // Replace with your actual API key
    const apiUrl = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${query}&components=country:us|country:pr&language=en&key=${API_KEY}`;

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "OK") {
          setSuggestions(result.predictions); // Update suggestions based on the result
        }
      })
      .catch((error) => console.log("error", error));
  };

  // Handle input change and fetch suggestions
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length > 2) {
      fetchSuggestions(value); // Fetch suggestions when input length > 2
    } else {
      setSuggestions([]); // Clear suggestions if input is too short
    }
  };

  // Handle category click
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  // Handle suggestion click (optional: to select a suggestion)
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.description);
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
      {/* Category Selection */}
      <div className="flex space-x-6 mb-6">
        <div
          className={`flex items-center space-x-2 cursor-pointer ${
            activeCategory === "all" ? "border-b-2 border-orange-500" : ""
          }`}
          onClick={() => handleCategoryClick("all")}
        >
          <FaHome />
          <span className="font-semibold">Search All</span>
        </div>
        <div
          className={`flex items-center space-x-2 cursor-pointer ${
            activeCategory === "hotels" ? "border-b-2 border-orange-500" : ""
          }`}
          onClick={() => handleCategoryClick("hotels")}
        >
          <FaHotel />
          <span className="font-semibold">Hotels</span>
        </div>
        <div
          className={`flex items-center space-x-2 cursor-pointer ${
            activeCategory === "activities" ? "border-b-2 border-orange-500" : ""
          }`}
          onClick={() => handleCategoryClick("activities")}
        >
          <MdLocalActivity />
          <span className="font-semibold">Things to Do</span>
        </div>
        <div
          className={`flex items-center space-x-2 cursor-pointer ${
            activeCategory === "restaurants" ? "border-b-2 border-orange-500" : ""
          }`}
          onClick={() => handleCategoryClick("restaurants")}
        >
          <FaUtensils />
          <span className="font-semibold">Restaurants</span>
        </div>
        <div
          className={`flex items-center space-x-2 cursor-pointer ${
            activeCategory === "flights" ? "border-b-2 border-orange-500" : ""
          }`}
          onClick={() => handleCategoryClick("flights")}
        >
          <FaPlane />
          <span className="font-semibold">Flights</span>
        </div>
        <div
          className={`flex items-center space-x-2 cursor-pointer ${
            activeCategory === "homes" ? "border-b-2 border-orange-500" : ""
          }`}
          onClick={() => handleCategoryClick("homes")}
        >
          <FaHouseUser />
          <span className="font-semibold">Holiday Homes</span>
        </div>
      </div>

      {/* Conditionally Render Inputs */}
      {activeCategory === "all" && (
        <div className="w-full max-w-4xl grid grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <label className="text-sm text-gray-500 mb-1">Budget</label>
            <input
              type="number"
              placeholder="Enter Budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none transition-shadow"
              min="0"
            />
          </div>

          <div className="relative">
            <label className="text-sm text-gray-500 mb-1">No. of People</label>
            <input
              type="number"
              placeholder="Number of People"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none transition-shadow"
              min="1"
            />
          </div>

          <div className="relative">
            <label className="text-sm text-gray-500 mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none transition-shadow"
            />
          </div>

          <div className="relative">
            <label className="text-sm text-gray-500 mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none transition-shadow"
              min={startDate} // End date must be after start date
            />
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="flex items-center w-full max-w-2xl relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Places to go, things to do, hotels..."
          value={inputValue}
          onChange={handleInputChange}
          className="flex-grow px-6 py-3 bg-gray-100 border border-gray-300 rounded-l-full text-gray-800 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
        />
        <button className="bg-orange-500 text-white px-6 py-3 rounded-r-full hover:bg-orange-600 transition-all">
          Search
        </button>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="absolute top-12 left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
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
