"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaHome, FaHotel, FaUtensils, FaPlane, FaHouseUser } from "react-icons/fa";
import { MdLocalActivity } from "react-icons/md";

const SearchBar = () => {
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

  return (
    <div className="flex flex-col items-center w-full p-4 space-y-4">
      {/* Category Toggle Section */}
      <div className="flex flex-wrap justify-center space-x-4 md:space-x-6 mb-4 md:mb-6">
        <div
          className={`flex items-center space-x-1 md:space-x-2 cursor-pointer transition-colors ${
            activeCategory === "all" ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-700"
          }`}
          onClick={() => handleCategoryClick("all")}
        >
          <FaHome />
          <span className="text-sm md:text-base font-semibold">Search All</span>
        </div>
        <div
          className={`flex items-center space-x-1 md:space-x-2 cursor-pointer transition-colors ${
            activeCategory === "hotels" ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-700"
          }`}
          onClick={() => handleCategoryClick("hotels")}
        >
          <FaHotel />
          <span className="text-sm md:text-base font-semibold">Hotels</span>
        </div>
        <div
          className={`flex items-center space-x-1 md:space-x-2 cursor-pointer transition-colors ${
            activeCategory === "activities" ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-700"
          }`}
          onClick={() => handleCategoryClick("activities")}
        >
          <MdLocalActivity />
          <span className="text-sm md:text-base font-semibold">Things to Do</span>
        </div>
        <div
          className={`flex items-center space-x-1 md:space-x-2 cursor-pointer transition-colors ${
            activeCategory === "restaurants" ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-700"
          }`}
          onClick={() => handleCategoryClick("restaurants")}
        >
          <FaUtensils />
          <span className="text-sm md:text-base font-semibold">Restaurants</span>
        </div>
        <div
          className={`flex items-center space-x-1 md:space-x-2 cursor-pointer transition-colors ${
            activeCategory === "flights" ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-700"
          }`}
          onClick={() => handleCategoryClick("flights")}
        >
          <FaPlane />
          <span className="text-sm md:text-base font-semibold">Flights</span>
        </div>
        <div
          className={`flex items-center space-x-1 md:space-x-2 cursor-pointer transition-colors ${
            activeCategory === "homes" ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-700"
          }`}
          onClick={() => handleCategoryClick("homes")}
        >
          <FaHouseUser />
          <span className="text-sm md:text-base font-semibold">Holiday Homes</span>
        </div>
      </div>

      {/* Input Fields */}
      {activeCategory === "all" && (
        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-6">
          <div className="relative">
            <label className="text-xs md:text-sm text-gray-500 mb-1">Budget</label>
            <input
              type="number"
              placeholder="Enter Budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-2 py-2 md:px-4 md:py-2 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none transition-shadow"
              min="0"
            />
          </div>

          <div className="relative">
            <label className="text-xs md:text-sm text-gray-500 mb-1">No. of People</label>
            <input
              type="number"
              placeholder="Number of People"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className="w-full px-2 py-2 md:px-4 md:py-2 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none transition-shadow"
              min="1"
            />
          </div>

          <div className="relative">
            <label className="text-xs md:text-sm text-gray-500 mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-2 py-2 md:px-4 md:py-2 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none transition-shadow"
            />
          </div>

          <div className="relative">
            <label className="text-xs md:text-sm text-gray-500 mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-2 py-2 md:px-4 md:py-2 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none transition-shadow"
              min={startDate}
            />
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="flex items-center max-w-xl relative md:w-3/4 px-4 sm:px-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Places to go, things to do, hotels..."
          value={inputValue}
          onChange={handleInputChange}
          className="flex-grow px-4 py-3 sm:px-2 md:px-6 bg-gray-100 border border-gray-300 rounded-l-full text-gray-800 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
        />
        <button className="bg-orange-500 text-white px-4 py-3 sm:px-2 md:px-6 rounded-r-full hover:bg-orange-600 transition-all">
          Search
        </button>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <ul className="absolute top-12 left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
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
