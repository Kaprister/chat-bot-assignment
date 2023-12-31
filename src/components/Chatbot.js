import React, { useState, useRef, useEffect } from 'react';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');
  const inputRef = useRef(null);
  const isComponentMounted = useRef(false);

  const questions = [
    'Tell me your first name?',
    'Tell me your last name?',
    'Where are you from?',
    'What is your email address?',
    'What is your contact number?',
    'Tell me your DOB?',
    'What is Your Gender?',
    'Tell me your father name?',
    'Tell me your mother name?',
    'Tell me about your qualifications.',
    'Tell me name of your school or collage?',
    'What is your 10th percentage?',
    'What is your 12th percentage?',
    'Tell me your hobbies?',
    // Add more questions as needed
  ];

  function addMessage(text, isUser = false) {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text, isUser, id: Math.random().toString() },
    ]);
  }

  const handleUserResponse = () => {
    if (currentMessage.trim() === '') return;

    addMessage(currentMessage, true);

    // Process user response here (e.g., send to server or update state)

    setCurrentMessage('');

    // Move to the next question
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        addMessage(questions[currentQuestionIndex + 1]);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }, 500);
    }
  };

  useEffect(() => {
    if (isComponentMounted.current && messages.length === 0 && currentQuestionIndex >= 0 ) {
      // Start the conversation with the first question
      addMessage(questions[currentQuestionIndex]);
    }else {
      // Mark the component as mounted after the initial render
      isComponentMounted.current = true;
    }
  }, [messages, currentQuestionIndex]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUserResponse();
    }
  };

  return (
    <div className="fixed bottom-0 right-0 m-4 p-4b bg-[#46edff9e] border rounded shadow-lg">
      <div className="h-40 overflow-y-scroll ">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`pl-1 pt-1 pr-1 mb-2 ${message.isUser ? 'text-right' : 'text-left'} `}
          >
            <span
              className={ `inline-block p-2 bg-[#7cffdee0] rounded font-bold ${
                message.isUser ? 'bg-blue-500 text-[#2d2a32]' : 'bg-gray-300'
              }`}
            >
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex mt-2 pr-1 pl-1 pb-1">
        <input
          ref={inputRef}
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 p-2 border rounded bg-[#ffffff] outline-none "
          placeholder="Type your response..."
        />
        <button
          onClick={handleUserResponse}
          className=" ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;

