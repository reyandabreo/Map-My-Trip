// components/SearchBar.js
"use client";
import React, { useState } from "react";
import { FaHome, FaHotel, FaUtensils, FaPlane, FaHouseUser } from "react-icons/fa";
import { MdLocalActivity } from "react-icons/md";

const SearchBar = () => {
  const [budget, setBudget] = useState("");
  const [people, setPeople] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="flex flex-col items-center w-full p-4">
      {/* Category Selection */}
      <div className="flex space-x-6 mb-6">
        <div className="flex items-center space-x-2 cursor-pointer">
          <FaHome />
          <span className="font-semibold">Search All</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <FaHotel />
          <span className="font-semibold">Hotels</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <MdLocalActivity />
          <span className="font-semibold">Things to Do</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <FaUtensils />
          <span className="font-semibold">Restaurants</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <FaPlane />
          <span className="font-semibold">Flights</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <FaHouseUser />
          <span className="font-semibold">Holiday Homes</span>
        </div>
      </div>

      {/* Additional Inputs */}
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

      {/* Search Bar */}
      <div className="flex items-center w-full max-w-2xl">
        <input
          type="text"
          placeholder="Places to go, things to do, hotels..."
          className="flex-grow px-6 py-3 bg-gray-100 border border-gray-300 rounded-l-full text-gray-800 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
        />
        <button className="bg-orange-500 text-white px-6 py-3 rounded-r-full hover:bg-orange-600 transition-all">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
