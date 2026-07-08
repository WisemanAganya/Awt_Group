import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import ImageUpload from '../../components/admin/ImageUpload';

interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    image_url: string;
    link: string;
}

const PortfolioManager: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const { data, error } = await supabase.from('portfolio_projects').select('*').order('created_at', { ascending: false });
        if (error) console.error('Error fetching projects:', error);
        else setProjects(data || []);
        setLoading(false);
    };

    const handleEdit = (project: Project) => {
        setEditingId(project.id);
        setTitle(project.title);
        setDescription(project.description);
        setCategory(project.category);
        setImageUrl(project.image_url);
        setLink(project.link || '');
    };

    const handleCancel = () => {
        setEditingId(null);
        resetForm();
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setCategory('');
        setImageUrl('');
        setLink('');
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        const projectData = {
            title,
            description,
            category,
            image_url: imageUrl,
            link
        };

        if (editingId) {
            const { error } = await supabase.from('portfolio_projects').update(projectData).eq('id', editingId);
            if (error) alert('Error updating project');
        } else {
            const { error } = await supabase.from('portfolio_projects').insert([projectData]);
            if (error) alert('Error creating project');
        }

        handleCancel();
        fetchProjects();
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure?')) return;
        const { error } = await supabase.from('portfolio_projects').delete().eq('id', id);
        if (error) alert('Error deleting project');
        else fetchProjects();
    };

  return (
    <div className="min-h-screen pt-4 pb-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 reveal">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-4">
              <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Creative Repository</span>
            </div>
            <h1 className="text-5xl font-extrabold text-white tracking-tight leading-tight">Project <span className="text-blue-500 italic">Vault</span></h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form Area */}
          <div className="glass-panel rounded-3xl p-10 reveal">
             <h2 className="text-2xl font-bold text-white mb-10 tracking-tight flex items-center">
              <span className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 mr-4">
                {editingId ? 'U' : '+'}
              </span>
              {editingId ? 'Refine Artifact' : 'Catalog New Artifact'}
            </h2>
            <form onSubmit={handleSave} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-4 mb-2 block">Artifact Title</label>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-surface border border-glass-border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" required placeholder="Project Name" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-4 mb-2 block">Classification (Category)</label>
                  <input type="text" value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-surface border border-glass-border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" required placeholder="e.g. Mobile App" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-4 mb-2 block">Creative Narrative (Description)</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-surface border border-glass-border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" rows={4} required placeholder="Tell the story of this project..." />
              </div>
              <div>
                <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-4 mb-2 block">Digital Link (URL)</label>
                <input type="url" value={link} onChange={e => setLink(e.target.value)} className="w-full bg-surface border border-glass-border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="https://..." />
              </div>

              <div className="glass-panel rounded-3xl p-6 bg-white/[0.02]">
                <ImageUpload onUpload={setImageUrl} currentImage={imageUrl} label="Visual Artifact Identity" />
              </div>

              <div className="flex gap-4">
                <button type="submit" className="btn-primary flex-1 py-4 text-sm shadow-[0_0_30px_rgba(0,87,184,0.3)]">
                  {editingId ? 'Confirm Calibration' : 'Deploy Artifact'}
                </button>
                {editingId && (
                   <button type="button" onClick={handleCancel} className="btn-secondary px-8 py-4 text-sm">
                     Cancel
                   </button>
                )}
              </div>
            </form>
          </div>

          {/* List Area */}
          <div className="space-y-8 reveal" style={{ animationDelay: '0.2s' }}>
             <h2 className="text-2xl font-bold text-white tracking-tight flex items-center">
              <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-content-secondary mr-4">V</span>
              Archived Artifacts
            </h2>
            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-4 custom-scrollbar">
              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
              ) : projects.length === 0 ? (
                <div className="glass-panel rounded-3xl p-20 text-center text-content-secondary text-sm">No artifacts detected in the vault.</div>
              ) : (
                projects.map(project => (
                  <div key={project.id} className="glass-panel rounded-3xl p-6 group flex items-start gap-6 transition-all border-glass-border hover:bg-white/[0.03]">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-blue-500/10 flex-shrink-0 relative group-hover:scale-105 transition-transform">
                      {project.image_url ? (
                        <img src={project.image_url} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-blue-500 font-black italic">P</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-white truncate group-hover:text-blue-400 transition-colors">{project.title}</h3>
                        <div className="flex gap-4">
                           <button onClick={() => handleEdit(project)} className="text-blue-500 opacity-0 group-hover:opacity-100 hover:text-white transition-all">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                           </button>
                           <button onClick={() => handleDelete(project.id)} className="text-red-500 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                           </button>
                        </div>
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-400 mb-2 block">{project.category}</span>
                      <p className="text-content-secondary text-xs line-clamp-2 leading-relaxed">{project.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default PortfolioManager;




