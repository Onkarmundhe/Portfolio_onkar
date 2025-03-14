import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: var(--nav-height);
  background-color: rgba(10, 25, 47, 0.85);
  backdrop-filter: blur(10px);
  z-index: 100;
  transition: var(--transition);
  box-shadow: 0 10px 30px -10px rgba(2, 12, 27, 0.7);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 30px;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  margin: 0 15px;
  color: var(--text-primary);
  font-size: 1rem;
  text-decoration: none;
  transition: var(--transition);
  
  &:hover, &.active {
    color: var(--secondary-color);
    text-decoration: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  color: var(--secondary-color);
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 11;
  position: absolute;
  right: 20px;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 75%;
  max-width: 300px;
  height: 100vh;
  padding: 100px 20px;
  background-color: var(--background-light);
  box-shadow: -10px 0px 30px -15px rgba(2, 12, 27, 0.7);
  z-index: 10;
  transform: translateX(${props => (props.isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNavLink = styled(Link)`
  margin: 15px 0;
  color: var(--text-primary);
  font-size: 1.2rem;
  text-decoration: none;
  transition: var(--transition);
  
  &:hover, &.active {
    color: var(--secondary-color);
    text-decoration: none;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9;
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('none');
  const [prevScrollY, setPrevScrollY] = useState(0);
  const location = useLocation();
  
  // Handle scroll direction for hiding/showing header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > prevScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      setPrevScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollY]);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent body scrolling when menu is open
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };
  
  return (
    <StyledHeader style={{ transform: scrollDirection === 'down' ? 'translateY(-100%)' : 'translateY(0)' }}>
      <Nav>
        <NavLinks>
          <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>Home</NavLink>
          <NavLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</NavLink>
          <NavLink to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>Projects</NavLink>
          <NavLink to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</NavLink>
        </NavLinks>
        
        <MobileMenuButton onClick={toggleMenu}>
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </MobileMenuButton>
        
        <MobileMenu isOpen={isMenuOpen}>
          <MobileNavLink to="/" className={location.pathname === '/' ? 'active' : ''}>Home</MobileNavLink>
          <MobileNavLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</MobileNavLink>
          <MobileNavLink to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>Projects</MobileNavLink>
          <MobileNavLink to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</MobileNavLink>
        </MobileMenu>
        
        <Overlay isOpen={isMenuOpen} onClick={toggleMenu} />
      </Nav>
    </StyledHeader>
  );
};

export default Header; 