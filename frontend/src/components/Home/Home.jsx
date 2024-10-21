import React, { useState, useEffect, useContext, createContext } from "react";
import axiosInstance from "../../axios";
import Card from "./Card";
import { Link } from "react-router-dom";
import NewMovieForm from "../Forms/NewMovieForm";
import { UserContext } from "../UI/Layout";

const Home = () => {
  const [cardData, setCardData] = useState([]);
  const [isOpenCreatePrompt, setIsOpenCreatePrompt] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [iid, setIid] = useState(0);

  const { setScenes, setMovieSelected } = useContext(UserContext);

  const isOpenCreatePromptHandler = () => {
    setIsOpenCreatePrompt(!isOpenCreatePrompt);
  };

  const fetchStories = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.get("/api/get_stories");
      const { scenes_data } = response.data;
      const formattedData = scenes_data.map((story) => ({
        title: story.title,
        shortDescription: story.description,
        imgSrc: story.image_link,
        date: `Created: ${new Date(story.created_at).toLocaleDateString()}`,
        id: story.id,
      }));
      setCardData(formattedData);
    } catch (error) {
      setError("Failed to load stories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const cardSubmitHandler = async (id) => {
    setIid(id);
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/story/${id}/get_scenes`);
      const scenes_data = response.data.scenes_data;
      setScenes(scenes_data);
      setMovieSelected(true);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Failed to load scenes.");
    } finally {
      setLoading(false);
    }
  };

  // New function to handle movie submission
  const handleMovieSubmission = async (movieData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/add_story", movieData);
      console.log(response.data);
      fetchStories();
      setIsOpenCreatePrompt(false); // Close the form
    } catch (error) {
      console.error(error);
      setError("Failed to create movie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpenCreatePrompt && (
        <NewMovieForm onSubmit={handleMovieSubmission} onCancel={isOpenCreatePromptHandler} />
      )}

      <div className="bg-black pb-20">
        <div className="flex justify-center pt-12">
          <Link
            type="button"
            onClick={isOpenCreatePromptHandler}
            className="relative px-9 py-4 ml-4 text-xl overflow-hidden font-semibold rounded text-white hover:bg-darkPurple transition-all bg-purple"
          >
            Movie
            <span className="absolute top-0 text-black right-0 px-5 py-1 text-xs tracking-wider text-center uppercase whitespace-no-wrap origin-bottom-left transform rotate-45 -translate-y-full translate-x-1/3 bg-white">
              New
            </span>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center">
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            cardData.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                shortDescription={card.shortDescription}
                imgSrc={card.imgSrc}
                date={card.id +": " + card.date}
                onClick={() => cardSubmitHandler(card.id)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
