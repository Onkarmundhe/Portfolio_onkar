import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

const Card = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 320px;
  padding: 25px;
  border-radius: var(--border-radius);
  background-color: var(--background-light);
  box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-7px);
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
`;

const ProjectTitle = styled.h3`
  margin: 0;
  color: var(--text-primary);
  font-size: 1.5rem;
`;

const ProjectLinks = styled.div`
  display: flex;
`;

const ProjectLink = styled.a`
  margin-left: 15px;
  color: var(--text-primary);
  font-size: 1.2rem;
  transition: var(--transition);
  
  &:hover {
    color: var(--secondary-color);
  }
`;

const ProjectDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const TechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: auto;
  padding: 0;
  list-style: none;
`;

const TechItem = styled.li`
  margin-right: 15px;
  margin-bottom: 5px;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  white-space: nowrap;
  
  &:before {
    content: '▹';
    margin-right: 5px;
    color: var(--secondary-color);
  }
`;

const ProjectImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  opacity: 0.07;
  z-index: 0;
`;

const ProjectContent = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ProjectDate = styled.div`
  font-size: 0.85rem;
  color: var(--secondary-color);
  margin-bottom: 10px;
  font-family: var(--font-mono);
`;

const ProjectCard = ({ project }) => {
  const {
    title,
    description,
    image_url,
    project_url,
    github_url,
    tech_stack,
    start_date,
    end_date,
  } = project;
  
  // Format date range
  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  
  const dateRange = `${formatDate(start_date)} - ${formatDate(end_date)}`;
  
  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {image_url && <ProjectImage src={image_url} />}
      
      <ProjectContent>
        <ProjectHeader>
          <ProjectTitle>{title}</ProjectTitle>
          <ProjectLinks>
            {github_url && (
              <ProjectLink href={github_url} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} />
              </ProjectLink>
            )}
            {project_url && (
              <ProjectLink href={project_url} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </ProjectLink>
            )}
          </ProjectLinks>
        </ProjectHeader>
        
        <ProjectDate>{dateRange}</ProjectDate>
        <ProjectDescription>{description}</ProjectDescription>
        
        <TechList>
          {tech_stack.map((tech, index) => (
            <TechItem key={index}>{tech}</TechItem>
          ))}
        </TechList>
      </ProjectContent>
    </Card>
  );
};

export default ProjectCard; 