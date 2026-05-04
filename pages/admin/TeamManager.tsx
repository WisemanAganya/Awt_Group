import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import ImageUpload from '../../components/admin/ImageUpload';

interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    photo_url: string;
}

const TeamManager: React.FC = () => {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [bio, setBio] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        const { data, error } = await supabase.from('team_members').select('*').order('created_at', { ascending: true });
        if (error) console.error('Error fetching members:', error);
        else setMembers(data || []);
        setLoading(false);
    };

    const handleEdit = (member: TeamMember) => {
        setEditingId(member.id);
        setName(member.name);
        setRole(member.role);
        setBio(member.bio);
        setPhotoUrl(member.photo_url);
    };

    const handleCancel = () => {
        setEditingId(null);
        resetForm();
    };

    const resetForm = () => {
        setName('');
        setRole('');
        setBio('');
        setPhotoUrl('');
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        const memberData = {
            name,
            role,
            bio,
            photo_url: photoUrl
        };

        if (editingId) {
            const { error } = await supabase.from('team_members').update(memberData).eq('id', editingId);
            if (error) alert('Error updating member');
        } else {
            const { error } = await supabase.from('team_members').insert([memberData]);
            if (error) alert('Error adding member');
        }

        handleCancel();
        fetchMembers();
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure?')) return;
        const { error } = await supabase.from('team_members').delete().eq('id', id);
        if (error) alert('Error deleting member');
        else fetchMembers();
    };

  return (
    <div className="min-h-screen pt-4 pb-20 relative">
      <div className="container-premium relative z-10 reveal">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-4">
              <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Personnel Division</span>
            </div>
            <h1 className="text-5xl font-extrabold text-white tracking-tight leading-tight">Vanguard <span className="text-blue-500 italic">Unit</span></h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form Area */}
          <div className="glass-card p-10 reveal">
            <h2 className="text-2xl font-bold text-white mb-10 tracking-tight flex items-center">
              <span className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 mr-4">
                {editingId ? 'U' : '+'}
              </span>
              {editingId ? 'Calibrate Entity' : 'Recruit New Entity'}
            </h2>
            <form onSubmit={handleSave} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-4 mb-2 block">Entity Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" required placeholder="Full Name" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-4 mb-2 block">Operational Role</label>
                  <input type="text" value={role} onChange={e => setRole(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" required placeholder="Designation" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-4 mb-2 block">Entity Biography</label>
                <textarea value={bio} onChange={e => setBio(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" rows={4} placeholder="Background data..." />
              </div>

              <div className="glass-card p-6 bg-white/[0.02]">
                <ImageUpload onUpload={setPhotoUrl} currentImage={photoUrl} label="Visual Identification (Photo)" />
              </div>

              <div className="flex gap-4">
                <button type="submit" className="btn-primary flex-1 py-4 text-sm shadow-[0_0_30px_rgba(0,87,184,0.3)]">
                  {editingId ? 'Synchronize Data' : 'Deploy Entity'}
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
              <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-awt-text-secondary mr-4">L</span>
              Active Personnel
            </h2>
            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-4 custom-scrollbar">
              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
              ) : members.length === 0 ? (
                <div className="glass-card p-20 text-center text-awt-text-secondary text-sm">No personnel detected in this sector.</div>
              ) : (
                members.map(member => (
                  <div key={member.id} className="glass-card p-6 group flex items-center gap-6 transition-all border-white/5 hover:bg-white/[0.03]">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-blue-500/10 flex-shrink-0 relative group-hover:scale-110 transition-transform">
                      {member.photo_url ? (
                        <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-blue-500 font-black">?</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white truncate group-hover:text-blue-400 transition-colors">{member.name}</h3>
                      <p className="text-awt-text-secondary text-xs uppercase tracking-widest">{member.role}</p>
                    </div>
                    <div className="flex gap-4">
                       <button onClick={() => handleEdit(member)} className="text-blue-500 opacity-0 group-hover:opacity-100 hover:text-white transition-all">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                       </button>
                       <button onClick={() => handleDelete(member.id)} className="text-red-500 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                       </button>
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

export default TeamManager;
