import React, { useState, useEffect } from "react";
import "./Home.css";
import { useParams } from "react-router-dom";
import axios from "../../axios";

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState(""); // Final transcript
  const [interimTranscript, setInterimTranscript] = useState(""); // For interim results
  const [recognition, setRecognition] = useState(null);
  const [title, setTitle] = useState(""); // State for title input
  const { movieId, sceneId } = useParams();

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true; // Keep capturing speech until manually stopped
      recognitionInstance.interimResults = true; // Provide interim results (live feedback)
      recognitionInstance.lang = "en-US"; // Set language to English

      recognitionInstance.onresult = (event) => {
        let interimText = "";
        let finalText = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalText += result[0].transcript;
          } else {
            interimText += result[0].transcript;
          }
        }

        // Update the interim transcript and only append final results to the main transcript
        setTranscript((prev) => prev + finalText);
        setInterimTranscript(interimText);
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      setRecognition(recognitionInstance);
    } else {
      console.error("Your browser does not support Speech Recognition");
    }
  }, []);

  const handleStartListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const handleStopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handleSubmit = async () => {
    if (sceneId !== undefined) {
      try {
        const response = await axios.post(`/api/edit_scene_text/${sceneId}`, {
          title,
          transcript,
        });
        alert("Submission successful");
      } catch (error) {
        console.error("Error submitting transcript:", error);
      }
    } else {
      try {
        const response = await axios.post(`/api/story/${movieId}/add_scene`, {
          title,
          transcript,
        });
        alert("Submission successful");
      } catch (error) {
        console.error("Error submitting transcript:", error);
      }
    }
  };

  return (
    <div className="speech-to-text-container">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter scene title"
        className="title-input rounded-md mb-4 px-4 py-2"
      />
      <p className="interim-transcript">Voice Preview: ‎ {interimTranscript}</p>
      <br />
      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="Transcript will appear here"
        rows={13}
        cols={50}
        name="content"
        className="transcript-textarea rounded-md"
      />
      <br />
      <div className="buttons">
        <div></div>
        <div className="buttonsInnerDiv">
          <button
            onClick={handleSubmit}
            className="submit-button relative px-8 py-2 ml-4 text-lg overflow-hidden font-semibold rounded text-white hover:bg-darkPurple transition-all bg-purple"
          >
            Convert ✨
          </button>
          <button
            onClick={isListening ? handleStopListening : handleStartListening}
            className={`record-button ${isListening ? "recording" : ""} `}
          >
            {isListening ? (
              <>🛑</>
            ) : (
              <>
                <span role="img" aria-label="start-icon">
                  🎤
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;
