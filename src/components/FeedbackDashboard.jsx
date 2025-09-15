import { useEffect, useState } from "react";

const FeedbackDashboard = () => {
  const [data, setData] = useState([]);

  // Fetch feedbacks from backend when component loads
  useEffect(() => {
    fetch("http://localhost:5000/api/feedback")
      .then((res) => res.json())
      .then((feedbacks) => setData(feedbacks))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <>
      {/* Desktop Table View */}
      <div className="overflow-x-auto mt-8 rounded-lg shadow-md hidden md:block p-2 md:p-5 ">
        <table className="min-w-full table-auto border border-gray-200">
          <thead>
            <tr className="bg-gradient-to-r from-gray-100 to-gray-200 text-xs text-gray-600 uppercase tracking-wider">
              <th className="px-4 py-3 border">Name</th>
              <th className="px-4 py-3 border">Email</th>
              <th className="px-4 py-3 border">Feedback</th>
              <th className="px-4 py-3 border">Visit Frequency</th>
              <th className="px-4 py-3 border">Recommend</th>
              <th className="px-4 py-3 border">Suggestions</th>
              <th className="px-4 py-3 border">Follow Up</th>
              <th className="px-4 py-3 border">Food Rating</th>
              <th className="px-4 py-3 border">Service Rating</th>
              <th className="px-4 py-3 border">Experience Rating</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {data.map((item, idx) => (
              <tr
                key={idx}
                className="text-center hover:bg-gray-100 even:bg-gray-50 transition duration-200 ease-in-out"
              >
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.email}</td>
                <td className="border px-4 py-2">{item.feedback}</td>
                <td className="border px-4 py-2">
                  {item.visitFrequency || "-"}
                </td>
                <td className="border px-4 py-2">{item.recommend || "-"}</td>
                <td className="border px-4 py-2">{item.suggestions || "-"}</td>
                <td className="border px-4 py-2">
                  {item.followup ? "Yes" : "No"}
                </td>
                <td className="border px-4 py-2">
                  {item.ratings?.food ?? "-"}
                </td>
                <td className="border px-4 py-2">
                  {item.ratings?.service ?? "-"}
                </td>
                <td className="border px-4 py-2">
                  {item.ratings?.experience ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden mt-6 space-y-4 ">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="rounded-lg shadow-sm border border-gray-200 p-4 bg-white flex flex-col space-y-2 justify-center items-center"
          >
            <p>
              <span className="font-semibold">Name:</span> {item.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {item.email}
            </p>
            <p>
              <span className="font-semibold">Feedback:</span> {item.feedback}
            </p>
            <p>
              <span className="font-semibold">Visit Frequency:</span>{" "}
              {item.visitFrequency || "-"}
            </p>
            <p>
              <span className="font-semibold">Recommend:</span>{" "}
              {item.recommend || "-"}
            </p>
            <p>
              <span className="font-semibold">Suggestions:</span>{" "}
              {item.suggestions || "-"}
            </p>
            <p>
              <span className="font-semibold">Follow Up:</span>{" "}
              {item.followup ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-semibold">Food Rating:</span>{" "}
              {item.ratings?.food ?? "-"}
            </p>
            <p>
              <span className="font-semibold">Service Rating:</span>{" "}
              {item.ratings?.service ?? "-"}
            </p>
            <p>
              <span className="font-semibold">Experience Rating:</span>{" "}
              {item.ratings?.experience ?? "-"}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeedbackDashboard;
