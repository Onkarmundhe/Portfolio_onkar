import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faCheck, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const FormContainer = styled(motion.form)`
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 2.5rem;
  background: var(--background-light);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const FormTitle = styled.h2`
  color: var(--text-primary);
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
`;

const FormGroup = styled(motion.div)`
  margin-bottom: 1.8rem;
  position: relative;
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.3s ease;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid var(--text-secondary);
  border-radius: 8px;
  background: var(--background-dark);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--secondary-color);
    box-shadow: 0 0 0 3px rgba(100, 255, 218, 0.1);
  }

  &:hover {
    border-color: var(--secondary-color);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1.2rem;
  border: 2px solid var(--text-secondary);
  border-radius: 12px;
  background: var(--background-dark);
  color: var(--text-primary);
  font-size: 1.1rem;
  min-height: 100px;
  max-height: 200px;
  resize: vertical;
  transition: all 0.3s ease;
  line-height: 1.6;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: var(--secondary-color);
    box-shadow: 0 0 0 3px rgba(100, 255, 218, 0.1);
  }

  &:hover {
    border-color: var(--secondary-color);
  }

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.7;
  }
`;

const SubmitButton = styled(motion.button)`
  background-color: var(--secondary-color);
  color: var(--background-dark);
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(100, 255, 218, 0.2);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const Message = styled(motion.div)`
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  ${props => props.success ? `
    background-color: rgba(0, 255, 0, 0.1);
    color: #00ff00;
    border: 1px solid rgba(0, 255, 0, 0.2);
  ` : props.error ? `
    background-color: rgba(255, 0, 0, 0.1);
    color: #ff0000;
    border: 1px solid rgba(255, 0, 0, 0.2);
  ` : ''}
`;

const InputIcon = styled(motion.div)`
  position: absolute;
  right: 1rem;
  top: 2.5rem;
  color: var(--secondary-color);
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/contact/submit`, formData);
      setStatus({
        type: 'success',
        message: 'Message sent successfully! I will get back to you soon.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <FormContainer
      onSubmit={handleSubmit}
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <FormTitle>Get in Touch</FormTitle>
      
      <FormGroup variants={itemVariants}>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField(null)}
          required
        />
        <AnimatePresence>
          {focusedField === 'name' && formData.name && (
            <InputIcon
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <FontAwesomeIcon icon={faCheck} />
            </InputIcon>
          )}
        </AnimatePresence>
      </FormGroup>

      <FormGroup variants={itemVariants}>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          required
        />
        <AnimatePresence>
          {focusedField === 'email' && formData.email && (
            <InputIcon
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <FontAwesomeIcon icon={faCheck} />
            </InputIcon>
          )}
        </AnimatePresence>
      </FormGroup>

      <FormGroup variants={itemVariants}>
        <Label htmlFor="subject">Subject</Label>
        <Input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          onFocus={() => setFocusedField('subject')}
          onBlur={() => setFocusedField(null)}
          required
        />
        <AnimatePresence>
          {focusedField === 'subject' && formData.subject && (
            <InputIcon
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <FontAwesomeIcon icon={faCheck} />
            </InputIcon>
          )}
        </AnimatePresence>
      </FormGroup>

      <FormGroup variants={itemVariants}>
        <Label htmlFor="message">Message</Label>
        <TextArea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onFocus={() => setFocusedField('message')}
          onBlur={() => setFocusedField(null)}
          required
          placeholder="Write your message here..."
        />
        <AnimatePresence>
          {focusedField === 'message' && formData.message && (
            <InputIcon
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <FontAwesomeIcon icon={faCheck} />
            </InputIcon>
          )}
        </AnimatePresence>
      </FormGroup>

      <SubmitButton
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? (
          'Sending...'
        ) : (
          <>
            <FontAwesomeIcon icon={faPaperPlane} />
            Send Message
          </>
        )}
      </SubmitButton>

      <AnimatePresence>
        {status.message && (
          <Message
            success={status.type === 'success'}
            error={status.type === 'error'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <FontAwesomeIcon 
              icon={status.type === 'success' ? faCheck : faExclamationCircle} 
            />
            {status.message}
          </Message>
        )}
      </AnimatePresence>
    </FormContainer>
  );
};

export default ContactForm; 