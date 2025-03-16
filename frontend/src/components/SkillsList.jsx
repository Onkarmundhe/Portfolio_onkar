import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SkillsContainer = styled.div`
  margin-bottom: 1px;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: var(--background-light);
  border-radius: var(--border-radius);
  box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const SkillHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const SkillIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 15px;
  color: var(--secondary-color);
  font-size: 1.5rem;
`;

const SkillName = styled.h4`
  margin: 0;
  color: var(--text-primary);
  font-size: 1.2rem;
`;

const SkillDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 15px;
`;

const ProficiencyBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: var(--background-dark);
  border-radius: 3px;
  overflow: hidden;
  margin-top: auto;
`;

const ProficiencyFill = styled.div`
  height: 100%;
  background-color: var(--secondary-color);
  width: ${props => (props.level / 5) * 100}%;
`;

const SkillsList = ({ skills }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Ensure skills is an array and not null/undefined
  if (!Array.isArray(skills)) {
    return null;
  }
  
  return (
    <SkillsGrid
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {skills.map(skill => (
        <SkillCard key={skill.id} variants={itemVariants}>
          <SkillHeader>
            <SkillIcon>
              <i className={skill.icon || 'fas fa-code'}></i>
            </SkillIcon>
            <SkillName>{skill.name}</SkillName>
          </SkillHeader>
          <SkillDescription>{skill.description || 'No description available'}</SkillDescription>
          <ProficiencyBar>
            <ProficiencyFill level={skill.proficiency || 0} />
          </ProficiencyBar>
        </SkillCard>
      ))}
    </SkillsGrid>
  );
};

export default SkillsList; 