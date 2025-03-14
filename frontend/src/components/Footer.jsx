import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

const StyledFooter = styled.footer`
  padding: 40px 0;
  background-color: var(--primary-color);
  border-top: 1px solid var(--background-light);
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 20px;
`;

const SocialLinks = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin: 0 10px;
  color: var(--text-primary);
  font-size: 1.5rem;
  transition: var(--transition);
  
  &:hover {
    color: var(--secondary-color);
    transform: translateY(-3px);
  }
`;

const Copyright = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  text-align: center;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <StyledFooter>
      <FooterContent>
        <SocialLinks>
          <SocialLink href="https://github.com/Onkarmundhe" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} />
          </SocialLink>
          <SocialLink href="https://www.linkedin.com/in/onkar-mundhe-b8214124a/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </SocialLink>
          <SocialLink href="https://x.com/onkar_mundhe?t=eqI4BhxheCihDLTdckN11A&s=09" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </SocialLink>
        </SocialLinks>
        
        <Copyright>
          &copy; {currentYear} | Designed & Built by Data & DevOps Engineer
        </Copyright>
      </FooterContent>
    </StyledFooter>
  );
};

export default Footer; 