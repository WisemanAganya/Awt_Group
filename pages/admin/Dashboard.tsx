import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, Briefcase, FolderOpen, MessageSquare, 
  RefreshCw, Globe, Activity, Plus, FileUp, Settings, ShieldAlert
} from 'lucide-react';

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

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

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

    if (loading) return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="pb-12 max-w-7xl mx-auto">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <motion.div variants={fadeIn}>
            <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">System Operational</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              Control <span className="text-brand-blue italic">Center</span>
            </h1>
          </motion.div>
          
          <motion.div variants={fadeIn} className="flex gap-4">
            <button onClick={fetchDashboardData} className="btn-secondary px-6 py-2.5 text-sm flex items-center">
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh Matrix
            </button>
            <Link to="/" className="btn-primary px-6 py-2.5 text-sm flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              Live Site
            </Link>
          </motion.div>
        </div>

        {/* Stats Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            title="Total Entities"
            value={stats.usersCount}
            subtitle="Verified Profiles"
            link="/hq/users"
            icon={Users}
            colorClass="text-brand-blue"
            bgClass="bg-brand-blue/10 border-brand-blue/20"
          />
          <StatCard
            title="Core Systems"
            value={stats.servicesCount}
            subtitle="Active Modules"
            link="/hq/services"
            icon={Briefcase}
            colorClass="text-brand-yellow"
            bgClass="bg-brand-yellow/10 border-brand-yellow/20"
          />
          <StatCard
            title="Archived Works"
            value={stats.projectsCount}
            subtitle="Portfolio Items"
            link="/hq/portfolio"
            icon={FolderOpen}
            colorClass="text-brand-blue-light"
            bgClass="bg-brand-blue-light/10 border-brand-blue-light/20"
          />
          <StatCard
            title="Incoming Signal"
            value={stats.unreadMessages}
            subtitle="New Communications"
            link="/hq/messages"
            icon={MessageSquare}
            colorClass="text-red-400"
            bgClass="bg-red-500/10 border-red-500/20"
            alert={stats.unreadMessages > 0}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Transmission Activity */}
          <motion.div variants={fadeIn} className="lg:col-span-2 glass-panel p-8 rounded-3xl">
            <div className="flex justify-between items-center mb-8 border-b border-glass-border pb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface border border-glass-border flex items-center justify-center text-white">
                  <Activity className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">Access Log Matrix</h2>
              </div>
              <Link to="/hq/logs" className="text-[10px] font-bold text-brand-blue uppercase tracking-widest hover:text-white transition-colors">Complete Ledger &rarr;</Link>
            </div>
            
            <div className="space-y-4">
              {recentLogs.length === 0 ? (
                <div className="text-center py-16 bg-surface/50 border border-dashed border-glass-border rounded-2xl">
                  <p className="text-content-secondary text-sm">No transmissions detected in the current cycle.</p>
                </div>
              ) : (
                recentLogs.map((log) => (
                  <div key={log.id} className="flex items-center p-5 bg-surface/30 border border-glass-border rounded-2xl group hover:bg-surface/80 transition-all cursor-default">
                    <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mr-5 border border-brand-blue/20 group-hover:scale-110 transition-transform">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-white font-bold text-base mb-1">{log.action}</p>
                      <p className="text-content-secondary text-xs uppercase tracking-widest">{new Date(log.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>

          {/* Quick Command Matrix */}
          <motion.div variants={fadeIn} className="lg:col-span-1 space-y-8">
            <div className="glass-panel p-8 rounded-3xl bg-brand-blue/5 border-brand-blue/20">
              <h2 className="text-xl font-bold text-white mb-6 tracking-tight">Command Center</h2>
              <div className="grid gap-4">
                <Link to="/hq/services" className="flex items-center p-4 bg-brand-blue/10 border border-brand-blue/20 rounded-xl text-brand-blue hover:bg-brand-blue hover:text-background transition-all group">
                   <Plus className="w-5 h-5 mr-3" />
                   <span className="text-xs font-bold uppercase tracking-widest">Deploy Service</span>
                </Link>
                <Link to="/hq/portfolio" className="flex items-center p-4 bg-brand-yellow/10 border border-brand-yellow/20 rounded-xl text-brand-yellow hover:bg-brand-yellow hover:text-background transition-all group">
                   <FileUp className="w-5 h-5 mr-3" />
                   <span className="text-xs font-bold uppercase tracking-widest">Upload Project</span>
                </Link>
                <Link to="/hq/settings" className="flex items-center p-4 bg-surface border border-glass-border rounded-xl text-content-secondary hover:bg-white hover:text-background transition-all group">
                   <Settings className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform" />
                   <span className="text-xs font-bold uppercase tracking-widest">System Protocols</span>
                </Link>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-3xl">
              <h2 className="text-lg font-bold text-white mb-6 tracking-tight">Active Analysts</h2>
              <div className="flex -space-x-3 mb-6">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden bg-surface relative z-10 hover:z-20 transition-transform hover:scale-110 cursor-pointer">
                     <img src={`https://i.pravatar.cc/100?u=${i}`} alt="analyst" className="w-full h-full object-cover" />
                   </div>
                 ))}
                 <div className="w-10 h-10 rounded-full border-2 border-background bg-brand-blue flex items-center justify-center text-[10px] font-bold text-background relative z-10">+5</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-surface rounded-xl border border-glass-border">
                 <span className="text-[10px] font-bold text-content-secondary uppercase tracking-widest">Encryption status</span>
                 <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Level 4</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  subtitle: string;
  link: string;
  icon: React.ElementType;
  colorClass: string;
  bgClass: string;
  alert?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, link, icon: Icon, colorClass, bgClass, alert }) => (
  <motion.div variants={fadeIn}>
    <Link to={link} className="block group h-full">
      <div className="glass-panel p-6 sm:p-8 flex flex-col justify-between h-full group-hover:bg-surface/80 transition-all duration-500 rounded-3xl relative overflow-hidden">
        {alert && (
          <div className="absolute top-6 right-6 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </div>
        )}
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform ${bgClass} ${colorClass}`}>
          <Icon className="w-7 h-7" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-content-secondary uppercase tracking-[0.2em] mb-2">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-display font-extrabold text-white tracking-tighter">{value}</p>
            <p className="text-[9px] font-bold text-content-secondary uppercase tracking-widest">{subtitle}</p>
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

export default AdminDashboard;




