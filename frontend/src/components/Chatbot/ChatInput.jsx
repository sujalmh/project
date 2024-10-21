import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const ChatInput = ({ onSend }) => {
  const [userInput, setUserInput] = useState("");

  const handleSend = () => {
    if (userInput.trim() === "") return;
    onSend(userInput);
    setUserInput("");
  };

  return (
    <div className="absolute pb-4 bottom-10 right-0 w-full p-3 bg-gray-900 border-t border-gray-700 flex">
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your message..."
        onKeyPress={(e) => e.key === "Enter" && handleSend()}
        className="flex-1 p-3 bg-gray-800 text-white rounded-md mr-3 border border-gray-600"
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </div>
  );
};

export default ChatInput;
