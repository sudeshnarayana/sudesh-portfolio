import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Filter, Code, Terminal, CheckCircle } from 'lucide-react';

const GithubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Project {
  title: string;
  category: 'web' | 'automation' | 'system';
  description: string;
  details: string[];
  tech: string[];
  github: string;
  demo?: string;
  highlights: string[];
}

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'web' | 'automation' | 'system'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projectsData: Project[] = [
    {
      title: 'Smart Campus Hub',
      category: 'web',
      description: 'A full-stack operational hub for digital campus authentication and role-based user notification updates.',
      details: [
        'Implemented Spring Security (OAuth2/JWT) for granular RBAC validation.',
        'Created a responsive React UI with custom polling endpoints and optimistic notifications.',
        'Structured automated CI/CD unit tests checking database persistence and API latency.'
      ],
      tech: ['React', 'Spring Boot', 'MongoDB', 'OAuth2', 'Tailwind CSS'],
      github: 'https://github.com',
      demo: 'https://example.com',
      highlights: ['JWT Auth', 'Realtime Polling', 'Optimistic UI']
    },
    {
      title: 'Uni Assistant Task Manager',
      category: 'system',
      description: 'Task board client with date constraints, field limits, and structured branch hooks for team tasks syncing.',
      details: [
        'Added dynamic validation blocking selection of past calendar dates.',
        'Set up strict character validation alerts on card descriptions.',
        'Interfaced with shell Git workflows to automate commits directly to active workspace branches.'
      ],
      tech: ['React', 'TypeScript', 'Git Hooks', 'Tailwind CSS', 'Vite'],
      github: 'https://github.com',
      highlights: ['TypeScript', 'Form Validation', 'Git Workflow']
    },
    {
      title: 'Singlish Chat Translator Verifier',
      category: 'automation',
      description: 'Automated test suite verifying NLP transliteration translation rules across 24 negative text input groups.',
      details: [
        'Scripted Playwright automated suites running 50+ localized transliteration tests.',
        'Configured spreadsheet data pipelines formatting outputs dynamically with IT Registration IDs.',
        'Automated report packaging for build verifications.'
      ],
      tech: ['Playwright', 'Node.js', 'Excel Automation', 'NLP Testing'],
      github: 'https://github.com',
      demo: 'https://example.com',
      highlights: ['50+ Test Cases', 'E2E Testing', 'Regex Matching']
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-1/10 w-96 h-96 bg-fuchsia-500/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/10 w-96 h-96 bg-violet-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-violet-600 dark:bg-violet-400 mx-auto rounded-full mb-4" />
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            A selection of academic assignments, automations, and architectural systems.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex justify-center mb-12 flex-wrap gap-2">
          {(['all', 'web', 'system', 'automation'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-300 capitalize cursor-pointer ${
                filter === cat
                  ? 'bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-600/20'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900/60'
              }`}
            >
              {cat === 'all' && <Filter className="w-4 h-4" />}
              {cat === 'web' && <Code className="w-4 h-4" />}
              {cat === 'system' && <Terminal className="w-4 h-4" />}
              {cat === 'automation' && <CheckCircle className="w-4 h-4" />}
              <span>{cat} Projects</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-panel rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800/80 text-left flex flex-col justify-between h-[420px] hover:shadow-xl dark:hover:border-violet-500/30 group transition-all duration-300 hover:scale-[1.01] glow-primary"
              >
                <div className="space-y-4">
                  {/* Category and badges */}
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-600/10 text-violet-600 dark:bg-violet-400/10 dark:text-violet-400 capitalize">
                      {project.category}
                    </span>
                    <div className="flex space-x-2">
                      {project.highlights.slice(0, 2).map((badge) => (
                        <span key={badge} className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border border-slate-200/40 dark:border-slate-800/40">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/80 flex items-center justify-between">
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 flex items-center space-x-1 cursor-pointer"
                  >
                    <span>View Architecture</span>
                    <ArrowRightIcon />
                  </button>

                  <div className="flex items-center space-x-3">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-all duration-300 flex items-center justify-center"
                    >
                      <GithubIcon />
                    </a>
                    {project.demo && (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-all duration-300 flex items-center justify-center"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Architecture Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="relative w-full max-w-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl z-10 text-left max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-600/10 text-violet-600 dark:bg-violet-400/10 dark:text-violet-400 capitalize">
                      {selectedProject.category}
                    </span>
                    <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mt-2">
                      {selectedProject.title}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-all duration-300 cursor-pointer"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider mb-2">Project Overview</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider mb-3">Key Implementations</h4>
                    <ul className="space-y-3">
                      {selectedProject.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start space-x-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider mb-3">Tech Specifications</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t) => (
                        <span key={t} className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800/50">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end space-x-3">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-900/80 dark:text-slate-300 transition-all duration-300 flex items-center justify-center"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span className="ml-2">Source Code</span>
                  </a>
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 transition-all duration-300 shadow-md shadow-violet-600/20"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Preview</span>
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ArrowRightIcon() {
  return (
    <svg 
      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}
