import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const ToggleButton = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.isDarkMode 
    ? 'var(--primary-light)' 
    : 'var(--primary-dark)'};
  color: ${props => props.isDarkMode 
    ? 'var(--text-primary-dark)' 
    : 'var(--text-primary-light)'};
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.25);
  }
  
  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
  }
`;

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <ToggleButton
      isDarkMode={isDarkMode}
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
    </ToggleButton>
  );
};

export default ThemeToggle; 