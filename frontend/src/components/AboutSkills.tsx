import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Terminal } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface Skill {
  id: string;
  skill_name: string;
  category: string;
  skill_level: number;
  display_order: number;
}

interface Certificate {
  id: string;
  certificate_name: string;
  organization: string;
  issue_date: string;
  verification_url: string;
  display_order: number;
}

export default function AboutSkills() {
  const [activeTab, setActiveTab] = useState<'skills' | 'certs'>('skills');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [skillsRes, certsRes] = await Promise.all([
        supabase.from('skills').select('*').order('display_order', { ascending: true }),
        supabase.from('certificates').select('*').order('display_order', { ascending: true }),
      ]);

      if (!skillsRes.error && skillsRes.data) setSkills(skillsRes.data);
      if (!certsRes.error && certsRes.data) setCertificates(certsRes.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  // Group skills by category
  const skillCategories = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="about" className="py-24 bg-slate-50/50 dark:bg-[#07080d]/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white mb-4">
            About Me &amp; Skills
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

        <div className="min-h-[400px]">
          {loading ? (
            <div className="text-center text-slate-400 text-sm animate-pulse">Loading...</div>
          ) : (
            <AnimatePresence mode="wait">
              {activeTab === 'skills' && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                  {Object.keys(skillCategories).length === 0 && (
                    <p className="col-span-3 text-center text-slate-400 text-sm">
                      No skills added yet. Add some from the admin panel.
                    </p>
                  )}
                  {Object.entries(skillCategories).map(([category, catSkills], idx) => (
                    <div
                      key={category}
                      className="glass-panel rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800/80 text-left flex flex-col justify-between glow-primary"
                    >
                      <div className="space-y-6">
                        <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                          {category}
                        </h3>
                        <div className="space-y-4">
                          {catSkills.map((skill) => (
                            <div key={skill.id} className="space-y-1.5">
                              <div className="flex justify-between items-center text-xs sm:text-sm">
                                <span className="font-medium text-slate-700 dark:text-slate-300">{skill.skill_name}</span>
                                <span className="font-bold text-violet-600 dark:text-violet-400">{skill.skill_level}%</span>
                              </div>
                              <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.skill_level}%` }}
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
                  {certificates.length === 0 && (
                    <p className="col-span-3 text-center text-slate-400 text-sm">
                      No certificates added yet. Add some from the admin panel.
                    </p>
                  )}
                  {certificates.map((cert) => (
                    <a
                      key={cert.id}
                      href={cert.verification_url || undefined}
                      target={cert.verification_url ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="rounded-3xl p-6 border bg-gradient-to-br from-violet-500/10 to-fuchsia-600/10 text-violet-700 dark:text-violet-300 border-violet-500/20 backdrop-blur-md text-left flex flex-col justify-between h-56 transition-all duration-300 hover:scale-[1.02] shadow-sm"
                    >
                      <div className="space-y-4">
                        <div className="w-10 h-10 rounded-xl bg-white/40 dark:bg-slate-950/40 flex items-center justify-center border border-white/20">
                          <Award className="w-5 h-5 text-inherit" />
                        </div>
                        <div>
                          <h3 className="font-heading font-extrabold text-base sm:text-lg leading-snug">
                            {cert.certificate_name}
                          </h3>
                          <p className="text-xs font-semibold opacity-75 mt-1">
                            Issued by {cert.organization}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-500/10 flex justify-between items-center text-xs">
                        <span className="font-bold opacity-80">
                          {cert.issue_date ? new Date(cert.issue_date).getFullYear() : ''}
                        </span>
                      </div>
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}
