"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa'; // Import the icon

function Page() {
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => router.back()}
        style={{
          margin: '10px',
          padding: '10px 20px',
          backgroundColor: '#FFA500',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
        }}
      >
        <FaArrowLeft /> {/* Back Icon */}
      </button>
      <iframe
        src="https://www.chatbase.co/chatbot-iframe/TBWjtjbIcxQsYzgQxnsxT"
        width="100%"
        style={{ height: '100%', minHeight: '700px' }}
        frameBorder="0"
      ></iframe>
    </>
  );
}

export default Page;
