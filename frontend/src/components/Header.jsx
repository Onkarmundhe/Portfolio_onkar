import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ThemeContext';

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: var(--nav-height);
  background-color: ${props => props.isDarkMode 
    ? 'rgba(10, 25, 47, 0.85)' 
    : 'rgba(249, 249, 249, 0.85)'};
  backdrop-filter: blur(10px);
  z-index: 100;
  transition: var(--transition);
  box-shadow: 0 10px 30px -10px rgba(2, 12, 27, 0.7);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
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
  margin: 0 10px;
  color: var(--text-primary);
  font-size: 1rem;
  text-decoration: none;
  transition: var(--transition);
  padding: 8px 15px;
  border: 2px solid transparent;
  border-radius: 8px;
  
  &:hover, &.active {
    color: var(--secondary-color);
    border-color: var(--secondary-color);
    text-decoration: none;
  }
`;

const ThemeButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  
  @media (max-width: 768px) {
    margin-right: 60px;
  }
`;

const ThemeButton = styled.button`
  background: transparent;
  color: var(--text-primary);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  
  &:hover {
    color: var(--secondary-color);
    transform: rotate(12deg);
    border: 2px solid var(--secondary-color);
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
  border: 2px solid transparent;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  
  &:hover {
    border-color: var(--secondary-color);
  }
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
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
  padding: 8px 15px;
  border: 2px solid transparent;
  border-radius: 8px;
  width: 80%;
  text-align: center;
  
  &:hover, &.active {
    color: var(--secondary-color);
    border-color: var(--secondary-color);
    text-decoration: none;
  }
`;

const MobileThemeButton = styled(ThemeButton)`
  margin-top: 20px;
  border: 2px solid transparent;
  
  &:hover {
    border: 2px solid var(--secondary-color);
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
  const { isDarkMode, toggleTheme } = useTheme();
  
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
    <StyledHeader 
      style={{ transform: scrollDirection === 'down' ? 'translateY(-100%)' : 'translateY(0)' }}
      isDarkMode={isDarkMode}
    >
      <Nav>
        <NavLinks>
          <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>Home</NavLink>
          <NavLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</NavLink>
          <NavLink to="/skills" className={location.pathname === '/skills' ? 'active' : ''}>Skills</NavLink>
          <NavLink to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>Projects</NavLink>
          <NavLink to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</NavLink>
        </NavLinks>
        
        <ThemeButtonContainer>
          <ThemeButton onClick={toggleTheme} aria-label="Toggle theme">
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
          </ThemeButton>
        </ThemeButtonContainer>
        
        <MobileMenuButton onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </MobileMenuButton>
        
        <MobileMenu isOpen={isMenuOpen}>
          <MobileNavLink to="/" className={location.pathname === '/' ? 'active' : ''}>Home</MobileNavLink>
          <MobileNavLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</MobileNavLink>
          <MobileNavLink to="/skills" className={location.pathname === '/skills' ? 'active' : ''}>Skills</MobileNavLink>
          <MobileNavLink to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>Projects</MobileNavLink>
          <MobileNavLink to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</MobileNavLink>
          <MobileThemeButton onClick={toggleTheme} aria-label="Toggle theme">
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
          </MobileThemeButton>
        </MobileMenu>
        
        <Overlay isOpen={isMenuOpen} onClick={toggleMenu} />
      </Nav>
    </StyledHeader>
  );
};

export default Header; 