import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import ImageUpload from '../../components/admin/ImageUpload';
import { useAuth } from '../../context/AuthContext';

interface HeroBanner {
    id: string;
    title: string;
    subtitle: string;
    image_url: string;
    is_active: boolean;
    created_at: string;
}

const HeroManager: React.FC = () => {
    const { session } = useAuth();
    const [banners, setBanners] = useState<HeroBanner[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    // Form
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        const { data, error } = await supabase
            .from('hero_banners')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching banners:', error);
        else setBanners(data || []);
        setLoading(false);
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Using Backend API for demonstration (as per requirements)
            // Or Supabase directly. Requirements said "Backend CRUD APIs".
            // Let's use fetch to our backend.

            const response = await fetch('/api/hero', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.access_token}`
                },
                body: JSON.stringify({ title, subtitle, image_url: imageUrl, is_active: isActive })
            });

            if (!response.ok) throw new Error('Failed to create banner');

            alert('Hero Image Created!');
            resetForm();
            fetchBanners();
        } catch (error) {
            console.error(error);
            alert('Error creating banner');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this hero banner?')) return;
        try {
            const response = await fetch(`/api/hero/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${session?.access_token}`
                }
            });
            if (!response.ok) throw new Error('Failed to delete');
            fetchBanners();
        } catch (error) {
            alert('Error deleting');
        }
    };

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!event.target.files || event.target.files.length === 0) return;
            setUploading(true);
            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `hero-${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            // Upload to 'hero-images' bucket
            const { error: uploadError } = await supabase.storage
                .from('hero-images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('hero-images').getPublicUrl(filePath);
            setImageUrl(data.publicUrl);
        } catch (error: any) {
            alert('Upload failed: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const resetForm = () => {
        setTitle('');
        setSubtitle('');
        setImageUrl('');
        setIsActive(true);
    };

  return (
    <div className="min-h-screen pt-4 pb-20 relative">
      <div className="container-premium relative z-10 reveal">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-4">
              <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Visual Matrix Control</span>
            </div>
            <h1 className="text-5xl font-extrabold text-white tracking-tight leading-tight">Visual <span className="text-blue-500 italic">Engine</span></h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Creator Unit */}
          <div className="glass-card p-10 reveal">
            <h2 className="text-2xl font-bold text-white mb-10 tracking-tight flex items-center">
              <span className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 mr-4">+</span>
              Initiate New Visual
            </h2>
            <form onSubmit={handleCreate} className="space-y-8">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-4 mb-2 block">Visual Title</label>
                  <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" value={title} onChange={e => setTitle(e.target.value)} required placeholder="Enter headline..." />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-4 mb-2 block">Context Subtitle</label>
                  <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" rows={3} value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="Enter supporting text..." />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-4 mb-2 block">Optical Source (Image)</label>
                  <div className="relative group cursor-pointer">
                    <input type="file" accept="image/*" onChange={handleUpload} className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" required={!imageUrl} />
                    <div className="w-full h-48 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center group-hover:border-blue-500/50 group-hover:bg-blue-500/5 transition-all overflow-hidden">
                      {imageUrl ? (
                        <img src={imageUrl} className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <svg className="w-10 h-10 text-white/20 mb-4 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                          <span className="text-xs font-bold text-awt-text-secondary uppercase tracking-widest">{uploading ? 'Processing Signal...' : 'Inject Visual Data'}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 glass-card bg-white/[0.02]">
                  <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="w-5 h-5 rounded border-white/10 bg-white/5 text-blue-500 focus:ring-blue-500/50" />
                  <label className="text-xs font-bold text-white uppercase tracking-widest">Active Synchronization</label>
                </div>
              </div>
              <button type="submit" className="btn-primary w-full py-4 text-sm shadow-[0_0_40px_rgba(0,87,184,0.3)]">Deploy to Live Matrix</button>
            </form>
          </div>

          {/* Archival Units (History) */}
          <div className="space-y-8 reveal" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center">
              <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-awt-text-secondary mr-4">L</span>
              Archival Units
            </h2>
            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-4 custom-scrollbar">
              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
              ) : banners.length === 0 ? (
                <div className="glass-card p-20 text-center text-awt-text-secondary text-sm">No visual history detected.</div>
              ) : (
                banners.map(banner => (
                  <div key={banner.id} className={`glass-card p-6 group flex gap-6 transition-all border-white/5 hover:bg-white/[0.03] ${banner.is_active ? 'border-blue-500/30 bg-blue-500/[0.02]' : ''}`}>
                    <div className="w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden relative">
                      <img src={banner.image_url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      {banner.is_active && <div className="absolute inset-0 border-2 border-blue-500 rounded-xl"></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-white truncate group-hover:text-blue-400 transition-colors">{banner.title}</h3>
                        <button onClick={() => handleDelete(banner.id)} className="text-red-500 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      </div>
                      <p className="text-awt-text-secondary text-xs leading-relaxed mb-4 line-clamp-2">{banner.subtitle}</p>
                      <div className="flex items-center gap-4">
                        {banner.is_active ? (
                          <span className="text-[8px] font-black uppercase tracking-[0.3em] px-2 py-1 bg-blue-500 text-white rounded">Active Signal</span>
                        ) : (
                          <span className="text-[8px] font-black uppercase tracking-[0.3em] px-2 py-1 bg-white/10 text-awt-text-secondary rounded">Standby</span>
                        )}
                        <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">{new Date(banner.created_at).toLocaleDateString()}</span>
                      </div>
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

export default HeroManager;
