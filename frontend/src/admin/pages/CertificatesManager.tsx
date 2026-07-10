import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import Modal from '../components/Modal';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface Certificate {
  id: string;
  certificate_name: string;
  organization: string;
  issue_date: string;
  certificate_image_url: string;
  verification_url: string;
  display_order: number;
}

export default function CertificatesManager() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<Certificate>>({
    certificate_name: '',
    organization: '',
    issue_date: '',
    certificate_image_url: '',
    verification_url: '',
    display_order: 0,
  });

  useEffect(() => {
    fetchCertificates();
  }, []);

  async function fetchCertificates() {
    setLoading(true);
    const { data, error } = await supabase.from('certificates').select('*').order('display_order', { ascending: true });
    if (!error && data) {
      setCertificates(data);
    }
    setLoading(false);
  }

  const handleOpenModal = (cert?: Certificate) => {
    if (cert) {
      setEditingId(cert.id);
      setFormData(cert);
    } else {
      setEditingId(null);
      setFormData({
        certificate_name: '',
        organization: '',
        issue_date: '',
        certificate_image_url: '',
        verification_url: '',
        display_order: certificates.length,
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
      await supabase.from('certificates').update(formData).eq('id', editingId);
    } else {
      await supabase.from('certificates').insert([formData]);
    }
    fetchCertificates();
    handleCloseModal();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      await supabase.from('certificates').delete().eq('id', id);
      fetchCertificates();
    }
  };

  if (loading) return <div>Loading certificates...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Certificates Manager</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certificate</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm font-medium">
              <th className="py-3 px-4">Certificate Name</th>
              <th className="py-3 px-4">Organization</th>
              <th className="py-3 px-4">Issue Date</th>
              <th className="py-3 px-4">Order</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {certificates.map((cert) => (
              <tr key={cert.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-4 text-slate-900 dark:text-white font-medium">{cert.certificate_name}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{cert.organization}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{cert.issue_date}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{cert.display_order}</td>
                <td className="py-3 px-4 flex justify-end space-x-2">
                  <button onClick={() => handleOpenModal(cert)} className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10 rounded">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(cert.id)} className="p-2 text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {certificates.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500">No certificates found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingId ? 'Edit Certificate' : 'Add Certificate'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Certificate Name *</label>
              <input required type="text" value={formData.certificate_name} onChange={e => setFormData({...formData, certificate_name: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Organization *</label>
              <input required type="text" value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Issue Date</label>
              <input type="date" value={formData.issue_date || ''} onChange={e => setFormData({...formData, issue_date: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Display Order</label>
              <input type="number" value={formData.display_order} onChange={e => setFormData({...formData, display_order: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Certificate Image URL</label>
              <input type="url" value={formData.certificate_image_url || ''} onChange={e => setFormData({...formData, certificate_image_url: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Verification URL</label>
              <input type="url" value={formData.verification_url || ''} onChange={e => setFormData({...formData, verification_url: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors">
              {editingId ? 'Save Changes' : 'Add Certificate'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
