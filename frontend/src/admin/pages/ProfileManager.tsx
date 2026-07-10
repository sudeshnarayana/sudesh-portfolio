import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Save } from 'lucide-react';

interface Profile {
  id?: string;
  full_name: string;
  professional_title: string;
  about_me: string;
  profile_image_url: string;
  cover_image_url: string;
  location: string;
  email: string;
  phone: string;
  personal_bio: string;
}

export default function ProfileManager() {
  const [profile, setProfile] = useState<Profile>({
    full_name: '',
    professional_title: '',
    about_me: '',
    profile_image_url: '',
    cover_image_url: '',
    location: '',
    email: '',
    phone: '',
    personal_bio: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    setLoading(true);
    const { data, error } = await supabase.from('profile').select('*').limit(1).single();
    if (!error && data) {
      setProfile(data);
    }
    setLoading(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    if (profile.id) {
      const { error } = await supabase.from('profile').update(profile).eq('id', profile.id);
      if (error) setMessage('Error saving profile: ' + error.message);
      else setMessage('Profile saved successfully!');
    } else {
      const { data, error } = await supabase.from('profile').insert([profile]).select().single();
      if (error) setMessage('Error saving profile: ' + error.message);
      else {
        setProfile(data);
        setMessage('Profile saved successfully!');
      }
    }
    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Profile Management</h1>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm font-medium ${message.includes('Error') ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
          {message}
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
              <input required type="text" value={profile.full_name} onChange={e => setProfile({...profile, full_name: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Professional Title *</label>
              <input required type="text" value={profile.professional_title || ''} onChange={e => setProfile({...profile, professional_title: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <input type="email" value={profile.email || ''} onChange={e => setProfile({...profile, email: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label>
              <input type="text" value={profile.phone || ''} onChange={e => setProfile({...profile, phone: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location</label>
              <input type="text" value={profile.location || ''} onChange={e => setProfile({...profile, location: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none" />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">About Me</label>
              <textarea rows={4} value={profile.about_me || ''} onChange={e => setProfile({...profile, about_me: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none" />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Personal Bio</label>
              <textarea rows={3} value={profile.personal_bio || ''} onChange={e => setProfile({...profile, personal_bio: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Profile Image URL</label>
              <input type="text" value={profile.profile_image_url || ''} onChange={e => setProfile({...profile, profile_image_url: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Cover Image URL</label>
              <input type="text" value={profile.cover_image_url || ''} onChange={e => setProfile({...profile, cover_image_url: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none" />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              <span>{saving ? 'Saving...' : 'Save Profile'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
