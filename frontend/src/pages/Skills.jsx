import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import SkillsList from '../components/SkillsList';
import { getSkillsByCategory } from '../services/api';

const SkillsPageContainer = styled.div`
  padding-top: var(--nav-height);
`;

const SkillsHero = styled.section`
  background: var(--background-dark);
  padding: 100px 0 50px;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  color: var(--text-primary);
`;

const SubTitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
`;

const SkillsContent = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 50px 20px;
`;

const CategorySection = styled.section`
  margin-bottom: 1px;
`;

const CategoryTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 30px;
  position: relative;
  padding-bottom: 10px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: var(--secondary-color);
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: var(--text-secondary);
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: var(--error-color);
`;

const Skills = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkillsByCategory();
        setCategories(data);
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
    <SkillsPageContainer>
      <Helmet>
        <title>Skills | Data & DevOps Engineer</title>
        <meta name="description" content="Explore my technical skills and expertise in various technologies and tools." />
      </Helmet>

      <SkillsHero>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PageTitle>Technical Skills</PageTitle>
          <SubTitle>
            A comprehensive overview of my technical expertise and proficiency in various technologies,
            tools, and frameworks.
          </SubTitle>
        </motion.div>
      </SkillsHero>

      <SkillsContent>
        {loading ? (
          <LoadingMessage>Loading skills...</LoadingMessage>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          categories.map(category => (
            <CategorySection key={category.name}>
              <CategoryTitle>{category.name}</CategoryTitle>
              <SkillsList skills={category.skills} />
            </CategorySection>
          ))
        )}
      </SkillsContent>
    </SkillsPageContainer>
  );
};

export default Skills;