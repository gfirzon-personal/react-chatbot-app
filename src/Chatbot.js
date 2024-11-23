import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css'; // Add styles here or inline

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const apiKey = process.env.REACT_APP_API_KEY;

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user message to chat history
    const userMessage = { sender: 'user', text: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Call AI backend
    try {
      const response = await axios.post('https://api.openai.com/v1/completions', {
        model: 'gpt-3.5-turbo-instruct',
        prompt: `You are a helpful assistant. ${userInput}`,
        max_tokens: 150,
        temperature: 0.7,
      }, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      const aiMessage = { sender: 'ai', text: response.data.choices[0].text.trim() };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }

    setUserInput('');
  };

  return (
    <div className="chatbot-container">
      <div className="chatbox">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
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
  );
};

export default Chatbot;
