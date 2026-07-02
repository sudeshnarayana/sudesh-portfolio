import { ArrowUp, Mail } from 'lucide-react';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="py-12 border-t border-slate-200/50 dark:border-slate-800/50 relative overflow-hidden bg-slate-50/50 dark:bg-[#07080d]/40">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left Side */}
        <div className="text-center md:text-left space-y-1">
          <span className="font-heading font-extrabold text-lg tracking-tight bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
            sudesh.dev
          </span>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Sudesh. All rights reserved.
          </p>
        </div>

        {/* Center / Social links */}
        <div className="flex items-center space-x-4">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white hover:bg-violet-600 hover:text-white dark:bg-slate-900 dark:hover:bg-violet-500 text-slate-500 dark:text-slate-400 dark:hover:text-white border border-slate-200/60 dark:border-slate-850/60 transition-all duration-300 shadow-sm flex items-center justify-center"
            aria-label="GitHub Profile"
          >
            <GithubIcon />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white hover:bg-violet-600 hover:text-white dark:bg-slate-900 dark:hover:bg-violet-500 text-slate-500 dark:text-slate-400 dark:hover:text-white border border-slate-200/60 dark:border-slate-850/60 transition-all duration-300 shadow-sm flex items-center justify-center"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon />
          </a>
          <a 
            href="mailto:sudesh@example.com"
            className="p-2.5 rounded-xl bg-white hover:bg-violet-600 hover:text-white dark:bg-slate-900 dark:hover:bg-violet-500 text-slate-500 dark:text-slate-400 dark:hover:text-white border border-slate-200/60 dark:border-slate-850/60 transition-all duration-300 shadow-sm"
            aria-label="Send Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right Side / Back to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:text-violet-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:text-violet-400 transition-all duration-300 shadow-sm hover:shadow cursor-pointer"
          aria-label="Back to Top"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}
