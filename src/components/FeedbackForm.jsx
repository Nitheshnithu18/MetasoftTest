import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logEvent } from "../utils/logger";
import logo from "../assets/Rectangle 12.png";
import Banner from "../assets/Rectangle 1.png";
import Rating from "@mui/material/Rating";

const FeedbackForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    feedback: "",
    visitFrequency: "",
    recommend: "",
    suggestions: "",
    followup: false,
  });

  const [ratings, setRatings] = useState({
    food: 0,
    service: 0,
    experience: 0,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let errs = {};
    if (!form.name) errs.name = "Name is required.";
    if (!form.email) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email.";
    if (!form.feedback) errs.feedback = "Feedback is required.";
    if (!form.visitFrequency)
      errs.visitFrequency = "Please select how often you visit.";
    if (!form.recommend)
      errs.recommend = "Please indicate if you would recommend us.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      const finalData = { ...form, ratings };

      // 🔽 Send data to backend instead of only onSubmit()
      fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      })
        .then((res) => res.json())
        .then(() => {
          window.alert("✅ Feedback submitted successfully!");
          logEvent("Feedback Submitted", finalData);
          setForm({
            name: "",
            email: "",
            feedback: "",
            visitFrequency: "",
            recommend: "",
            suggestions: "",
            followup: false,
          });
          setRatings({ food: 0, service: 0, experience: 0 });
          navigate("/dashboard");
        })
        .catch((err) => {
          console.error("Error submitting feedback:", err);
          window.alert("❌ Something went wrong while submitting feedback!"); // 🔹 error alert
        });
    } else {
      logEvent("Validation Error", errs);
    }
  };

  const handleRatingChange = (category, value) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg w-full max-w-sm p-4 space-y-4">
        <img src={logo} alt="Logo" className="mx-auto w-[200px] h-[93px]" />
        <img
          src={Banner}
          alt="Banner"
          className="rounded w-[393px] h-[160px]"
        />

        <div className="text-center">
          <h1 className="text-lg font-semibold">HELLO, THANKS FOR VISITING</h1>
          <p className="text-sm text-gray-600">
            Please help us improve our service by filling out this feedback
            form.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full mt-1 border border-gray-300 p-2 rounded"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required // Added required attribute
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full mt-1 border border-gray-300 p-2 rounded"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required // Added required attribute
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Feedback */}
          <div>
            <label className="block text-sm font-medium">Feedback</label>
            <input
              type="text"
              className="w-full mt-1 border border-gray-300 p-2 rounded"
              value={form.feedback}
              onChange={(e) => setForm({ ...form, feedback: e.target.value })}
              required // Added required attribute
            />
            {errors.feedback && (
              <p className="text-red-500 text-sm">{errors.feedback}</p>
            )}
          </div>

          {/* Visit Frequency */}
          <div>
            <label className="block text-sm font-medium">
              How often do you visit here?
            </label>
            <select
              className="w-full mt-1 border border-gray-300 p-2 rounded"
              value={form.visitFrequency}
              onChange={(e) =>
                setForm({ ...form, visitFrequency: e.target.value })
              }
              required // Added required attribute
            >
              <option value="">Select</option>
              <option>Regularly</option>
              <option>Occasionally</option>
              <option>First Time</option>
            </select>
            {errors.visitFrequency && (
              <p className="text-red-500 text-sm">{errors.visitFrequency}</p>
            )}
          </div>

          {/* Star Ratings */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Quality of the Food
            </label>
            <Rating
              name="food-quality"
              value={ratings.food}
              onChange={(e, newValue) => handleRatingChange("food", newValue)}
              required // While the Rating component itself doesn't have a 'required' attribute in the traditional HTML sense, the validation logic in `validate` doesn't check for ratings. If you want to enforce a rating, you'd need to add a check in the `validate` function.
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Service Quality
            </label>
            <Rating
              name="service-quality"
              value={ratings.service}
              onChange={(e, newValue) =>
                handleRatingChange("service", newValue)
              }
              required // Same as above for 'required'
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Overall Experience
            </label>
            <Rating
              name="overall-experience"
              value={ratings.experience}
              onChange={(e, newValue) =>
                handleRatingChange("experience", newValue)
              }
              required // Same as above for 'required'
            />
          </div>

          {/* Recommend Radio */}
          <div>
            <label className="block text-sm font-medium">
              Would you recommend us?
            </label>
            <div className="flex space-x-4 mt-1">
              <label>
                <input
                  type="radio"
                  name="recommend"
                  value="yes"
                  checked={form.recommend === "yes"}
                  onChange={(e) =>
                    setForm({ ...form, recommend: e.target.value })
                  }
                  required // Added required attribute
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="recommend"
                  value="no"
                  checked={form.recommend === "no"}
                  onChange={(e) =>
                    setForm({ ...form, recommend: e.target.value })
                  }
                  required // Added required attribute
                />{" "}
                No
              </label>
            </div>
            {errors.recommend && (
              <p className="text-red-500 text-sm">{errors.recommend}</p>
            )}
          </div>

          {/* Suggestions */}
          <div>
            <label className="block text-sm font-medium">
              Your suggestions to improve
            </label>
            <textarea
              className="w-full mt-1 border border-gray-300 p-2 rounded"
              rows="3"
              value={form.suggestions}
              onChange={(e) =>
                setForm({ ...form, suggestions: e.target.value })
              }
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="followup"
              className="mr-2"
              checked={form.followup}
              onChange={(e) => setForm({ ...form, followup: e.target.checked })}
            />
            <label htmlFor="followup" className="text-sm">
              Receive personal follow-up to your feedback
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#D83D4C] text-white py-2 rounded font-semibold hover:bg-red-600"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
