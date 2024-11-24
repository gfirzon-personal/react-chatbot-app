import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MyToast.css'; // Add styles here or inline

import './Chatbot.css'; // Add styles here or inline
import Sidebar from './Sidebar';
import { fetchAIResponse } from "./utils/fetchAIResponse";
import { handleFeedback } from "./utils/FeedbackService";
//import FeedbackComponent from './FeedbackComponent';
import GptFeedback from './GptFeedbackComponent';
import FeedbackTab from './FeedbackTab';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [currentMessageId, setCurrentMessageId] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleFeedbackClick = () => {
    setShowFeedback(true);
  };

  const handleFeedbackSubmit = async (data) => {
    console.log("handleFeedbackSubmit invoked:", data);
    
    // Call feedback service to save feedback
    await handleFeedback(data, currentMessageId); 
    // Process feedback (e.g., send to API)
    // Show toast notification
    const message = `${data.feedback === 'up' ? '👍' : '👎'}<br>${data.comment}`;
    toast.info(<div dangerouslySetInnerHTML={{ __html: message }} />, {
      className: 'toast-green',
    });
  };

  const handleDismissFeedback = () => {
    console.log("Feedback dismissed");
    setShowFeedback(false);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { role: "user", content: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    //setShowFeedback(true); // Show feedback component when new response is received

    setUserInput(""); // Clear input
    //setIsTyping(true); // Show typing indicator

    const apiMessages = [
      ...messages.map((msg) => ({ role: msg.role, content: msg.content })),
      userMessage,
    ];

    try {
      const { content: aiContent, id } = await fetchAIResponse(apiMessages);
      const aiMessage = { role: "assistant", content: aiContent, id };
      setCurrentMessageId(id);

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
              {msg.role === 'assistant' && <span role="img" aria-label="AI">🤖</span>}
              {msg.role === 'user' && <span role="img" aria-label="USER">👤</span>}
              {msg.content}
              {/* {msg.role === 'assistant' &&
                <div className='assistant-id'>
                  {msg.id}
                </div>
              } */}
              {msg.role === 'assistant' && index === messages.length - 1 &&
                <div>
                  <span
                    className="far fa-thumbs-up"
                    onClick={handleFeedbackClick}
                    style={{ cursor: 'pointer' }}
                    aria-label="thumbs up"
                  ></span>
                </div>
              }
            </div>
          ))}
          {/* <FeedbackTab onClick={handleFeedbackClick} /> */}
          {showFeedback && (
            <GptFeedback onSubmitFeedback={handleFeedbackSubmit} onDismiss={handleDismissFeedback} />
          )}
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
      <ToastContainer />
    </div>
  );
};

export default Chatbot;
