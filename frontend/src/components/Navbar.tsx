import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Terminal } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About & Skills', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Timeline', id: 'timeline' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Background blur transition on scroll
      setScrolled(window.scrollY > 20);

      // Active section detection
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-4 glass-panel shadow-lg' 
        : 'py-6 bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => scrollTo('home')} 
          className="flex items-center space-x-2 cursor-pointer group"
        >
          <div className="p-2 rounded-xl bg-violet-600/10 dark:bg-violet-400/10 group-hover:bg-violet-600 group-hover:text-white dark:group-hover:bg-violet-500 transition-all duration-300">
            <Terminal className="w-5 h-5 text-violet-600 dark:text-violet-400 group-hover:text-white transition-colors duration-300" />
          </div>
          <span className="font-heading font-extrabold text-xl tracking-tight bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
            sudesh.dev
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeSection === item.id
                  ? 'bg-violet-600/10 text-violet-600 dark:bg-violet-400/10 dark:text-violet-400'
                  : 'text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2" />

          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all duration-300"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Nav Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all duration-300"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all duration-300"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`md:hidden absolute top-full left-0 right-0 glass-panel shadow-xl transition-all duration-300 border-t border-slate-200/50 dark:border-slate-800/50 overflow-hidden ${
        isOpen ? 'max-h-80 opacity-100 visible' : 'max-h-0 opacity-0 invisible'
      }`}>
        <div className="px-6 py-4 flex flex-col space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                activeSection === item.id
                  ? 'bg-violet-600/10 text-violet-600 dark:bg-violet-400/10 dark:text-violet-400'
                  : 'text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
