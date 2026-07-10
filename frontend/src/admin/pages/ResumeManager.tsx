import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { FileUp, Trash2, FileText, CheckCircle } from 'lucide-react';

export default function ResumeManager() {
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const bucketName = 'portfolio-assets';

  useEffect(() => {
    fetchResumes();
  }, []);

  async function fetchResumes() {
    setLoading(true);
    const { data, error } = await supabase.storage.from(bucketName).list('resumes', {
      limit: 10,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' }
    });

    if (error) {
      console.error('Error fetching resumes:', error);
    } else {
      setResumes(data || []);
    }
    setLoading(false);
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setUploading(true);
    setMessage('');

    const fileExt = file.name.split('.').pop();
    const fileName = `resume-${Date.now()}.${fileExt}`;
    const filePath = `resumes/${fileName}`;

    const { error } = await supabase.storage.from(bucketName).upload(filePath, file);

    if (error) {
      setMessage(`Upload failed: ${error.message}`);
    } else {
      setMessage('Resume uploaded successfully!');
      fetchResumes();
    }
    setUploading(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDelete = async (fileName: string) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      const { error } = await supabase.storage.from(bucketName).remove([`resumes/${fileName}`]);
      if (error) {
        alert('Error deleting file: ' + error.message);
      } else {
        fetchResumes();
      }
    }
  };

  const getPublicUrl = (fileName: string) => {
    const { data } = supabase.storage.from(bucketName).getPublicUrl(`resumes/${fileName}`);
    return data.publicUrl;
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Resume Manager</h1>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm font-medium flex items-center space-x-2 ${message.includes('failed') ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
          {message.includes('successfully') && <CheckCircle className="w-5 h-5" />}
          <span>{message}</span>
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
        <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-10 flex flex-col items-center justify-center text-center">
          <FileUp className="w-12 h-12 text-slate-400 mb-4" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Upload New Resume</h3>
          <p className="text-sm text-slate-500 mb-6 max-w-sm">
            Upload your latest CV in PDF format. This will be stored in your Supabase storage bucket.
          </p>
          <label className="cursor-pointer inline-flex items-center space-x-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors">
            <span>{uploading ? 'Uploading...' : 'Select File'}</span>
            <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileUpload} disabled={uploading} />
          </label>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Uploaded Files</h3>
          
          {loading ? (
            <p className="text-slate-500">Loading files...</p>
          ) : resumes.length === 0 ? (
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 text-center">
              No resumes uploaded yet.
            </div>
          ) : (
            <div className="space-y-3">
              {resumes.map(file => {
                if (file.name === '.emptyFolderPlaceholder') return null;
                return (
                  <div key={file.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 rounded-lg">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <a href={getPublicUrl(file.name)} target="_blank" rel="noopener noreferrer" className="font-medium text-slate-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                          {file.name}
                        </a>
                        <p className="text-xs text-slate-500">
                          {new Date(file.created_at).toLocaleDateString()} • {(file.metadata?.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(file.name)} className="p-2 text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
