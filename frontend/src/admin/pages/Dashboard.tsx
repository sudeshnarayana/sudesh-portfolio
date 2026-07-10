import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { LayoutDashboard, Briefcase, FileCode2, Award, MessageSquare } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experience: 0,
    messages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [projectsRes, skillsRes, expRes, msgRes] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('skills').select('*', { count: 'exact', head: true }),
        supabase.from('experience').select('*', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true })
      ]);

      setStats({
        projects: projectsRes.count || 0,
        skills: skillsRes.count || 0,
        experience: expRes.count || 0,
        messages: msgRes.count || 0,
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  if (loading) return <div>Loading dashboard stats...</div>;

  const statCards = [
    { label: 'Total Projects', value: stats.projects, icon: <Briefcase className="w-6 h-6 text-violet-500" /> },
    { label: 'Total Skills', value: stats.skills, icon: <FileCode2 className="w-6 h-6 text-fuchsia-500" /> },
    { label: 'Experience Records', value: stats.experience, icon: <Award className="w-6 h-6 text-teal-500" /> },
    { label: 'Contact Messages', value: stats.messages, icon: <MessageSquare className="w-6 h-6 text-rose-500" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <LayoutDashboard className="w-8 h-8 text-slate-800 dark:text-slate-200" />
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
      </div>
      <p className="text-slate-600 dark:text-slate-400">Welcome to your portfolio admin panel. Here's a quick summary of your data.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center space-x-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700/50">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
