import React from "react";
import { FaUser, FaRobot, FaFilm } from "react-icons/fa";

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window relative bottom-5">
      {messages.length === 0 ? (
        <div className="no-messages">
          <FaFilm className="nomsgicon" />
          <div className="nomessage-bubble">Start using screenplay</div>
        </div>
      ) : (
        messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.sender === "user" ? (
              <FaUser className="msgicon hidden" />
            ) : (
              <FaRobot className="msgicon " />
            )}
            <div className="message-bubble">{msg.text}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatWindow;
