import React, { useEffect } from 'react';
import './styles/portfolio.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Work from './components/Work';
import TechStack from './components/TechStack';
import Connect from './components/Connect';
import Footer from './components/Footer';
import BackgroundMesh from './components/BackgroundMesh';

function App() {
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }, []);

  return (
    <div className="App">
      <BackgroundMesh />
      <Navbar />
      <Hero />
      <Work />
      <TechStack />
      <Connect />
      <Footer />
    </div>
  );
}

export default App;