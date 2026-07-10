import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import Modal from '../components/Modal';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  category: 'web' | 'mobile' | 'figma';
  technologies_used: string[];
  github_url: string;
  live_demo_url: string;
  project_image_url: string;
  featured: boolean;
  display_order: number;
  publish_status: boolean;
}

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    category: 'web',
    technologies_used: [],
    github_url: '',
    live_demo_url: '',
    project_image_url: '',
    featured: false,
    display_order: 0,
    publish_status: true,
  });
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    const { data, error } = await supabase.from('projects').select('*').order('display_order', { ascending: true });
    if (!error && data) {
      setProjects(data);
    }
    setLoading(false);
  }

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingId(project.id);
      setFormData(project);
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        category: 'web',
        technologies_used: [],
        github_url: '',
        live_demo_url: '',
        project_image_url: '',
        featured: false,
        display_order: projects.length,
        publish_status: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const addTech = () => {
    if (techInput.trim() && !formData.technologies_used?.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies_used: [...(formData.technologies_used || []), techInput.trim()]
      });
      setTechInput('');
    }
  };

  const removeTech = (tech: string) => {
    setFormData({
      ...formData,
      technologies_used: formData.technologies_used?.filter(t => t !== tech) || []
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await supabase.from('projects').update(formData).eq('id', editingId);
    } else {
      await supabase.from('projects').insert([formData]);
    }
    fetchProjects();
    handleCloseModal();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await supabase.from('projects').delete().eq('id', id);
      fetchProjects();
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    await supabase.from('projects').update({ publish_status: !currentStatus }).eq('id', id);
    fetchProjects();
  };

  if (loading) return <div>Loading projects...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Projects Manager</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm font-medium">
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Order</th>
              <th className="py-3 px-4">Featured</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-4 text-slate-900 dark:text-white font-medium">{project.title}</td>
                <td className="py-3 px-4">
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400 capitalize">
                    {project.category}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{project.display_order}</td>
                <td className="py-3 px-4">
                  {project.featured ? <span className="text-amber-500 text-xs font-bold px-2 py-1 rounded bg-amber-500/10">Featured</span> : null}
                </td>
                <td className="py-3 px-4">
                  <button 
                    onClick={() => togglePublish(project.id, project.publish_status)}
                    className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium ${project.publish_status ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'}`}
                  >
                    {project.publish_status ? <><Check className="w-3 h-3"/><span>Published</span></> : <><X className="w-3 h-3"/><span>Draft</span></>}
                  </button>
                </td>
                <td className="py-3 px-4 flex justify-end space-x-2">
                  <button onClick={() => handleOpenModal(project)} className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10 rounded">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="p-2 text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">No projects found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingId ? 'Edit Project' : 'Add Project'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Project Title *</label>
              <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
              <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category *</label>
              <select
                required
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as Project['category'] })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="web">Web</option>
                <option value="mobile">Mobile App Design</option>
                <option value="figma">Figma</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">GitHub URL</label>
              <input type="url" value={formData.github_url} onChange={e => setFormData({...formData, github_url: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Live Demo URL</label>
              <input type="url" value={formData.live_demo_url} onChange={e => setFormData({...formData, live_demo_url: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Image URL</label>
              <input type="url" value={formData.project_image_url} onChange={e => setFormData({...formData, project_image_url: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Technologies Used</label>
              <div className="flex space-x-2 mb-2">
                <input type="text" value={techInput} onChange={e => setTechInput(e.target.value)} onKeyDown={(e) => { if(e.key==='Enter'){ e.preventDefault(); addTech();} }} placeholder="e.g. React, Node.js" className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
                <button type="button" onClick={addTech} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">Add</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies_used?.map(tech => (
                  <span key={tech} className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 text-sm">
                    <span>{tech}</span>
                    <button type="button" onClick={() => removeTech(tech)} className="hover:text-rose-500"><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Display Order</label>
              <input type="number" value={formData.display_order} onChange={e => setFormData({...formData, display_order: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
            </div>

            <div className="flex items-center space-x-6 pt-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="rounded text-violet-600 focus:ring-violet-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Featured</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" checked={formData.publish_status} onChange={e => setFormData({...formData, publish_status: e.target.checked})} className="rounded text-violet-600 focus:ring-violet-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Published</span>
              </label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors">
              {editingId ? 'Save Changes' : 'Add Project'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
