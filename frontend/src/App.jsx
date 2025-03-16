import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Context
import { ThemeProvider } from './context/ThemeContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

// Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Skills from './pages/Skills';
import Contact from './pages/Contact';

function App() {
  return (
    <ThemeProvider>
      <Helmet>
        <title>Portfolio | Data & DevOps Engineer</title>
        <meta name="description" content="Portfolio of a Data and DevOps Intern at Predusk Technology Pvt. Ltd. and final year student at IIT Goa." />
      </Helmet>
      
      <Header />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      
      <Footer />
      
      {/* AI Chatbot for answering profile-related queries */}
      <ChatBot />
    </ThemeProvider>
  );
}

export default App; 