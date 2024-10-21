import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios'; // Ensure axiosInstance is properly set up
import { useParams } from 'react-router-dom';

const SentimentAnalysis = () => {
  const [sentimentData, setSentimentData] = useState({
    emotions: [],
    sentence: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataExists, setDataExists] = useState(false);
  const { sceneId } = useParams();

  // Function to handle fetching existing sentiment analysis data
  const fetchExistingSentimentData = async () => {
    setLoading(true);
    setError("");

    try {
      // Make a GET request to check if sentiment analysis for the given sceneId exists
      const response = await axiosInstance.get(`/api/get_sentiment_analysis/scene/${sceneId}`);

      // If data is returned, update the state with the fetched data
      if (response.data) {
        const { emoji_data, desc } = response.data;
        setSentimentData({
          emotions: emoji_data,
          sentence: desc,
        });
        setDataExists(true);  // Data exists in the DB
      } else {
        setSentimentData({ emotions: [], sentence: "" });
        setDataExists(false);  // No data found
      }
    } catch (error) {
      setError("Failed to fetch sentiment data. Please try again.");
      setSentimentData({ emotions: [], sentence: "" });
      setDataExists(false);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle performing a new sentiment analysis
  const handleAnalysis = async () => {
    setLoading(true);
    setError("");

    try {
      // Make a POST request to fetch new sentiment analysis for the given sceneId
      const response = await axiosInstance.post(`/api/sentiment_analysis/scene/${sceneId}`);

      // Update the state with the new data from the API response
      const { emoji, desc } = response.data;
      setSentimentData({
        emotions: emoji,
        sentence: desc,
      });
      setDataExists(true);  // Analysis has been done
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch sentiment data on component mount
  useEffect(() => {
    fetchExistingSentimentData(); // Fetch existing sentiment data
  }, [sceneId]);

  return (
    <div className="min-h-screen bg-gradient-to-r bg-black from-purple-300 via-pink-300 to-red-300 flex flex-col items-center justify-center p-5">
      <h1 className="center text-4xl font-bold text-white mb-6 mt-[-80px]">
        Sentiment Analysis
      </h1>

      <div className="w-full max-w-lg px-14 py-4 content-box shadow-md bg-transparent border border-gray-500 dark:text-gray-800 rounded">
        <h2 className="text-2xl text-center font-semibold text-gray-200 mb-4">
          Results:
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="flex justify-center mb-4">
          {sentimentData.emotions.length > 0 ? (
            sentimentData.emotions.map((emotion, index) => (
              <div key={index} className="relative group text-center">
                {/* Emoji */}
                <span className="text-4xl mx-2">{emotion.emoji}</span>

                {/* Tooltip */}
                <div
                  className={`absolute z-30 rounded-lg px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 group-hover:visible group-hover:opacity-100 -translate-x-[30%] translate-y-[30%]`}
                >
                  {emotion.emoji_name} {/* Use emoji_name instead of name */}
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg text-center text-gray-300 italic">
              {dataExists ? "No sentiment data available." : "No analysis performed yet."}
            </p>
          )}
        </div>

        <p className="text-lg text-center text-gray-300 italic">
          {sentimentData.sentence || "No sentiment data available."}
        </p>
      </div>

      {/* Show button to analyze or re-analyze */}
      <button
        type="button"
        onClick={handleAnalysis}
        disabled={loading}
        className="relative px-5 py-2 ml-4 mt-10 text-xl overflow-hidden font-semibold rounded text-white hover:bg-darkPurple transition-all bg-purple"
      >
        {loading ? "Analysing..." : dataExists ? "Update Score" : "Create New Score"}
      </button>
    </div>
  );
};

export default SentimentAnalysis;
