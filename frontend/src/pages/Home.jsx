import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import ProjectCard from '../components/ProjectCard';
import { getFeaturedProjects } from '../services/api';

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
  max-width: 800px;
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
  background-color: var(--accent-color);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--accent-hover);
    transform: translateY(-2px);
  }
`;

const FeaturedSection = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60%;
    height: 3px;
    background-color: var(--accent-color);
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: var(--text-secondary);
`;

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const data = await getFeaturedProjects();
        setFeaturedProjects(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured projects:', error);
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  return (
    <HomeContainer>
      <Helmet>
        <title>Portfolio | Home</title>
        <meta name="description" content="Welcome to my portfolio website showcasing my work as a Data and DevOps Intern" />
      </Helmet>

      <HeroSection>
        <HeroContent>
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
            Final year student at IIT Goa with experience in data analysis, machine learning, and DevOps practices. 
            Currently working at Predusk Technology Pvt. Ltd., where I develop and maintain data pipelines and infrastructure.
          </Description>
          <CTAButton
            href="/contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </CTAButton>
        </HeroContent>
      </HeroSection>

      {/* <FeaturedSection>
        <SectionTitle>Featured Projects</SectionTitle>
        {loading ? (
          <LoadingMessage>Loading featured projects...</LoadingMessage>
        ) : (
          <ProjectsGrid>
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </ProjectsGrid>
        )}
      </FeaturedSection> */}
    </HomeContainer>
  );
};

export default Home;