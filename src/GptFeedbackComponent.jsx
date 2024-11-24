import React, { useState } from "react";

const GptFeedback = ({ onSubmitFeedback, onDismiss }) => {
  const [feedback, setFeedback] = useState(null); // thumbs up/down
  const [comment, setComment] = useState(""); // user comments

  const handleFeedback = (value) => {
    setFeedback(value);
  };

  const handleSubmit = () => {
    if (feedback !== null || comment.trim() !== "") {
      onSubmitFeedback({ feedback, comment });
    }
    setFeedback(null);
    setComment("");
    onDismiss();
  };

  return (
    <div style={styles.container}>
      <p>How was your experience?</p>
      <div style={styles.thumbsContainer}>
        <button
          onClick={() => handleFeedback("up")}
          style={{
            ...styles.thumbButton,
            backgroundColor: feedback === "up" ? "#d4edda" : "#f8f9fa",
          }}
        >
          👍
        </button>
        <button
          onClick={() => handleFeedback("down")}
          style={{
            ...styles.thumbButton,
            backgroundColor: feedback === "down" ? "#f8d7da" : "#f8f9fa",
          }}
        >
          👎
        </button>
      </div>
      <textarea
        placeholder="Tell us more (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={styles.textArea}
      />
      <div style={styles.actions}>
        <button onClick={handleSubmit} style={styles.submitButton}>
          Submit Feedback
        </button>
        <button onClick={onDismiss} style={styles.dismissButton}>
          Dismiss
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "10px",
    margin: "10px 0",
    backgroundColor: "#f8f9fa",
    color: "#212529",
    border: "1px solid #ced4da",
    borderRadius: "5px",
    maxWidth: "400px",
  },
  thumbsContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  thumbButton: {
    padding: "10px",
    fontSize: "20px",
    cursor: "pointer",
    border: "1px solid #ced4da",
    borderRadius: "5px",
    margin: "0 5px",
  },
  textArea: {
    width: "100%",
    height: "60px",
    border: "1px solid #ced4da",
    borderRadius: "5px",
    padding: "5px",
    marginBottom: "10px",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
  submitButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "3px",
    cursor: "pointer",
  },
  dismissButton: {
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "3px",
    cursor: "pointer",
  },
};

export default GptFeedback;
