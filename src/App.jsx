import { BrowserRouter, Routes, Route } from "react-router-dom";
import FeedbackPage from "./pages/FeedbackPage";
import DashboardPage from "./pages/Dashboard";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<FeedbackPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
