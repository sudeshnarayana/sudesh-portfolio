import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Save } from 'lucide-react';

interface Settings {
  id?: string;
  portfolio_title: string;
  seo_meta_title: string;
  seo_description: string;
  favicon_url: string;
}

export default function SettingsManager() {
  const [settings, setSettings] = useState<Settings>({
    portfolio_title: '',
    seo_meta_title: '',
    seo_description: '',
    favicon_url: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setLoading(true);
    const { data, error } = await supabase.from('settings').select('*').limit(1).single();
    if (!error && data) {
      setSettings(data);
    }
    setLoading(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    if (settings.id) {
      const { error } = await supabase.from('settings').update(settings).eq('id', settings.id);
      if (error) setMessage('Error saving settings: ' + error.message);
      else setMessage('Settings saved successfully!');
    } else {
      const { data, error } = await supabase.from('settings').insert([settings]).select().single();
      if (error) setMessage('Error saving settings: ' + error.message);
      else {
        setSettings(data);
        setMessage('Settings saved successfully!');
      }
    }
    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Global Settings</h1>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm font-medium ${message.includes('Error') ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
          {message}
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">SEO & Branding</h3>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Portfolio Title *</label>
              <input required type="text" value={settings.portfolio_title} onChange={e => setSettings({...settings, portfolio_title: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none" />
              <p className="text-xs text-slate-500 mt-1">This appears as the main title for your site.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">SEO Meta Title</label>
              <input type="text" value={settings.seo_meta_title || ''} onChange={e => setSettings({...settings, seo_meta_title: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">SEO Description</label>
              <textarea rows={3} value={settings.seo_description || ''} onChange={e => setSettings({...settings, seo_description: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none" />
              <p className="text-xs text-slate-500 mt-1">This is the snippet that shows up on search engines.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Favicon URL</label>
              <input type="text" value={settings.favicon_url || ''} onChange={e => setSettings({...settings, favicon_url: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none" />
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              <span>{saving ? 'Saving...' : 'Save Settings'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
