import React, { useState } from 'react';
import {HomePage} from './pages/HomePage';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark-mode');
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <Navbar onThemeToggle={toggleTheme} />
      <main className="app__content">
        <HomePage />
      </main>
    </div>
  );
}

export default App;
