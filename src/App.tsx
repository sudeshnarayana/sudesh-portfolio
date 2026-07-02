import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSkills from './components/AboutSkills';
import Projects from './components/Projects';
import ExperienceTimeline from './components/ExperienceTimeline';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Check local storage or system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    // Apply/remove class on HTML element
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-[#07080d] dark:text-slate-100 transition-colors duration-300 relative">
      {/* Base Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-70 pointer-events-none z-0" />
      
      {/* Navigation */}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Main Content Layout */}
      <main className="relative z-10">
        <Hero />
        <AboutSkills />
        <Projects />
        <ExperienceTimeline />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
