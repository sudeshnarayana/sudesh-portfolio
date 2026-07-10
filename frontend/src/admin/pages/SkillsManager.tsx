import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import Modal from '../components/Modal';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface Skill {
  id: string;
  skill_name: string;
  category: string;
  skill_level: number;
  icon: string;
  display_order: number;
}

export default function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<Skill>>({
    skill_name: '',
    category: '',
    skill_level: 50,
    icon: '',
    display_order: 0,
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  async function fetchSkills() {
    setLoading(true);
    const { data, error } = await supabase.from('skills').select('*').order('display_order', { ascending: true });
    if (!error && data) {
      setSkills(data);
    }
    setLoading(false);
  }

  const handleOpenModal = (skill?: Skill) => {
    if (skill) {
      setEditingId(skill.id);
      setFormData(skill);
    } else {
      setEditingId(null);
      setFormData({
        skill_name: '',
        category: '',
        skill_level: 50,
        icon: '',
        display_order: skills.length,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await supabase.from('skills').update(formData).eq('id', editingId);
    } else {
      await supabase.from('skills').insert([formData]);
    }
    fetchSkills();
    handleCloseModal();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      await supabase.from('skills').delete().eq('id', id);
      fetchSkills();
    }
  };

  if (loading) return <div>Loading skills...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Skills Manager</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm font-medium">
              <th className="py-3 px-4">Skill Name</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Level</th>
              <th className="py-3 px-4">Order</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {skills.map((skill) => (
              <tr key={skill.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-4 text-slate-900 dark:text-white font-medium">{skill.skill_name}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{skill.category}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 max-w-[100px]">
                      <div className="bg-violet-600 h-2 rounded-full" style={{ width: `${skill.skill_level}%` }}></div>
                    </div>
                    <span className="text-xs">{skill.skill_level}%</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{skill.display_order}</td>
                <td className="py-3 px-4 flex justify-end space-x-2">
                  <button onClick={() => handleOpenModal(skill)} className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10 rounded">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(skill.id)} className="p-2 text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {skills.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500">No skills found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingId ? 'Edit Skill' : 'Add Skill'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Skill Name *</label>
              <input required type="text" value={formData.skill_name} onChange={e => setFormData({...formData, skill_name: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
            </div>
            
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category *</label>
              <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="e.g. Frontend" className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Level (0-100)</label>
              <input type="number" min="0" max="100" value={formData.skill_level} onChange={e => setFormData({...formData, skill_level: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Display Order</label>
              <input type="number" value={formData.display_order} onChange={e => setFormData({...formData, display_order: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Icon URL / SVG String</label>
              <input type="text" value={formData.icon || ''} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors">
              {editingId ? 'Save Changes' : 'Add Skill'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
