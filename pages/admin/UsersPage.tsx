import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../supabaseClient';

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { session } = useAuth();
    const API_URL = '/api/admin'; // Relative path (proxied)

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;

            if (!token) return;

            const response = await fetch(`${API_URL}/users`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch users');

            const data = await response.json();
            setUsers(data.users || []);
        } catch (error) {
            console.error('Error fetching users:', error);
            // Fallback for demo if server not running (or no users returned)
            // setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleUpdate = async (id: string, newRole: string) => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;

            const response = await fetch(`${API_URL}/users/${id}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ role: newRole })
            });

            if (!response.ok) throw new Error('Failed to update role');

            // Update local state
            setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
            alert('User role updated!');
        } catch (error) {
            console.error('Error updating role:', error);
            alert('Failed to update role');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

        try {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;

            const response = await fetch(`${API_URL}/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to delete user');

            setUsers(users.filter(u => u.id !== id));
            alert('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user');
        }
    };

    if (loading) return <div className="p-6">Loading users...</div>;

  return (
    <div className="min-h-screen pt-4 pb-20 relative">
      <div className="container-premium relative z-10 reveal">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-4">
              <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Entity Registry</span>
            </div>
            <h1 className="text-5xl font-extrabold text-white tracking-tight leading-tight">Entity <span className="text-blue-500 italic">Access</span></h1>
          </div>
          <button onClick={fetchUsers} className="btn-secondary px-8 py-3 text-sm flex items-center">
            <svg className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            Re-Sync Registry
          </button>
        </div>

        <div className="glass-card overflow-hidden reveal">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/5">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-8 py-6 text-left text-[10px] font-bold text-blue-400 uppercase tracking-widest">Identification (Email)</th>
                  <th className="px-8 py-6 text-left text-[10px] font-bold text-blue-400 uppercase tracking-widest">Clearance Level</th>
                  <th className="px-8 py-6 text-left text-[10px] font-bold text-blue-400 uppercase tracking-widest">Temporal Node (ID)</th>
                  <th className="px-8 py-6 text-right text-[10px] font-bold text-blue-400 uppercase tracking-widest">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user) => (
                  <tr key={user.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mr-4 group-hover:scale-110 transition-transform font-black">
                          {user.email?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-white truncate max-w-[200px]">{user.email}</div>
                          <div className="text-[10px] text-awt-text-secondary uppercase tracking-widest">{user.user_metadata?.name || 'Unregistered Entity'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                       <select
                          value={user.role || 'user'}
                          onChange={(e) => handleRoleUpdate(user.id, e.target.value)}
                          className={`bg-white/5 border border-white/10 rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-widest cursor-pointer focus:ring-2 focus:ring-blue-500/50 transition-all ${
                            user.role === 'admin' ? 'text-blue-400 border-blue-500/30 bg-blue-500/5' : 'text-awt-text-secondary'
                          }`}
                        >
                          <option value="user" className="bg-awt-bg">Standard User</option>
                          <option value="admin" className="bg-awt-bg">System Admin</option>
                        </select>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-[10px] text-white/20 font-mono tracking-tighter">
                      {user.id}
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-right">
                      <button 
                        onClick={() => handleDelete(user.id)} 
                        className="text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 text-red-500 hover:text-white hover:bg-red-500 rounded-full transition-all"
                      >
                        Purge Entity
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {users.length === 0 && !loading && (
             <div className="py-20 text-center text-awt-text-secondary text-sm">No entities detected in the current registry scope.</div>
          )}
        </div>
      </div>
    </div>
  );

};

export default UsersPage;
