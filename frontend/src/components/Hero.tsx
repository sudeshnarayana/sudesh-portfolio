import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { supabase } from '../supabaseClient';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface Profile {
  full_name: string;
  professional_title: string;
  about_me: string;
  profile_image_url: string;
  email: string;
}

// Fallback roles used for the typing animation if no title is set in DB
const DEFAULT_ROLES = ['Software Engineer', 'Full-Stack Developer'];

export default function Hero() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayBetweenRoles = 2000;

  useEffect(() => {
    async function fetchProfile() {
      const { data, error } = await supabase.from('profile').select('*').limit(1).single();
      if (!error && data) {
        setProfile(data);
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);

  // Typing animation cycles through the professional_title (split by comma) or falls back to defaults
  const roles = profile?.professional_title
    ? profile.professional_title.split(',').map(r => r.trim()).filter(Boolean)
    : DEFAULT_ROLES;

  useEffect(() => {
    let timer: any;
    const currentFullText = roles[textIndex % roles.length];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && displayText === currentFullText) {
      timer = setTimeout(() => setIsDeleting(true), delayBetweenRoles);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayText, isDeleting, textIndex, profile]);

  const handleScrollTo = (id: string) => {
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

  if (loading) {
    return (
      <section id="home" className="relative min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-slate-400 text-sm">Loading...</div>
      </section>
    );
  }

  const fullName = profile?.full_name || 'Your Name';
  const [firstName, ...rest] = fullName.split(' ');
  const lastName = rest.join(' ');
  const aboutMe = profile?.about_me || 'Add your bio from the admin panel to see it appear here.';
  const email = profile?.email;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-violet-500/10 dark:bg-violet-500/15 rounded-full filter blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-fuchsia-500/10 dark:bg-fuchsia-500/15 rounded-full filter blur-3xl animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Intro Text */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-violet-600/10 dark:bg-violet-400/10 border border-violet-600/20 dark:border-violet-400/20"
          >
            <span className="w-2 h-2 rounded-full bg-violet-600 dark:bg-violet-400 animate-pulse" />
            <span className="text-xs font-semibold text-violet-700 dark:text-violet-300 tracking-wide uppercase">
              Open to Opportunities
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3"
          >
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-slate-900 dark:text-white leading-tight">
              Hi, I'm <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">{firstName} {lastName}</span>
            </h1>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-700 dark:text-slate-300 flex items-center min-h-[48px]">
              I am a&nbsp;
              <span className="text-violet-600 dark:text-violet-400 relative">
                {displayText}
                <span className="absolute -right-1 top-0 bottom-0 w-[2px] bg-violet-600 dark:bg-violet-400 animate-pulse" />
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed"
          >
            {aboutMe}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 w-full"
          >
            <button
              onClick={() => handleScrollTo('projects')}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl font-semibold bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 shadow-lg shadow-violet-600/25 dark:shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-600/35 transition-all duration-300 group cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => handleScrollTo('contact')}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900/60 transition-all duration-300 cursor-pointer"
            >
              <span>Contact Me</span>
            </button>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center space-x-4 pt-4"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-100 hover:bg-violet-600 hover:text-white dark:bg-slate-900 dark:hover:bg-violet-500 text-slate-600 dark:text-slate-400 dark:hover:text-white transition-all duration-300 flex items-center justify-center"
              aria-label="GitHub Profile"
            >
              <GithubIcon />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-100 hover:bg-violet-600 hover:text-white dark:bg-slate-900 dark:hover:bg-violet-500 text-slate-600 dark:text-slate-400 dark:hover:text-white transition-all duration-300 flex items-center justify-center"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon />
            </a>
            {email && (
              <a
                href={`mailto:${email}`}
                className="p-3 rounded-xl bg-slate-100 hover:bg-violet-600 hover:text-white dark:bg-slate-900 dark:hover:bg-violet-500 text-slate-600 dark:text-slate-400 dark:hover:text-white transition-all duration-300"
                aria-label="Send Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            )}
          </motion.div>
        </div>

        {/* Hero Interactive Visual */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-[400px] aspect-square relative"
          >
            <div className="absolute inset-0 border border-dashed border-violet-600/20 dark:border-violet-400/25 rounded-full animate-[spin_40s_linear_infinite]" />
            <div className="absolute inset-8 border border-dashed border-fuchsia-600/10 dark:border-fuchsia-400/20 rounded-full animate-[spin_20s_linear_infinite_reverse]" />

            <div className="absolute inset-16 flex items-center justify-center rounded-full glass-panel glow-primary border border-white/20 dark:border-white/5 shadow-2xl relative overflow-hidden group">
              {profile?.profile_image_url ? (
                <img
                  src={profile.profile_image_url}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={`${fullName} Avatar`}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl font-heading font-extrabold text-violet-600 dark:text-violet-400">
                  {firstName?.[0] || '?'}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
