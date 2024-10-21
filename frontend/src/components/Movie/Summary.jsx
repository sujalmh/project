import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Rating from "./Rating";
import axiosInstance from "../../axios"; // Import Axios instance

const Summary = () => {
  const { sceneId } = useParams(); // Extract sceneId from the route parameters
  const [summary, setSummary] = useState(""); // State to hold the summary
  const [isLoading, setIsLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Fetch the summary when the component mounts
    const fetchSummary = async () => {
      try {
        const response = await axiosInstance.post(
          `/api/summarize_screenplay/scene/${sceneId}`
        );
        setSummary(response.data); // Assuming the summary comes in the response data
        setIsLoading(false); // Stop loading once the summary is fetched
      } catch (err) {
        console.error("Error fetching summary:", err);
        setError("Failed to load summary.");
        setIsLoading(false); // Stop loading even if there's an error
      }
    };

    fetchSummary(); // Call the fetch function
  }, [sceneId]); // Run the effect whenever sceneId changes

  // Handle loading state
  if (isLoading) {
    return <div className="text-white text-xl">Loading summary...</div>;
  }

  // Handle error state
  if (error) {
    return <div className="text-red-500 text-xl">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Screenplay Summary</h1>
      <div className="bg-gray-800 p-4 rounded-lg w-full max-w-3xl">
        {/* Display the fetched summary */}
        <p className="text-lg leading-relaxed">{summary}</p>
      </div>
      <Rating />
    </div>
  );
};

export default Summary;
