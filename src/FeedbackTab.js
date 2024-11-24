import React from 'react';
import './FeedbackTab.css'; // Add styles here or inline

const FeedbackTab = ({ onClick }) => {
  return (
    <div className="feedback-tab" onClick={onClick}>
      Feedback
    </div>
  );
};

export default FeedbackTab;