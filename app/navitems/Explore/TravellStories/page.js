"use client"
import React, { useState } from 'react';

const TravelStories = () => {
  const [stories, setStories] = useState([]);
  const [form, setForm] = useState({ name: '', experience: '', rating: 0, image: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: URL.createObjectURL(file) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStories([...stories, form]);
    setForm({ name: '', experience: '', rating: 0, image: '' });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Share Your Travel Stories</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleInputChange}
          placeholder="Your Name"
          className="border p-2 mb-4 w-full"
        />
        <textarea
          name="experience"
          value={form.experience}
          onChange={handleInputChange}
          placeholder="Share your experience"
          className="border p-2 mb-4 w-full"
        />
        <input
          type="number"
          name="rating"
          value={form.rating}
          onChange={handleInputChange}
          placeholder="Rating (1-5)"
          className="border p-2 mb-4 w-full"
          max={5}
          min={1}
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="border p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit Story
        </button>
      </form>

      <div className="space-y-8">
        {stories.map((story, index) => (
          <div key={index} className="border p-4 rounded-lg">
            {story.image && <img src={story.image} alt="travel" className="w-full h-64 object-cover mb-4" />}
            <h3 className="text-2xl font-bold mb-2">{story.name}</h3>
            <p>{story.experience}</p>
            <p className="font-semibold">Rating: {story.rating}/5</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelStories;
