import React, { useState } from 'react';
import './Chatbot.css'; // Add styles here or inline
import Sidebar from './Sidebar';
import { fetchAIResponse } from "./utils/fetchAIResponse";
import FeedbackComponent from './FeedbackComponent';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { role: "user", content: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setShowFeedback(true); // Show feedback component when new response is received

    setUserInput(""); // Clear input
    //setIsTyping(true); // Show typing indicator

    const apiMessages = [
      ...messages.map((msg) => ({ role: msg.role, content: msg.content })),
      userMessage,
    ];

    try {
      const aiContent = await fetchAIResponse(apiMessages);
      const aiMessage = { role: "assistant", content: aiContent };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "system", content: error.message },
      ]);
    } finally {
      //setIsTyping(false); // Hide typing indicator
    }
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="chatbot-container">
        <div className="chatbox">
          {/*console.log(messages)*/} 
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              {msg.content}
            </div>
          ))}
          {showFeedback && <FeedbackComponent />}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
