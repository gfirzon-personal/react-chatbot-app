import React, { useState } from 'react';
import './Chatbot.css'; // Add styles here or inline
import { fetchAIResponse } from "./utils/fetchAIResponse";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { role: "user", content: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

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
      <div className="sidebar">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="chatbot-container">
        <div className="chatbox">
          {/*console.log(messages)*/} 
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              {msg.content}
            </div>
          ))}
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
