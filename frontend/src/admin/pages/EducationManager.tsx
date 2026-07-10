import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import Modal from '../components/Modal';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface Education {
  id: string;
  institute: string;
  qualification: string;
  duration: string;
  description: string;
  display_order: number;
}

export default function EducationManager() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<Education>>({
    institute: '',
    qualification: '',
    duration: '',
    description: '',
    display_order: 0,
  });

  useEffect(() => {
    fetchEducation();
  }, []);

  async function fetchEducation() {
    setLoading(true);
    const { data, error } = await supabase.from('education').select('*').order('display_order', { ascending: true });
    if (!error && data) {
      setEducations(data);
    }
    setLoading(false);
  }

  const handleOpenModal = (edu?: Education) => {
    if (edu) {
      setEditingId(edu.id);
      setFormData(edu);
    } else {
      setEditingId(null);
      setFormData({
        institute: '',
        qualification: '',
        duration: '',
        description: '',
        display_order: educations.length,
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
      await supabase.from('education').update(formData).eq('id', editingId);
    } else {
      await supabase.from('education').insert([formData]);
    }
    fetchEducation();
    handleCloseModal();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      await supabase.from('education').delete().eq('id', id);
      fetchEducation();
    }
  };

  if (loading) return <div>Loading education...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Education Manager</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm font-medium">
              <th className="py-3 px-4">Qualification</th>
              <th className="py-3 px-4">Institute</th>
              <th className="py-3 px-4">Duration</th>
              <th className="py-3 px-4">Order</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {educations.map((edu) => (
              <tr key={edu.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-4 text-slate-900 dark:text-white font-medium">{edu.qualification}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{edu.institute}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{edu.duration}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{edu.display_order}</td>
                <td className="py-3 px-4 flex justify-end space-x-2">
                  <button onClick={() => handleOpenModal(edu)} className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10 rounded">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(edu.id)} className="p-2 text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {educations.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500">No education records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingId ? 'Edit Education' : 'Add Education'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Institute *</label>
              <input required type="text" value={formData.institute} onChange={e => setFormData({...formData, institute: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Qualification *</label>
              <input required type="text" value={formData.qualification} onChange={e => setFormData({...formData, qualification: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Duration (e.g., 2020 - 2024)</label>
              <input type="text" value={formData.duration || ''} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
              <textarea rows={4} value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Display Order</label>
              <input type="number" value={formData.display_order} onChange={e => setFormData({...formData, display_order: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors">
              {editingId ? 'Save Changes' : 'Add Education'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
