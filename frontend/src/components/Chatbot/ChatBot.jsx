import React, { useEffect, useState } from 'react';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import axiosInstance from '../../axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  // Fetch initial chat messages when the component mounts
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await axiosInstance.get('/api/get_chat');
        // Transform response to match your expected message structure
        const formattedMessages = response.data.map(chat => ({
          sender: chat.role === 'user' ? 'user' : 'bot', // Adjust based on your role structure
          text: chat.content
        }));
        setMessages(formattedMessages);
      } catch (error) {
        console.error('Error fetching chat messages:', error);
      }
    };

    fetchChat();
  }, []); // Dependency array empty to run only once on mount

  const handleSend = async (userInput) => {
    if (userInput.trim() === "") return; // Prevent sending empty messages

    // Add user message to the chat
    const userMessage = { sender: 'user', text: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      // Send the user input to the server
      const response = await axiosInstance.post('/api/chat', { userInput });
      const botMessage = response.data; // Assuming the response structure is correct
      setMessages((prevMessages) => [...prevMessages, botMessage]); // Add bot message to chat
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="w-[90%] h-[80vh] bott relative pb-20">
      {/* Chat Window should take up available space */}
      <div className="bott h-[90vh] overflow-scroll">
        <ChatWindow messages={messages} />
      </div>
      {/* Chat Input should be fixed at the bottom */}
      <div className="relative">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default Chatbot;
