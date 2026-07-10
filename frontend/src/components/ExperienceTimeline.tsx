import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, GraduationCap } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface Experience {
  id: string;
  company: string;
  position: string;
  start_date: string;
  end_date: string | null;
  description: string;
  display_order: number;
}

interface Education {
  id: string;
  institute: string;
  qualification: string;
  duration: string;
  description: string;
  display_order: number;
}

type TimelineItem = {
  id: string;
  type: 'experience' | 'education';
  yearLabel: string;
  title: string;
  subtitle: string;
  description: string;
  sortKey: number;
};

function formatDate(dateStr: string | null) {
  if (!dateStr) return 'Present';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function ExperienceTimeline() {
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [expRes, eduRes] = await Promise.all([
        supabase.from('experience').select('*').order('display_order', { ascending: true }),
        supabase.from('education').select('*').order('display_order', { ascending: true }),
      ]);

      const experienceItems: TimelineItem[] = (expRes.data || []).map((e: Experience) => ({
        id: e.id,
        type: 'experience',
        yearLabel: `${formatDate(e.start_date)} - ${formatDate(e.end_date)}`,
        title: e.position,
        subtitle: e.company,
        description: e.description,
        sortKey: e.display_order,
      }));

      const educationItems: TimelineItem[] = (eduRes.data || []).map((e: Education) => ({
        id: e.id,
        type: 'education',
        yearLabel: e.duration || '',
        title: e.qualification,
        subtitle: e.institute,
        description: e.description,
        sortKey: e.display_order,
      }));

      setItems([...experienceItems, ...educationItems].sort((a, b) => a.sortKey - b.sortKey));
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <section id="timeline" className="py-24 bg-slate-50/50 dark:bg-[#07080d]/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white mb-4">
            Education &amp; Journey
          </h2>
          <div className="w-16 h-1 bg-violet-600 dark:bg-violet-400 mx-auto rounded-full mb-4" />
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Milestones of academic progress, research achievements, and development roles.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-slate-400 text-sm animate-pulse">Loading...</div>
        ) : items.length === 0 ? (
          <p className="text-center text-slate-400 text-sm">
            No experience or education entries yet. Add them from the admin panel.
          </p>
        ) : (
          <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 sm:ml-6 md:ml-8 pl-8 sm:pl-10 space-y-12">
            {items.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative group text-left"
              >
                <div className="absolute -left-[53px] sm:-left-[57px] md:-left-[61px] top-1.5 w-10 h-10 rounded-2xl bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:border-violet-600 dark:group-hover:border-violet-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-all duration-300 shadow-sm z-10">
                  {event.type === 'education' && <GraduationCap className="w-5 h-5" />}
                  {event.type === 'experience' && <Briefcase className="w-5 h-5" />}
                </div>

                <div className="glass-panel rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800/80 hover:border-violet-500/20 dark:hover:border-violet-500/20 transition-all duration-300 shadow-sm hover:shadow-md glow-primary">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center space-x-2 text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-600/10 dark:bg-violet-400/10 px-3 py-1 rounded-full">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{event.yearLabel}</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {event.type}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">
                    {event.title}
                  </h3>
                  <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4">
                    {event.subtitle}
                  </h4>

                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
