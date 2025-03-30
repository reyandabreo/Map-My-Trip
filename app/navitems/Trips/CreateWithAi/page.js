"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

function Page() {
  const router = useRouter();
  const [viewportHeight, setViewportHeight] = useState(0);

  // Update viewport height on mount and window resize
  useEffect(() => {
    const updateHeight = () => {
      setViewportHeight(window.innerHeight);
    };
    
    // Set initial height
    updateHeight();
    
    // Add event listener for resize
    window.addEventListener('resize', updateHeight);
    
    // Clean up event listener
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
        >
          <FaArrowLeft /> Back
        </button>
      </div>
      
      <div className="flex-grow overflow-hidden">
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/TBWjtjbIcxQsYzgQxnsxT"
          width="100%"
          height={viewportHeight ? `${viewportHeight - 40}px` : '700px'}
          style={{ border: 'none' }}
        ></iframe>
      </div>
    </div>
  );
}

export default Page;