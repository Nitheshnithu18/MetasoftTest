import { useEffect, useState } from "react";
import FeedbackDashboard from "../components/FeedbackDashboard";

const Dashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("feedbacks")) || [];
    setFeedbacks(data);
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-6">
        Feedback Dashboard
      </h1>
      <FeedbackDashboard data={feedbacks} />
    </>
  );
};

export default Dashboard;
