import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, FileText, Image as ImageIcon, Briefcase, 
  FolderOpen, Users, MessageSquare, PieChart, Package, 
  ShieldCheck, History, Settings, LogOut, Menu, X, ChevronLeft, ChevronRight
} from 'lucide-react';
import Logo from './Logo';

const AdminLayout: React.FC = () => {
    const { user, isAdmin, loading, signOut } = useAuth();
    const location = useLocation();
    
    // Sidebar state
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Auto-close mobile sidebar on route change
    useEffect(() => {
      setIsMobileOpen(false);
    }, [location.pathname]);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" /></div>;

    if (!user || !isAdmin) {
        return <Navigate to="/" replace />;
    }

    const navItems = [
      { path: '/hq', label: 'Matrix Overview', icon: LayoutDashboard },
      { path: '/hq/content', label: 'Neural Content', icon: FileText },
      { path: '/hq/hero', label: 'Visual Engine', icon: ImageIcon },
      { path: '/hq/services', label: 'Core Modules', icon: Briefcase },
      { path: '/hq/portfolio', label: 'Archival Vault', icon: FolderOpen },
      { path: '/hq/team', label: 'Vanguard Unit', icon: Users },
      { path: '/hq/messages', label: 'Incoming Signal', icon: MessageSquare },
      { path: '/hq/reports', label: 'Data Analytics', icon: PieChart },
      { path: '/hq/products', label: 'Product Lab', icon: Package },
      { path: '/hq/users', label: 'Entity Access', icon: ShieldCheck },
      { path: '/hq/logs', label: 'Audit Ledger', icon: History },
      { path: '/hq/settings', label: 'System Core', icon: Settings },
    ];

    const sidebarVariants = {
      expanded: { width: '280px', transition: { duration: 0.3, ease: 'easeInOut' } },
      collapsed: { width: '80px', transition: { duration: 0.3, ease: 'easeInOut' } }
    };

    const mobileSidebarVariants = {
      closed: { x: '-100%', transition: { duration: 0.3, ease: 'easeInOut' } },
      open: { x: 0, transition: { duration: 0.3, ease: 'easeInOut' } }
    };

  return (
    <div className="min-h-screen relative flex bg-background overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-mesh-gradient opacity-20 pointer-events-none" />

      {/* Desktop Sidebar */}
      <motion.aside 
        initial="expanded"
        animate={isCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        className="relative z-30 hidden lg:flex flex-col border-r border-glass-border bg-surface/50 backdrop-blur-xl h-screen shadow-2xl"
      >
        <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} border-b border-glass-border h-20 shrink-0`}>
          {!isCollapsed && <Logo className="h-8" />}
          {isCollapsed && <ShieldCheck className="w-8 h-8 text-brand-blue" />}
          
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-content-secondary hover:text-white border border-glass-border hover:border-brand-blue/50 transition-colors absolute -right-4 top-6 z-40"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-3 space-y-1">
          {!isCollapsed && (
             <div className="px-4 mb-4">
               <p className="text-[10px] font-bold text-content-secondary uppercase tracking-widest">Command Modules</p>
             </div>
          )}
          
          {navItems.map(item => {
            const isActive = location.pathname === item.path || (item.path !== '/hq' && location.pathname.startsWith(item.path));
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.path}
                to={item.path} 
                className={`flex items-center rounded-xl transition-all group relative overflow-hidden ${
                  isActive 
                    ? 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20' 
                    : 'text-content-secondary hover:bg-surface hover:text-white border border-transparent'
                } ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3 gap-3'}`}
                title={isCollapsed ? item.label : undefined}
              >
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-blue rounded-r-full" />}
                <Icon className={`shrink-0 ${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} ${isActive ? 'text-brand-blue' : 'group-hover:text-white transition-colors'}`} />
                
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span 
                      initial={{ opacity: 0, w: 0 }}
                      animate={{ opacity: 1, w: 'auto' }}
                      exit={{ opacity: 0, w: 0 }}
                      className="text-sm font-semibold truncate"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-glass-border shrink-0">
           <button
             onClick={async () => {
               await signOut();
               window.location.href = '/';
             }}
             className={`flex items-center rounded-xl transition-all group w-full text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3 gap-3'}`}
             title={isCollapsed ? 'Terminate Session' : undefined}
           >
             <LogOut className={`shrink-0 ${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'}`} />
             <AnimatePresence>
               {!isCollapsed && (
                 <motion.span 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="text-sm font-semibold whitespace-nowrap"
                 >
                   Terminate Session
                 </motion.span>
               )}
             </AnimatePresence>
           </button>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.aside 
              initial="closed" animate="open" exit="closed" variants={mobileSidebarVariants}
              className="fixed inset-y-0 left-0 w-72 bg-surface border-r border-glass-border z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 flex items-center justify-between border-b border-glass-border h-20 shrink-0">
                <Logo className="h-8" />
                <button onClick={() => setIsMobileOpen(false)} className="p-2 text-content-secondary hover:text-white rounded-lg bg-background border border-glass-border">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                {navItems.map(item => {
                  const isActive = location.pathname === item.path || (item.path !== '/hq' && location.pathname.startsWith(item.path));
                  const Icon = item.icon;
                  return (
                    <Link 
                      key={item.path} to={item.path} 
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive ? 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20' : 'text-content-secondary hover:bg-background border border-transparent'
                      }`}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      <span className="text-sm font-semibold">{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="p-4 border-t border-glass-border shrink-0">
                 <button onClick={async () => { await signOut(); window.location.href = '/'; }} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20">
                   <LogOut className="w-5 h-5 shrink-0" />
                   <span className="text-sm font-semibold">Terminate Session</span>
                 </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-10 h-screen overflow-hidden">
        
        {/* Mobile Header */}
        <header className="lg:hidden h-20 border-b border-glass-border bg-surface/50 backdrop-blur-xl flex justify-between items-center px-6 shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileOpen(true)} className="p-2 text-white hover:bg-background rounded-lg border border-glass-border transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
          <Logo className="h-7" />
          <div className="w-9" /> {/* Spacer for centering */}
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-4 lg:p-8 relative">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;




