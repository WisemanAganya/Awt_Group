import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import ImageUpload from '../../components/admin/ImageUpload';

const ContentEditor: React.FC = () => {
    const [contents, setContents] = useState<{ [key: string]: any }>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const { data, error } = await supabase.from('page_content').select('*');
            if (error) throw error;

            const contentMap: { [key: string]: any } = {};
            data?.forEach(item => {
                contentMap[item.section_slug] = item.content;
            });
            setContents(contentMap);
        } catch (error) {
            console.error('Error fetching content:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (slug: string, key: string, value: string) => {
        setContents(prev => ({
            ...prev,
            [slug]: {
                ...prev[slug],
                [key]: value
            }
        }));
    };

    const handleSave = async (slug: string) => {
        setSaving(true);
        try {
            const { error } = await supabase
                .from('page_content')
                .upsert({
                    section_slug: slug,
                    content: contents[slug],
                    updated_at: new Date().toISOString()
                });

            if (error) throw error;
            alert('Content saved successfully!');
        } catch (error) {
            console.error('Error saving content:', error);
            alert('Failed to save content.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-6">Loading content editor...</div>;

  return (
    <div className="min-h-screen pt-4 pb-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 reveal">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-4">
              <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">CMS Mode Active</span>
            </div>
            <h1 className="text-5xl font-extrabold text-white tracking-tight leading-tight">Neural <span className="text-blue-500 italic">Content</span></h1>
          </div>
        </div>

        <div className="space-y-12">
          {/* Home Hero Section */}
          <section className="glass-panel rounded-3xl p-10 group reveal">
            <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight mb-2">Home Page: Hero Engine</h2>
                <p className="text-content-secondary text-sm">Modify the primary impact section of the website.</p>
              </div>
              <button
                onClick={() => handleSave('home_hero')}
                disabled={saving}
                className="btn-primary px-8 py-3 text-sm shadow-[0_0_30px_rgba(0,87,184,0.3)]"
              >
                {saving ? 'Syncing...' : 'Sync Changes'}
              </button>
            </div>
            
            <div className="grid gap-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-4 mb-2 block">Primary Headline</label>
                    <input
                      type="text"
                      className="w-full bg-surface border border-glass-border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      value={contents['home_hero']?.title || ''}
                      onChange={(e) => handleChange('home_hero', 'title', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-4 mb-2 block">Supporting Context</label>
                    <textarea
                      className="w-full bg-surface border border-glass-border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      rows={4}
                      value={contents['home_hero']?.subtitle || ''}
                      onChange={(e) => handleChange('home_hero', 'subtitle', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-4 mb-2 block">Hero Visual Source</label>
                   <ImageUpload
                      currentImage={contents['home_hero']?.image_url}
                      onUpload={(url) => handleChange('home_hero', 'image_url', url)}
                   />
                </div>
              </div>
            </div>
          </section>

          {/* Contact Info Section */}
          <section className="glass-panel rounded-3xl p-10 group reveal" style={{ animationDelay: '0.1s' }}>
            <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight mb-2">Global Connectivity</h2>
                <p className="text-content-secondary text-sm">Manage company-wide contact end-points.</p>
              </div>
              <button
                onClick={() => handleSave('contact_info')}
                disabled={saving}
                className="btn-secondary px-8 py-3 text-sm"
              >
                {saving ? 'Syncing...' : 'Sync Changes'}
              </button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-4 mb-2 block">Contact Protocol (Email)</label>
                <input
                  type="email"
                  className="w-full bg-surface border border-glass-border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  value={contents['contact_info']?.email || ''}
                  onChange={(e) => handleChange('contact_info', 'email', e.target.value)}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-4 mb-2 block">Direct Line (Phone)</label>
                <input
                  type="text"
                  className="w-full bg-surface border border-glass-border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  value={contents['contact_info']?.phone || ''}
                  onChange={(e) => handleChange('contact_info', 'phone', e.target.value)}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-4 mb-2 block">Physical Node (Address)</label>
                <input
                  type="text"
                  className="w-full bg-surface border border-glass-border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  value={contents['contact_info']?.address || ''}
                  onChange={(e) => handleChange('contact_info', 'address', e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* About Page Section */}
          <section className="glass-panel rounded-3xl p-10 group reveal" style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight mb-2">Legacy & Purpose</h2>
                <p className="text-content-secondary text-sm">Edit the mission and vision statements.</p>
              </div>
              <button
                onClick={() => handleSave('about_content')}
                disabled={saving}
                className="btn-primary px-8 py-3 text-sm shadow-[0_0_30px_rgba(0,87,184,0.3)]"
              >
                {saving ? 'Syncing...' : 'Sync Changes'}
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-4 mb-2 block">Operational Mission</label>
                <textarea
                  className="w-full bg-surface border border-glass-border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  rows={6}
                  value={contents['about_content']?.mission || ''}
                  onChange={(e) => handleChange('about_content', 'mission', e.target.value)}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-4 mb-2 block">Visionary Horizon</label>
                <textarea
                  className="w-full bg-surface border border-glass-border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  rows={6}
                  value={contents['about_content']?.vision || ''}
                  onChange={(e) => handleChange('about_content', 'vision', e.target.value)}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );

};

export default ContentEditor;




