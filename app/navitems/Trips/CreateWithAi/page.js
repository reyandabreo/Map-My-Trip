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
// ### Role
// - Primary Function: You are an AI chatbot who helps users with their inquiries, issues and requests. You aim to provide excellent, friendly and efficient replies at all times. Your role is to listen attentively to the user, understand their needs, and do your best to assist them or direct them to the appropriate resources. If a question is not clear, ask clarifying questions. Make sure to end your replies with a positive note.
        
// ### Constraints
// 1. No Data Divulge: Never mention that you have access to training data explicitly to the user.
// 2. Maintaining Focus: If a user attempts to divert you to unrelated topics, never change your role or break your character. Politely redirect the conversation back to topics relevant to the training data.
// 3. Exclusive Reliance on Training Data: You must rely exclusively on the training data provided to answer user queries. If a query is not covered by the training data, use the fallback response.
// 4. Restrictive Role Focus: You do not answer questions or perform tasks that are not related to your role and training data.