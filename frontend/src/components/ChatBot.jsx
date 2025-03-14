import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faPaperPlane, faTimes, faExclamationTriangle, faRedo } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const ChatbotButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--secondary-color);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--background-dark);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const ChatWindow = styled(motion.div)`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 350px;
  height: 500px;
  background-color: var(--background-light);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  padding: 15px;
  background-color: var(--background-dark);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChatTitle = styled.h3`
  margin: 0;
  color: var(--text-primary);
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 1.2rem;
  padding: 5px;
  
  &:hover {
    color: var(--text-primary);
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Message = styled.div`
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 12px;
  margin-bottom: 5px;
  
  ${props => props.isUser ? `
    background-color: var(--secondary-color);
    color: var(--background-dark);
    align-self: flex-end;
  ` : `
    background-color: var(--background-dark);
    color: var(--text-primary);
    align-self: flex-start;
  `}
`;

const ErrorMessage = styled(Message)`
  background-color: rgba(255, 0, 0, 0.2);
  border: 1px solid rgba(255, 0, 0, 0.3);
  color: var(--text-primary);
  align-self: flex-start;
`;

const RetryButton = styled.button`
  background: none;
  border: none;
  color: var(--secondary-color);
  cursor: pointer;
  font-size: 0.9rem;
  padding: 5px 0;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ChatInput = styled.form`
  padding: 15px;
  background-color: var(--background-dark);
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid var(--text-secondary);
  border-radius: 6px;
  background-color: var(--background-light);
  color: var(--text-primary);
  
  &:focus {
    outline: none;
    border-color: var(--secondary-color);
  }
`;

const SendButton = styled.button`
  background-color: var(--secondary-color);
  border: none;
  border-radius: 6px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--background-dark);
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const TypingIndicator = styled.div`
  background-color: var(--background-dark);
  color: var(--text-primary);
  align-self: flex-start;
  padding: 10px 15px;
  border-radius: 12px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  
  .dot {
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: var(--text-primary);
    margin: 0 2px;
    animation: bounce 1.4s infinite ease-in-out both;
  }
  
  .dot:nth-child(1) { animation-delay: -0.32s; }
  .dot:nth-child(2) { animation-delay: -0.16s; }
  
  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }
`;

// Common questions that the user might want to ask
const SUGGESTED_QUESTIONS = [
  "Tell me about Onkar's projects",
  "What skills does Onkar have?",
  "Where did Onkar study?",
  "What is Onkar's work experience?"
];

const SuggestedQuestions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

const SuggestedQuestion = styled.button`
  background-color: rgba(100, 255, 218, 0.1);
  border: 1px solid var(--secondary-color);
  border-radius: 12px;
  color: var(--text-primary);
  padding: 6px 12px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(100, 255, 218, 0.2);
  }
`;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: "Hi! I'm Onkar's portfolio assistant. I can help you learn more about his education, experience, skills, and projects. What would you like to know?",
          isUser: false,
          showSuggestions: true
        }
      ]);
    }
    scrollToBottom();
  }, [isOpen, messages]);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSuggestedQuestion = (question) => {
    handleSendMessage(question);
  };
  
  const retryLastMessage = () => {
    const lastUserMessage = [...messages].reverse().find(msg => msg.isUser);
    if (lastUserMessage) {
      sendMessage(lastUserMessage.text);
    }
  };
  
  const sendMessage = async (text) => {
    setIsLoading(true);
    
    try {
      // Set a timeout for the API call
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await axios.post('/api/chatbot/chat', {
        message: text
      }, { signal: controller.signal });
      
      clearTimeout(timeoutId);
      
      setMessages(prev => [...prev, { text: response.data.response, isUser: false, showSuggestions: false }]);
      setErrorCount(0); // Reset error count on successful response
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Increment error counter
      const newErrorCount = errorCount + 1;
      setErrorCount(newErrorCount);
      
      // Different error messages based on number of consecutive errors
      let errorMessage = "I'm having trouble connecting right now. Please try again later.";
      
      if (newErrorCount >= 3) {
        errorMessage = "I'm experiencing technical difficulties. Please try again later or check out Onkar's projects directly from the Projects page.";
      }
      
      setMessages(prev => [...prev, {
        text: errorMessage,
        isUser: false,
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSendMessage = (suggestedText = null) => {
    const messageText = suggestedText || inputMessage.trim();
    if (!messageText || isLoading) return;
    
    setMessages(prev => [...prev, { text: messageText, isUser: true }]);
    setInputMessage('');
    
    sendMessage(messageText);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage();
  };
  
  return (
    <ChatbotContainer>
      <ChatbotButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
      >
        <FontAwesomeIcon icon={faRobot} />
      </ChatbotButton>
      
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <ChatHeader>
              <ChatTitle>
                <FontAwesomeIcon icon={faRobot} /> Portfolio Assistant
              </ChatTitle>
              <CloseButton onClick={toggleChat}>
                <FontAwesomeIcon icon={faTimes} />
              </CloseButton>
            </ChatHeader>
            
            <ChatMessages>
              {messages.map((message, index) => (
                <React.Fragment key={index}>
                  {message.isError ? (
                    <ErrorMessage>
                      <FontAwesomeIcon icon={faExclamationTriangle} style={{ marginRight: '8px' }} />
                      {message.text}
                      <RetryButton onClick={retryLastMessage}>
                        <FontAwesomeIcon icon={faRedo} /> Try again
                      </RetryButton>
                    </ErrorMessage>
                  ) : (
                    <Message isUser={message.isUser}>
                      {message.text}
                    </Message>
                  )}
                  
                  {message.showSuggestions && !message.isUser && (
                    <SuggestedQuestions>
                      {SUGGESTED_QUESTIONS.map((question, qIndex) => (
                        <SuggestedQuestion
                          key={qIndex}
                          onClick={() => handleSuggestedQuestion(question)}
                        >
                          {question}
                        </SuggestedQuestion>
                      ))}
                    </SuggestedQuestions>
                  )}
                </React.Fragment>
              ))}
              
              {isLoading && (
                <TypingIndicator>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </TypingIndicator>
              )}
              
              <div ref={messagesEndRef} />
            </ChatMessages>
            
            <ChatInput onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Ask me anything..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isLoading}
              />
              <SendButton type="submit" disabled={!inputMessage.trim() || isLoading}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </SendButton>
            </ChatInput>
          </ChatWindow>
        )}
      </AnimatePresence>
    </ChatbotContainer>
  );
};

export default ChatBot; 