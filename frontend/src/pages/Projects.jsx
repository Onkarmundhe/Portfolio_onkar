import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
  padding-bottom: 15px;
  font-size: 2.8rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100px;
    height: 4px;
    background: linear-gradient(to right, var(--secondary-color), transparent);
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 35px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.3rem;
  color: var(--text-secondary);
  padding: 50px 0;
  animation: pulse 1.5s infinite;
  
  @keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
`;

const ErrorMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #ff5252;
  background-color: rgba(255, 82, 82, 0.1);
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #ff5252;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 40px;
  gap: 15px;
`;

const FilterButton = styled.button`
  background-color: ${props => props.active ? 'var(--secondary-color)' : 'transparent'};
  color: ${props => props.active ? 'var(--background-dark)' : 'var(--text-primary)'};
  border: 2px solid ${props => props.active ? 'var(--secondary-color)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 30px;
  padding: 8px 20px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    border-color: var(--secondary-color);
    box-shadow: 0 4px 12px rgba(100, 255, 218, 0.15);
  }
`;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  
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
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => 
        project.tech_stack && project.tech_stack.includes(filter)
      );
  
  const uniqueTags = ['all', ...new Set(
    projects.flatMap(project => project.tech_stack || [])
  )];
  
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
          <>
            <FilterContainer>
              {uniqueTags.map(tag => (
                <FilterButton 
                  key={tag}
                  active={filter === tag}
                  onClick={() => setFilter(tag)}
                >
                  {tag}
                </FilterButton>
              ))}
            </FilterContainer>
          
            <ProjectsGrid>
              {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </ProjectsGrid>
          </>
        )}
      </ProjectsSection>
    </ProjectsContainer>
  );
};

export default Projects; 