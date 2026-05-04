import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

const SettingsPage: React.FC = () => {
    const [logoUrl, setLogoUrl] = useState<string>('');
    const [iconUrl, setIconUrl] = useState<string>('');
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data, error } = await supabase
                .from('system_settings')
                .select('key, value')
                .in('key', ['site_logo', 'site_icon']);

            if (error) {
                console.error('Error fetching settings:', error);
                return;
            }

            data?.forEach(setting => {
                if (setting.key === 'site_logo') setLogoUrl(setting.value);
                if (setting.key === 'site_icon') setIconUrl(setting.value);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>, key: 'site_logo' | 'site_icon') => {
        try {
            setUploading(true);
            setMessage(null);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${key}-${Math.random()}.${fileExt}`;
            const filePath = `settings/${fileName}`;

            // 1. Upload to Storage
            const { error: uploadError } = await supabase.storage
                .from('images') // Using 'images' bucket as per schema
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            // 3. Save to System Settings Table
            const { error: dbError } = await supabase
                .from('system_settings')
                .upsert({
                    key: key,
                    value: publicUrl,
                    updated_at: new Date().toISOString()
                });

            if (dbError) throw dbError;

            if (key === 'site_logo') setLogoUrl(publicUrl);
            if (key === 'site_icon') setIconUrl(publicUrl);

            setMessage({ text: `${key === 'site_logo' ? 'Logo' : 'Icon'} updated successfully!`, type: 'success' });

        } catch (error: any) {
            setMessage({ text: error.message || 'Error uploading image', type: 'error' });
        } finally {
            setUploading(false);
        }
    };

  return (
    <div className="min-h-screen pt-4 pb-20 relative">
      <div className="container-premium relative z-10 reveal">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-4">
              <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">System Core</span>
            </div>
            <h1 className="text-5xl font-extrabold text-white tracking-tight leading-tight">Identity <span className="text-blue-500 italic">Matrix</span></h1>
          </div>
        </div>

        <div className="glass-card p-10 reveal">
          <h2 className="text-2xl font-bold text-white mb-10 tracking-tight flex items-center">
            <span className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 mr-4">S</span>
            Visual Identity Configuration
          </h2>

          {message && (
            <div className={`p-6 mb-10 rounded-2xl border flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500 ${
              message.type === 'success' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}>
              <div className={`w-2 h-2 rounded-full ${message.type === 'success' ? 'bg-blue-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-xs font-bold uppercase tracking-widest">{message.text}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Logo Settings */}
            <div className="glass-card p-8 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
              <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-6 block">Primary Brand Mark (Logo)</label>
              <div className="flex flex-col items-center gap-8">
                <div className="relative group/img">
                  {logoUrl ? (
                    <img className="h-32 w-32 object-contain rounded-2xl bg-white/5 border border-white/10 p-4 transition-transform group-hover/img:scale-105" src={logoUrl} alt="Current logo" />
                  ) : (
                    <div className="h-32 w-32 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white/20 font-black italic">AWT</div>
                  )}
                  {uploading && (
                    <div className="absolute inset-0 bg-awt-bg/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                       <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <div className="w-full">
                  <input
                    type="file"
                    id="logo-upload"
                    accept="image/*"
                    onChange={(e) => handleUpload(e, 'site_logo')}
                    disabled={uploading}
                    className="hidden"
                  />
                  <label htmlFor="logo-upload" className="btn-secondary w-full py-4 text-[10px] font-black uppercase tracking-widest cursor-pointer flex justify-center items-center gap-2 group-hover:bg-white/10">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                    Re-Map Logo
                  </label>
                </div>
              </div>
            </div>

            {/* Icon Settings */}
            <div className="glass-card p-8 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
              <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-6 block">System Node Icon (Favicon)</label>
              <div className="flex flex-col items-center gap-8">
                 <div className="relative group/img">
                  {iconUrl ? (
                    <img className="h-32 w-32 object-contain rounded-2xl bg-white/5 border border-white/10 p-8 transition-transform group-hover/img:scale-105" src={iconUrl} alt="Current icon" />
                  ) : (
                    <div className="h-32 w-32 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white/20 font-black italic">ICO</div>
                  )}
                  {uploading && (
                    <div className="absolute inset-0 bg-awt-bg/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                       <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <div className="w-full">
                   <input
                    type="file"
                    id="icon-upload"
                    accept="image/*"
                    onChange={(e) => handleUpload(e, 'site_icon')}
                    disabled={uploading}
                    className="hidden"
                  />
                  <label htmlFor="icon-upload" className="btn-secondary w-full py-4 text-[10px] font-black uppercase tracking-widest cursor-pointer flex justify-center items-center gap-2 group-hover:bg-white/10">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                    Re-Map Icon
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 p-8 glass-card bg-blue-500/5 border-blue-500/20">
             <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                   <h4 className="text-white font-bold tracking-tight">Deployment Protocol</h4>
                   <p className="text-awt-text-secondary text-xs mt-1">Updates to these matrix nodes will synchronize across the entire Digital Vanguard network in real-time.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default SettingsPage;
