import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Trash2, CheckCircle, Mail, Search } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'unread' | 'read';
  created_at: string;
}

export default function MessagesManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    setLoading(true);
    const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setMessages(data);
    }
    setLoading(false);
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      await supabase.from('contact_messages').delete().eq('id', id);
      fetchMessages();
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'unread' ? 'read' : 'unread';
    await supabase.from('contact_messages').update({ status: newStatus }).eq('id', id);
    fetchMessages();
  };

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    m.message.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div>Loading messages...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Contact Messages</h1>
        
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search messages..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-64 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredMessages.map((msg) => (
          <div key={msg.id} className={`p-6 rounded-2xl border ${msg.status === 'unread' ? 'bg-white dark:bg-slate-800 border-violet-200 dark:border-violet-900/50 shadow-sm' : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-75'}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${msg.status === 'unread' ? 'bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400' : 'bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center space-x-2">
                    <span>{msg.name}</span>
                    {msg.status === 'unread' && <span className="w-2 h-2 rounded-full bg-violet-600 dark:bg-violet-500"></span>}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    <a href={`mailto:${msg.email}`} className="hover:underline">{msg.email}</a> • {new Date(msg.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => toggleStatus(msg.id, msg.status)}
                  title={msg.status === 'unread' ? 'Mark as Read' : 'Mark as Unread'}
                  className={`p-2 rounded-lg transition-colors ${msg.status === 'unread' ? 'text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-500/10' : 'text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDelete(msg.id)}
                  title="Delete Message"
                  className="p-2 text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="pl-16 text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-900/20 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              <p className="whitespace-pre-wrap">{msg.message}</p>
            </div>
          </div>
        ))}
        {filteredMessages.length === 0 && (
          <div className="py-12 text-center text-slate-500 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            No messages found.
          </div>
        )}
      </div>
    </div>
  );
}
