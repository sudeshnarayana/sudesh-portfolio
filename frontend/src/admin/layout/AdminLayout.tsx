import { useEffect, useState } from 'react';
import { Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { LogOut, LayoutDashboard, User, Briefcase, FileCode2, Award, BookOpen, Wrench, FileText, MessageSquare, Share2, Settings } from 'lucide-react';

export default function AdminLayout() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Profile', path: '/admin/profile', icon: <User className="w-5 h-5" /> },
    { name: 'Projects', path: '/admin/projects', icon: <Briefcase className="w-5 h-5" /> },
    { name: 'Skills', path: '/admin/skills', icon: <FileCode2 className="w-5 h-5" /> },
    { name: 'Experience', path: '/admin/experience', icon: <Award className="w-5 h-5" /> },
    { name: 'Education', path: '/admin/education', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'Certificates', path: '/admin/certificates', icon: <Award className="w-5 h-5" /> },
    { name: 'Services', path: '/admin/services', icon: <Wrench className="w-5 h-5" /> },
    { name: 'Resume', path: '/admin/resume', icon: <FileText className="w-5 h-5" /> },
    { name: 'Contact Messages', path: '/admin/messages', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Social Links', path: '/admin/social', icon: <Share2 className="w-5 h-5" /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#07080d] flex flex-col h-full shrink-0">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">Admin Panel</h2>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                  isActive 
                  ? 'bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 font-medium' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            )
          })}
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-3 py-2.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative z-0">
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#07080d] flex items-center justify-between px-8 shrink-0">
          <div className="text-sm font-medium text-slate-500">
            {navItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-500">{session.user.email}</span>
            <button onClick={() => navigate('/')} className="text-sm text-violet-600 dark:text-violet-400 hover:underline">
              View Site
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8 bg-slate-50 dark:bg-slate-900">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
