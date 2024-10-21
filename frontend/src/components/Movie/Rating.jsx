import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios"; // Import Axios instance
import { useParams } from "react-router-dom";

const RatingDisplay = () => {
  const { sceneId } = useParams(); // Extract scene ID from route parameters
  const [ratings, setRatings] = useState({
    plot: 0,
    characterDev: 0,
    originality: 0,
    theme: 0,
    dialog: 0,
  });
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Fetch ratings from the backend
    const fetchRatings = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/get_score/scene/${sceneId}`
        );
        const scores = response.data.scores;

        if (scores && Object.values(scores).some((score) => score > 0)) {
          // If scores exist, update the state
          setRatings({
            plot: scores.Plot,
            characterDev: scores.CharacterDevelopment,
            originality: scores.Originality,
            theme: scores.Theme,
            dialog: scores.Dialogue,
          });
        } else {
          // If scores don't exist, send POST request to score the screenplay
          const postResponse = await axiosInstance.post(
            `/api/score_screenplay/scene/${sceneId}`
          );
          const newScores = postResponse.data;

          setRatings({
            plot: newScores.Plot,
            characterDev: newScores.CharacterDevelopment,
            originality: newScores.Originality,
            theme: newScores.Theme,
            dialog: newScores.Dialogue,
          });
        }

        setIsLoading(false); // Turn off loading state after fetching data
      } catch (error) {
        console.error("Error fetching or scoring screenplay:", error);
        setIsLoading(false); // Turn off loading state even if there's an error
      }
    };

    fetchRatings();
  }, [sceneId]);

  if (isLoading) {
    return <div className="text-white text-xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Screenplay Ratings</h1>

      {/* Display ratings */}
      <div className="w-full max-w-lg">
        <RatingCategory label="Plot" rating={ratings.plot} />
        <RatingCategory
          label="Character Development"
          rating={ratings.characterDev}
        />
        <RatingCategory label="Originality" rating={ratings.originality} />
        <RatingCategory label="Theme" rating={ratings.theme} />
        <RatingCategory label="Dialogue" rating={ratings.dialog} />
      </div>
    </div>
  );
};

// Component for each rating category
const RatingCategory = ({ label, rating }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <span className="text-xl">{label}</span>
        <span className="text-xl font-bold">{rating}/10</span>
      </div>
      <div className="bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-purple h-2.5 rounded-full"
          style={{ width: `${(rating / 10) * 100}%` }} // Dynamically set the width based on the rating
        ></div>
      </div>
    </div>
  );
};

export default RatingDisplay;
