"use client"
import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <div 
        className="flex justify-between items-center p-4 bg-red-50 rounded-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-gray-700">{question}</h3>
        <span className="text-xl">{isOpen ? '−' : '+'}</span>
      </div>
      {isOpen && (
        <div className="p-4 bg-gray-100 rounded-b-md">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQAndInquiry = () => {
  const faqs = [
    {
      question: "How do I choose the right travel destination for me?",
      answer: "Consider your interests, budget, desired experiences, and the type of environment you enjoy. Research destinations that align with your preferences and offer attractions or activities you find appealing."
    },
    {
      question: "What are the best times to visit specific destinations?",
      answer: ""
    },
    {
      question: "How can I find budget-friendly travel options and deals?",
      answer: ""
    },
    {
      question: "What essential items should I pack for my adventure?",
      answer: ""
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
        <div className="md:w-1/2">
          <h3 className="text-xl font-semibold mb-4">Do you have any specific question?</h3>
          <p className="text-gray-600 mb-4">
            Please fill the form below and our dedicated team will get intouch with you as soon as possible.
          </p>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full p-3 rounded-md bg-gray-100"
            />
            <textarea
              placeholder="Enter your question here"
              rows="4"
              className="w-full p-3 rounded-md bg-gray-100"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-300"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FAQAndInquiry;