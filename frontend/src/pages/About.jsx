import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

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
  display: block;
  max-width: 800px;
`;

const AboutText = styled.div`
  p {
    margin-bottom: 20px;
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

const About = () => {
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
              Hello! I'm a Data and DevOps Intern at Process Venue and a final year student at IIT Goa. 
              I'm passionate about building efficient data pipelines and implementing DevOps practices 
              that make systems run smoothly.
            </p>
            <p>
              My journey in technology began during my undergraduate studies where I developed a strong foundation in 
              computer science, mathematics, and data analysis. Since then, I've been focused on bringing together data engineering  
              principles with practical implementation, creating scalable and reliable systems.
            </p>
            <p>
              At Process Venue, I've had the opportunity to work on various projects  that challenge me to think 
              creatively and solve complex problems. I'm particularly involved in the implementation of AI agents, 
              where I design and develop intelligent systems that enhance our data processing capabilities. I'm constantly
              learning and growing in this field, finding new ways to improve processes and enhance performance.
            </p>
  
          </AboutText>
        </AboutContent>
      </AboutSection>
    </AboutContainer>
  );
};

export default About;