import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import ContactForm from '../components/ContactForm';

const ContactContainer = styled.div`
  padding-top: var(--nav-height);
`;

const ContactSection = styled.section`
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

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  p {
    margin-bottom: 30px;
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

const ContactMethods = styled.div`
  margin-top: 40px;
`;

const ContactMethod = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-right: 15px;
    color: var(--secondary-color);
    font-size: 1.2rem;
  }
  
  .details {
    h4 {
      margin: 0 0 5px 0;
      font-size: 1.1rem;
    }
    
    p, a {
      margin: 0;
      font-size: 1rem;
      color: var(--text-secondary);
    }
    
    a:hover {
      color: var(--secondary-color);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  margin-top: 40px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 15px;
  color: var(--text-primary);
  font-size: 1.5rem;
  transition: var(--transition);
  
  &:hover {
    color: var(--secondary-color);
    transform: translateY(-3px);
  }
`;

const Contact = () => {
  return (
    <ContactContainer>
      <Helmet>
        <title>Contact | Data & DevOps Engineer</title>
        <meta name="description" content="Get in touch with me for collaboration, job opportunities, or just to say hello." />
      </Helmet>
      
      <ContactSection>
        <PageTitle>Contact</PageTitle>
        
        <ContactContent>
          <ContactInfo>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p>
                I'm always open to connecting with tech enthusiasts and professionals in the data science and DevOps space.  
                Whether you have a questions about my work, want to collaborate on a project, or just want to say hi, Feel free to reach out, and  
                I'll do my best to get back to you!
              </p>
              
              <ContactMethods>
                <ContactMethod>
                  <div className="icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <div className="details">
                    <h4>Email</h4>
                    <a href="mailto:onkarmundhe995@gmail.com">onkarmundhe995@gmail.com</a>
                  </div>
                </ContactMethod>
                
                <ContactMethod>
                  <div className="icon">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </div>
                  <div className="details">
                    <h4>Location</h4>
                    <p>Pune, India</p>
                  </div>
                </ContactMethod>
              </ContactMethods>
              
              <SocialLinks>
                <SocialLink href="https://www.linkedin.com/in/onkar-mundhe-b8214124a/" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} />
                </SocialLink>
                <SocialLink href="https://github.com/Onkarmundhe" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGithub} />
                </SocialLink>
                <SocialLink href="https://x.com/onkar_mundhe?t=eqI4BhxheCihDLTdckN11A&s=09" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTwitter} />
                </SocialLink>
              </SocialLinks>
            </motion.div>
          </ContactInfo>
          
          <ContactForm />
        </ContactContent>
      </ContactSection>
    </ContactContainer>
  );
};

export default Contact; 