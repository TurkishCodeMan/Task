import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

interface NavbarProps {
  onThemeToggle?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onThemeToggle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__content">
        <div className="navbar__left">
          <div className="navbar__logo">
            <span className="navbar__logo-icon">📰</span>
            <h1 className="navbar__title">NewsTracker</h1>
          </div>
        </div>

        <div className="navbar__center">
          <div className="navbar__time">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        <div className="navbar__right">
          <button className="navbar__theme-toggle" onClick={onThemeToggle}>
            <span className="navbar__theme-icon">🌓</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
