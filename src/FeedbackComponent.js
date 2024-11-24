import React, { useState } from 'react';
import './FeedbackComponent.css';

const FeedbackComponent = () => {
    const [feedback, setFeedback] = useState('');
    const [thumbsUp, setThumbsUp] = useState(false);
    const [thumbsDown, setThumbsDown] = useState(false);

    const handleThumbsUp = () => {
        setThumbsUp(true);
        setThumbsDown(false);
        alert('Thumbs Up clicked!');
    };

    const handleThumbsDown = () => {
        setThumbsUp(false);
        setThumbsDown(true);
        alert('Thumbs Down clicked!');
    };

    const handleFeedbackChange = (event) => {
        setFeedback(event.target.value);
    };

    return (
        <div className="feedback-container">
            <div className="buttons">
                <button onClick={handleThumbsUp} className={thumbsUp ? 'active' : ''}>👍</button>
                <button onClick={handleThumbsDown} className={thumbsDown ? 'active' : ''}>👎</button>
            </div>
            <textarea
                value={feedback}
                onChange={handleFeedbackChange}
                className="feedback-text"
                placeholder="Enter your feedback here..."
            />
        </div>
    );
};

export default FeedbackComponent;