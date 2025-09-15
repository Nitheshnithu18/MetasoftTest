import { useState, useEffect } from "react";
import FeedbackForm from "../components/FeedbackForm";

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState(
    () => JSON.parse(localStorage.getItem("feedbacks")) || []
  );

  const addFeedback = (feedback) => {
    const updated = [...feedbacks, feedback];
    setFeedbacks(updated);
    localStorage.setItem("feedbacks", JSON.stringify(updated));
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-6 ">Feedback Form</h1>
      <FeedbackForm onSubmit={addFeedback} />
    </>
  );
};

export default FeedbackPage;
