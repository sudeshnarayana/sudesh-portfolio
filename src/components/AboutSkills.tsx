import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Code, Award, Server, Database, Sparkles, Terminal } from 'lucide-react';

export default function AboutSkills() {
  const [activeTab, setActiveTab] = useState<'profile' | 'skills' | 'certs'>('skills');

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Code className="w-5 h-5 text-violet-600 dark:text-violet-400" />,
      skills: [
        { name: 'React / React Native', level: 90 },
        { name: 'TypeScript / JavaScript', level: 85 },
        { name: 'Tailwind CSS / CSS3', level: 95 },
        { name: 'Playwright (E2E Testing)', level: 80 },
        { name: 'Next.js', level: 75 },
      ]
    },
    {
      title: 'Backend & Databases',
      icon: <Server className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" />,
      skills: [
        { name: 'Node.js / Express', level: 85 },
        { name: 'Java (Spring Boot / Security)', level: 80 },
        { name: 'Python (Data Scripts / Flask)', level: 75 },
        { name: 'PostgreSQL / SQL', level: 80 },
        { name: 'MongoDB', level: 85 },
      ]
    },
    {
      title: 'DevOps & Systems',
      icon: <Database className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
      skills: [
        { name: 'Git / GitHub Workflows', level: 90 },
        { name: 'AWS (S3, EC2, RDS)', level: 75 },
        { name: 'Docker / Containers', level: 70 },
        { name: 'Linux / Shell Scripting', level: 75 },
        { name: 'Agile (Scrum / Jira)', level: 85 },
      ]
    }
  ];

  const certifications = [
    {
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2025',
      id: 'AWS-CCP-12345',
      color: 'from-amber-500/20 to-orange-600/20 text-orange-600 dark:text-orange-400 border-orange-500/30'
    },
    {
      title: 'Meta Front-End Developer Professional',
      issuer: 'Meta / Coursera',
      date: '2024',
      id: 'META-FED-876',
      color: 'from-blue-500/20 to-indigo-600/20 text-blue-600 dark:text-blue-400 border-blue-500/30'
    },
    {
      title: 'Oracle Certified Associate, Java SE 8',
      issuer: 'Oracle',
      date: '2024',
      id: 'OCAJP-901',
      color: 'from-red-500/20 to-rose-600/20 text-rose-600 dark:text-rose-400 border-rose-500/30'
    }
  ];

  return (
    <section id="about" className="py-24 bg-slate-50/50 dark:bg-[#07080d]/40 relative overflow-hidden">
      {/* Background Grids */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white mb-4">
            About Me & Skills
          </h2>
          <div className="w-16 h-1 bg-violet-600 dark:bg-violet-400 mx-auto rounded-full mb-4" />
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Bridging the gap between software specifications and high-performance engineering.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-12">
          <div className="flex p-1.5 rounded-2xl bg-slate-200/60 dark:bg-slate-900/60 border border-slate-300/30 dark:border-slate-800/80 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === 'profile'
                  ? 'bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Academic Profile</span>
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === 'skills'
                  ? 'bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Technical Skills</span>
            </button>
            <button
              onClick={() => setActiveTab('certs')}
              className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === 'certs'
                  ? 'bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Certifications</span>
            </button>
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
              >
                {/* Visual Bio Card */}
                <div className="lg:col-span-5 glass-panel rounded-3xl p-8 border border-slate-200/50 dark:border-slate-800/80 flex flex-col justify-between text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/5 rounded-bl-full pointer-events-none" />
                  <div className="space-y-6">
                    <div className="w-12 h-12 rounded-2xl bg-violet-600/10 dark:bg-violet-400/10 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-2xl text-slate-900 dark:text-white mb-2">
                        B.Sc. in IT (Honours)
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Specializing in Software Engineering
                      </p>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                      Currently maintaining a strong academic standing with a focus on web application security, containerized microservices, and NLP/AI automation interfaces. Driven by crafting clean, testable, and maintainable software.
                    </p>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800/80 grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wide">University</span>
                      <span className="font-heading font-bold text-slate-800 dark:text-slate-200 text-sm sm:text-base">SLIIT</span>
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wide">Location</span>
                      <span className="font-heading font-bold text-slate-800 dark:text-slate-200 text-sm sm:text-base">Colombo, Sri Lanka</span>
                    </div>
                  </div>
                </div>

                {/* Soft Skills & Academic Strengths */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="glass-panel rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800/80 text-left space-y-3">
                    <h4 className="font-heading font-bold text-lg text-slate-800 dark:text-slate-200">System Architecture</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Knowledge of MVC, microservices pattern, REST API designs, and Object-Oriented principles.
                    </p>
                  </div>
                  <div className="glass-panel rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800/80 text-left space-y-3">
                    <h4 className="font-heading font-bold text-lg text-slate-800 dark:text-slate-200">Test Automation</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Experience writing Playwright and Cypress end-to-end regression test scripts.
                    </p>
                  </div>
                  <div className="glass-panel rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800/80 text-left space-y-3">
                    <h4 className="font-heading font-bold text-lg text-slate-800 dark:text-slate-200">Agile Methods</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Comfortable using Scrum models, Git workflows, pull request reviews, and sprint dashboards.
                    </p>
                  </div>
                  <div className="glass-panel rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800/80 text-left space-y-3">
                    <h4 className="font-heading font-bold text-lg text-slate-800 dark:text-slate-200">Problem Solving</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Passionate about algorithms, database query optimization, and debug automation pipelines.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {skillCategories.map((cat, idx) => (
                  <div 
                    key={idx} 
                    className="glass-panel rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800/80 text-left flex flex-col justify-between glow-primary"
                  >
                    <div className="space-y-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/60">
                          {cat.icon}
                        </div>
                        <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                          {cat.title}
                        </h3>
                      </div>
                      
                      <div className="space-y-4">
                        {cat.skills.map((skill, sIdx) => (
                          <div key={sIdx} className="space-y-1.5">
                            <div className="flex justify-between items-center text-xs sm:text-sm">
                              <span className="font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
                              <span className="font-bold text-violet-600 dark:text-violet-400">{skill.level}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.1 }}
                                className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 rounded-full"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'certs' && (
              <motion.div
                key="certs"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {certifications.map((cert, idx) => (
                  <div 
                    key={idx} 
                    className={`rounded-3xl p-6 border bg-gradient-to-br ${cert.color} backdrop-blur-md text-left flex flex-col justify-between h-56 transition-all duration-300 hover:scale-[1.02] shadow-sm`}
                  >
                    <div className="space-y-4">
                      <div className="w-10 h-10 rounded-xl bg-white/40 dark:bg-slate-950/40 flex items-center justify-center border border-white/20">
                        <Award className="w-5 h-5 text-inherit" />
                      </div>
                      <div>
                        <h3 className="font-heading font-extrabold text-base sm:text-lg leading-snug">
                          {cert.title}
                        </h3>
                        <p className="text-xs font-semibold opacity-75 mt-1">
                          Issued by {cert.issuer}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-500/10 flex justify-between items-center text-xs">
                      <span>Credential ID: <code className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10">{cert.id}</code></span>
                      <span className="font-bold opacity-80">{cert.date}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
