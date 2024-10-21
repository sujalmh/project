import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../axios";

const Breadcrumb = ({ currentSection, setCurrentSection, onSubmit }) => {
  const [screenPlayData, setScreenPlayData] = useState("");
  const { sceneId } = useParams();

  // Function to fetch screenplay data
  const handleScreenPlay = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/get_scene_formatted/scene/${sceneId}`
      );
      setScreenPlayData(response.data.formatted);
      if (onSubmit) {
        onSubmit(response.data.formatted); // Pass the data back to the parent
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Trigger the button click (handleScreenPlay) when the component mounts
  useEffect(() => {
    setCurrentSection(1); // Set the active section to 1 (Screenplay)
    handleScreenPlay(); // Fetch the screenplay data
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <nav
      className="flex items-center space-x-2 text-md justify-center"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <button
            onClick={() => {
              setCurrentSection(1);
              handleScreenPlay();
            }}
            className={`${
              currentSection === 1
                ? "text-blue-200"
                : "text-purple hover:darkPurple"
            }`}
          >
            Screenplay
          </button>
        </li>
        <li>
          <div className="flex items-center">
            <span className="text-gray-500">/</span>
            <button
              onClick={() => setCurrentSection(2)}
              className={`ml-2 ${
                currentSection === 2
                  ? "text-blue-200"
                  : "text-purple hover:darkPurple"
              }`}
            >
              Voice Command
            </button>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <span className="text-gray-500">/</span>
            <button
              onClick={() => setCurrentSection(3)}
              className={`ml-2 ${
                currentSection === 3
                  ? "text-blue-200"
                  : "text-purple hover:darkPurple"
              }`}
            >
              Sentiment Analysis
            </button>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <span className="text-gray-500">/</span>
            <button
              onClick={() => setCurrentSection(4)}
              className={`ml-2 ${
                currentSection === 4
                  ? "text-blue-200"
                  : "text-purple hover:darkPurple"
              }`}
            >
              Chatbot
            </button>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <span className="text-gray-500">/</span>
            <button
              onClick={() => setCurrentSection(5)}
              className={`ml-2 ${
                currentSection === 5
                  ? "text-blue-200"
                  : "text-purple hover:darkPurple"
              }`}
            >
              Summary
            </button>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
