'use client';
import { useEffect, useState } from 'react';

function Chatbot() {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  useEffect(() => {
    // Automatically show the chatbot on component mount
    setIsChatbotVisible(true);
  }, []);

  useEffect(() => {
    if (isChatbotVisible) {
      const script = document.createElement('script');
      script.src = 'https://www.chatbase.co/embed.min.js';
      script.id = 'TBWjtjbIcxQsYzgQxnsxT';
      script.setAttribute('chatbotId', 'TBWjtjbIcxQsYzgQxnsxT');
      script.setAttribute('domain', 'www.chatbase.co');
      document.body.appendChild(script);

      return () => {
        const existingScript = document.getElementById('TBWjtjbIcxQsYzgQxnsxT');
        if (existingScript) existingScript.remove();
        const iframe = document.querySelector('iframe[src*="chatbase"]');
        if (iframe) iframe.remove();
      };
    }
  }, [isChatbotVisible]);

  const handleClickOutside = (event) => {
    const chatbotContainer = document.getElementById('chatbot-container');
    if (
      isChatbotVisible &&
      chatbotContainer &&
      !chatbotContainer.contains(event.target)
    ) {
      setIsChatbotVisible(false);
    }
  };

  useEffect(() => {
    if (isChatbotVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isChatbotVisible]);

  return (
    <>
      {/* Invisible div to detect outside clicks */}
      {isChatbotVisible && (
        <div
          id="chatbot-container"
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            zIndex: 9999,
            width: '0px',
            height: '0px',
          }}
        />
      )}
    </>
  );
}

export default Chatbot;