import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

// Styled Components
const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 80vh;
  margin-bottom: 4rem;
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 50px;
  max-width: 1000px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TextContent = styled.div`
  max-width: 600px;
`;

const ProfileImage = styled.div`
  position: relative;
  margin-top: -20px;
  
  @media (max-width: 768px) {
    margin: 20px auto 0;
    width: 70%;
    max-width: 200px;
  }
  
  @media (max-width: 480px) {
    width: 80%;
  }
  
  .wrapper {
    position: relative;
    width: 100%;
    padding-top: 100%;
    overflow: hidden;
    border-radius: 50%;
  }
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const Greeting = styled(motion.h3)`
  font-size: 1.5rem;
  color: var(--accent-color);
  margin-bottom: 1rem;
  font-weight: 500;
`;

const Name = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 1rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--text-secondary);
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 600px;
  color: var(--text-secondary);
`;

const CTAButton = styled(motion.a)`
  display: inline-block;
  background-color: transparent;
  color: var(--accent-color);
  padding: 0.8rem 1.8rem;
  font-size: 1.1rem;
  border: 2px solid var(--accent-color);
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: var(--accent-color);
    transition: all 0.4s cubic-bezier(0.42, 0, 0.58, 1);
    z-index: -1;
  }
  
  &:hover {
    color: ${props => props.theme === 'light' ? 'white' : 'var(--primary-color)'};
    transform: translateY(-5px);
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.15);
    
    &:before {
      width: 100%;
    }
  }
  
  &:active {
    transform: translateY(-2px);
  }
`;

const Home = () => {
  // Get the current theme from data-theme attribute
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  
  return (
    <HomeContainer>
      <Helmet>
        <title>Portfolio | Home</title>
        <meta name="description" content="Welcome to my portfolio website showcasing my work as a Data and DevOps Intern" />
      </Helmet>

      <HeroSection>
        <HeroContent>
          <TextContent>
            <Greeting
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Hello, I'm
            </Greeting>
            <Name
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Onkar Arjun Mundhe
            </Name>
            <Subtitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Data and DevOps Intern
            </Subtitle>
            <Description
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              I'm a final year student at the Indian Institute of Technology Goa. 
              Currently, I'm applying my skills as a Data and DevOps Intern at Process Venue, where I get to build and maintain data pipelines and work with AI agents.
            </Description>
            <CTAButton
              href="/contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              theme={currentTheme}
            >
              Get in Touch
            </CTAButton>
          </TextContent>
          
          <ProfileImage>
            <motion.div 
              className="wrapper"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img src="/assets/my_image.jpg" alt="Profile" />
            </motion.div>
          </ProfileImage>
        </HeroContent>
      </HeroSection>
    </HomeContainer>
  );
};

export default Home;