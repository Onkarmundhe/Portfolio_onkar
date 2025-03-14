import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import ProjectCard from '../components/ProjectCard';
import { getProjects } from '../services/api';

const ProjectsContainer = styled.div`
  padding-top: var(--nav-height);
`;

const ProjectsSection = styled.section`
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: var(--text-secondary);
`;

const ErrorMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #ff5252;
`;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  return (
    <ProjectsContainer>
      <Helmet>
        <title>Projects | Data & DevOps Engineer</title>
        <meta name="description" content="Explore my portfolio of data and DevOps projects." />
      </Helmet>
      
      <ProjectsSection>
        <PageTitle>Projects</PageTitle>
        
        {loading ? (
          <LoadingMessage>Loading projects...</LoadingMessage>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <ProjectsGrid>
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </ProjectsGrid>
        )}
      </ProjectsSection>
    </ProjectsContainer>
  );
};

export default Projects; 