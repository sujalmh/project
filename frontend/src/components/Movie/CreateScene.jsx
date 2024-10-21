// CreateScene.jsx
import React from "react";
import VoiceCommand from "./VoiceCommand"; // Adjust the import based on your file structure
import { useParams } from "react-router-dom"; // Import useParams

const CreateScene = () => {
  const { movieId } = useParams();

  return (
    <div className="bg-black h-screen p-4">
      <h1 className="text-white text-3xl mb-4 text-center">Create New Scene</h1>
      <section className="h-screen flex items-center justify-center">
        <VoiceCommand storyId={movieId} />
      </section>
    </div>
  );
};

export default CreateScene;
