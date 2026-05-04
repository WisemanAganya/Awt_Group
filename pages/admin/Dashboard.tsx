import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Link } from 'react-router-dom';

interface DashboardStats {
    usersCount: number;
    servicesCount: number;
    projectsCount: number;
    unreadMessages: number;
}

interface AuditLog {
    id: string;
    action: string;
    created_at: string;
    details: any;
    user_id: string; // potentially join with profiles for name
}

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats>({
        usersCount: 0,
        servicesCount: 0,
        projectsCount: 0,
        unreadMessages: 0
    });
    const [recentLogs, setRecentLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [users, services, projects, messages, logs] = await Promise.all([
                supabase.from('profiles').select('*', { count: 'exact', head: true }),
                supabase.from('services').select('*', { count: 'exact', head: true }),
                supabase.from('portfolio_projects').select('*', { count: 'exact', head: true }),
                supabase.from('messages').select('*', { count: 'exact', head: true }).eq('is_read', false),
                supabase.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(5)
            ]);

            setStats({
                usersCount: users.count || 0,
                servicesCount: services.count || 0,
                projectsCount: projects.count || 0,
                unreadMessages: messages.count || 0
            });

            if (logs.data) {
                setRecentLogs(logs.data);
            }

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-6">Loading dashboard data...</div>;

  return (
    <div className="min-h-screen pt-4 pb-12 relative overflow-hidden">
      <div className="bg-mesh"></div>

      <div className="container-premium relative z-10 reveal">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-4">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
              </span>
              <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">System Operational</span>
            </div>
            <h1 className="text-5xl font-extrabold text-white tracking-tight leading-tight">Control <span className="text-blue-500 italic">Center</span></h1>
          </div>
          <div className="flex gap-4">
            <button onClick={fetchDashboardData} className="btn-secondary px-6 py-2 text-sm flex items-center">
              <svg className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              Refresh Matrix
            </button>
            <Link to="/" className="btn-primary px-6 py-2 text-sm flex items-center">
              Live Site
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </Link>
          </div>
        </div>

        {/* Stats Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <StatCard
            title="Total Entities"
            value={stats.usersCount}
            subtitle="Verified Profiles"
            link="/hq/users"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>}
            color="blue"
          />
          <StatCard
            title="Core Systems"
            value={stats.servicesCount}
            subtitle="Active Modules"
            link="/hq/services"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>}
            color="cyan"
          />
          <StatCard
            title="Archived Works"
            value={stats.projectsCount}
            subtitle="Portfolio Items"
            link="/hq/portfolio"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>}
            color="purple"
          />
          <StatCard
            title="Incoming Signal"
            value={stats.unreadMessages}
            subtitle="New Communications"
            link="/hq/messages"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>}
            color="red"
            alert={stats.unreadMessages > 0}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Recent Transmission Activity */}
          <div className="lg:col-span-2 glass-card p-10 reveal" style={{ animationDelay: '0.2s' }}>
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold text-white tracking-tight">Access Log Matrix</h2>
              <Link to="/hq/logs" className="text-[10px] font-bold text-blue-500 uppercase tracking-widest hover:text-white transition-colors">Complete Ledger &rarr;</Link>
            </div>
            <div className="space-y-6">
              {recentLogs.length === 0 ? (
                <div className="text-center py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-2xl">
                  <p className="text-awt-text-secondary text-sm">No transmissions detected in the current cycle.</p>
                </div>
              ) : (
                recentLogs.map((log) => (
                  <div key={log.id} className="flex items-center p-6 bg-white/[0.02] border border-white/5 rounded-2xl group hover:bg-white/[0.05] transition-all">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mr-6 group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div className="flex-grow">
                      <p className="text-white font-bold text-lg mb-1">{log.action}</p>
                      <p className="text-awt-text-secondary text-xs uppercase tracking-widest">{new Date(log.created_at).toLocaleString()}</p>
                    </div>
                    <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Command Matrix */}
          <div className="lg:col-span-1 space-y-8 reveal" style={{ animationDelay: '0.4s' }}>
            <div className="glass-card p-10 bg-blue-500/5 border-blue-500/20">
              <h2 className="text-2xl font-bold text-white mb-8 tracking-tight">Command Center</h2>
              <div className="grid gap-4">
                <Link to="/hq/services" className="flex items-center p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 hover:bg-blue-500 hover:text-white transition-all group">
                   <span className="text-sm font-bold uppercase tracking-widest">Deploy New Service</span>
                   <svg className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                </Link>
                <Link to="/hq/portfolio" className="flex items-center p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400 hover:bg-purple-500 hover:text-white transition-all group">
                   <span className="text-sm font-bold uppercase tracking-widest">Upload Project Case</span>
                   <svg className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                </Link>
                <Link to="/hq/settings" className="flex items-center p-4 bg-white/5 border border-white/10 rounded-xl text-awt-text-secondary hover:bg-white hover:text-awt-bg transition-all group">
                   <span className="text-sm font-bold uppercase tracking-widest">System Protocols</span>
                   <svg className="w-4 h-4 ml-auto group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </Link>
              </div>
            </div>

            <div className="glass-card p-10">
              <h2 className="text-xl font-bold text-white mb-6 tracking-tight">Active Analysts</h2>
              <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full border-2 border-awt-bg overflow-hidden bg-white/10">
                     <img src={`https://i.pravatar.cc/100?u=${i}`} alt="analyst" />
                   </div>
                 ))}
                 <div className="w-10 h-10 rounded-full border-2 border-awt-bg bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white">+5</div>
              </div>
              <p className="mt-4 text-[10px] font-bold text-awt-text-secondary uppercase tracking-widest">Encryption status: Level 4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: number; subtitle: string; link: string; icon: React.ReactNode; color: string; alert?: boolean }> = ({ title, value, subtitle, link, icon, color, alert }) => (
  <Link to={link} className="group">
    <div className="glass-card p-8 flex flex-col justify-between h-full group-hover:bg-white/[0.03] transition-all duration-500 border-white/5 relative overflow-hidden">
      {alert && (
        <div className="absolute top-4 right-4 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </div>
      )}
      <div className={`w-14 h-14 rounded-2xl bg-${color}-500/10 flex items-center justify-center text-${color}-500 mb-8 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-awt-text-secondary uppercase tracking-[0.2em] mb-2">{title}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-extrabold text-white tracking-tighter">{value}</p>
          <p className="text-[9px] font-bold text-awt-text-secondary uppercase tracking-widest">{subtitle}</p>
        </div>
      </div>
    </div>
  </Link>
);


export default AdminDashboard;
