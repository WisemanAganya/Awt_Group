import React, { useEffect } from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const AdminLayout: React.FC = () => {
    const { user, isAdmin, loading, signOut } = useAuth();

    if (loading) return <div className="p-10 text-center">Loading admin panel...</div>;

    if (!user || !isAdmin) {
        // Determine where to redirect based on auth state
        return <Navigate to="/" replace />;
    }

  return (
    <div className="min-h-screen relative flex">
      <div className="bg-mesh"></div>
      
      {/* Sidebar - State-of-the-Art Glass */}
      <aside className="w-80 relative z-20 hidden lg:block p-8">
        <div className="glass-card h-full flex flex-col backdrop-blur-3xl border-white/10">
          <div className="p-8 border-b border-white/5">
            <Logo className="h-12 mb-2" />
            <p className="text-[9px] font-bold text-blue-400 uppercase tracking-[0.4em] ml-1 mt-4">Command Center</p>
          </div>
          
          <nav className="flex-grow p-6 space-y-2 overflow-y-auto custom-scrollbar">
            {[
              { path: '/hq', label: 'Matrix Overview', icon: 'M' },
              { path: '/hq/content', label: 'Neural Content', icon: 'C' },
              { path: '/hq/hero', label: 'Visual Engine', icon: 'V' },
              { path: '/hq/services', label: 'Core Modules', icon: 'S' },
              { path: '/hq/portfolio', label: 'Archival Vault', icon: 'A' },
              { path: '/hq/team', label: 'Vanguard Unit', icon: 'T' },
              { path: '/hq/messages', label: 'Incoming Signal', icon: 'I' },
              { path: '/hq/reports', label: 'Data Analytics', icon: 'D' },
              { path: '/hq/products', label: 'Product Lab', icon: 'P' },
              { path: '/hq/users', label: 'Entity Access', icon: 'E' },
              { path: '/hq/logs', label: 'Audit Ledger', icon: 'L' },
              { path: '/hq/settings', label: 'System Core', icon: 'G' },
            ].map(item => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`flex items-center gap-4 py-3 px-5 rounded-xl transition-all group ${
                  window.location.pathname === item.path ? 'bg-blue-500 text-white shadow-[0_0_20px_rgba(0,87,184,0.4)]' : 'text-awt-text-secondary hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black ${
                   window.location.pathname === item.path ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'
                }`}>{item.icon}</span>
                <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-6 border-t border-white/5">
            <button
              onClick={async () => {
                await signOut();
                window.location.href = '/';
              }}
              className="w-full flex items-center gap-4 py-4 px-6 rounded-xl text-red-400 bg-red-500/5 hover:bg-red-500 hover:text-white transition-all group"
            >
              <span className="w-6 h-6 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4-4H7m6 4v1h8"></path></svg>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest">Terminate Session</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-10 p-8 h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden glass-card p-6 flex justify-between items-center mb-8">
          <Logo className="h-8" />
          <button className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </header>

        {/* Dynamic Outlet with Custom Scrollbar */}
        <main className="flex-1 overflow-y-auto custom-scrollbar pr-4 pb-20">
          <Outlet />
        </main>
      </div>
    </div>
  );

};

export default AdminLayout;
