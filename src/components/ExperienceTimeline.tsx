import { motion } from 'framer-motion';
import { Calendar, Briefcase, GraduationCap, Award } from 'lucide-react';

interface TimelineEvent {
  year: string;
  type: 'education' | 'experience' | 'project';
  title: string;
  subtitle: string;
  description: string;
  points: string[];
}

export default function ExperienceTimeline() {
  const events: TimelineEvent[] = [
    {
      year: '2025 - Present',
      type: 'experience',
      title: 'Freelance Full-Stack Developer',
      subtitle: 'Self-Employed',
      description: 'Developing custom web apps, custom CMS tools, and backend databases for small clients.',
      points: [
        'Built full-stack React dashboards styled with Tailwind CSS.',
        'Integrated secure JWT user authentication and role validation APIs.',
        'Managed database instances using PostgreSQL and MongoDB.'
      ]
    },
    {
      year: '2024',
      type: 'project',
      title: 'Research Project Automation Assistant',
      subtitle: 'Academic Project',
      description: 'Built testing automations for Singlish to Sinhala NLP translator modules.',
      points: [
        'Wrote Playwright scripts checking 50 negative input conditions.',
        'Structured spreadsheet workflows outputting regression test runs.',
        'Decreased regression manual validation time by 90%.'
      ]
    },
    {
      year: '2023 - Present',
      type: 'education',
      title: 'B.Sc. in Information Technology (Honours)',
      subtitle: 'SLIIT',
      description: 'Specializing in Software Engineering.',
      points: [
        'Focus on MVC framework designs, database index tuning, and cloud computing.',
        'Maintained high academic standing (GPA: 3.9+).',
        'Active member of the Software Engineering Student Community.'
      ]
    }
  ];

  return (
    <section id="timeline" className="py-24 bg-slate-50/50 dark:bg-[#07080d]/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white mb-4">
            Education & Journey
          </h2>
          <div className="w-16 h-1 bg-violet-600 dark:bg-violet-400 mx-auto rounded-full mb-4" />
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Milestones of academic progress, research achievements, and development roles.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 sm:ml-6 md:ml-8 pl-8 sm:pl-10 space-y-12">
          {events.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group text-left"
            >
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[53px] sm:-left-[57px] md:-left-[61px] top-1.5 w-10 h-10 rounded-2xl bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:border-violet-600 dark:group-hover:border-violet-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-all duration-300 shadow-sm z-10">
                {event.type === 'education' && <GraduationCap className="w-5 h-5" />}
                {event.type === 'experience' && <Briefcase className="w-5 h-5" />}
                {event.type === 'project' && <Award className="w-5 h-5" />}
              </div>

              {/* Event Card Content */}
              <div className="glass-panel rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800/80 hover:border-violet-500/20 dark:hover:border-violet-500/20 transition-all duration-300 shadow-sm hover:shadow-md glow-primary">
                {/* Year tag & Category */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center space-x-2 text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-600/10 dark:bg-violet-400/10 px-3 py-1 rounded-full">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{event.year}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {event.type}
                  </span>
                </div>

                {/* Titles */}
                <h3 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">
                  {event.title}
                </h3>
                <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4">
                  {event.subtitle}
                </h4>

                {/* Details */}
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">
                  {event.description}
                </p>

                {/* Sub points list */}
                <ul className="space-y-2.5">
                  {event.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-violet-400 mt-2 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
