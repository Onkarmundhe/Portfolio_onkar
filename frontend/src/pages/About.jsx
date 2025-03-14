import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import SkillsList from '../components/SkillsList';
import { getSkillsByCategory } from '../services/api';

const AboutContainer = styled.div`
  padding-top: var(--nav-height);
`;

const AboutSection = styled.section`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 100px 20px;
`;

const PageTitle = styled.h1`
  position: relative;
  margin-bottom: 50px;
  padding-bottom: 10px;
  font-size: 2.5rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 70px;
    height: 3px;
    background-color: var(--secondary-color);
  }
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 50px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AboutText = styled.div`
  p {
    margin-bottom: 20px;
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

const AboutImage = styled.div`
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

const SkillsSection = styled.section`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 50px 20px 100px;
`;

const SectionTitle = styled.h2`
  position: relative;
  margin-bottom: 50px;
  padding-bottom: 10px;
  font-size: 2rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 70px;
    height: 3px;
    background-color: var(--secondary-color);
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: var(--text-secondary);
`;

const ErrorMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #ff5252;
`;

const About = () => {
  const [skillsByCategory, setSkillsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkillsByCategory();
        setSkillsByCategory(data);
      } catch (error) {
        console.error('Error fetching skills:', error);
        setError('Failed to load skills. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSkills();
  }, []);
  
  return (
    <AboutContainer>
      <Helmet>
        <title>About | Data & DevOps Engineer</title>
        <meta name="description" content="Learn more about my background, skills, and experience as a Data and DevOps Engineer." />
      </Helmet>
      
      <AboutSection>
        <PageTitle>About Me</PageTitle>
        
        <AboutContent>
          <AboutText>
            <p>
              Hello! I'm a Data and DevOps Intern at Predusk Technology Pvt. Ltd. and a final year student at IIT Goa. 
              I'm passionate about building efficient data pipelines, implementing DevOps practices, and creating 
              cloud infrastructure solutions.
            </p>
            <p>
              My journey in technology began during my undergraduate studies where I developed a strong foundation in 
              computer science, mathematics, and data analysis. Since then, I've been focused on bridging the gap between 
              data engineering and operations, creating scalable and reliable systems.
            </p>
            <p>
              At Predusk Technology, I've had the opportunity to work on various projects involving data processing, 
              cloud infrastructure, and automation. I enjoy solving complex problems and continuously learning new 
              technologies to improve my skills.
            </p>
            <p>
              When I'm not coding or deploying infrastructure, you can find me exploring new technologies, contributing 
              to open-source projects, or sharing knowledge with the community.
            </p>
          </AboutText>
          
          <AboutImage>
            <div className="wrapper">
              <img src="/assets/my_image.jpg" alt="Profile" />
            </div>
          </AboutImage>
        </AboutContent>
      </AboutSection>
      
      <SkillsSection>
        <SectionTitle>Skills</SectionTitle>
        
        {loading ? (
          <LoadingMessage>Loading skills...</LoadingMessage>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <SkillsList skillsByCategory={skillsByCategory} />
        )}
      </SkillsSection>
    </AboutContainer>
  );
};

export default About;