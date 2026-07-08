import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import Logo from '../components/Logo';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            navigate('/hq');
        }
    };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-mesh-gradient opacity-30 z-0 pointer-events-none" />
      
      <div className="max-w-md w-full relative z-10">
        <motion.div 
          initial="hidden" animate="visible" variants={fadeIn}
          className="glass-panel p-10 sm:p-12 rounded-[2.5rem] border-brand-blue/20 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 blur-[80px] rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
          
          <div className="text-center mb-10 relative z-10">
            <div className="inline-flex justify-center items-center w-20 h-20 rounded-3xl bg-brand-blue/10 border border-brand-blue/20 mb-6 text-brand-blue shadow-lg">
               <ShieldCheck className="w-10 h-10" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mb-3">Admin Gateway</h2>
            <p className="text-content-secondary text-sm">Secure access to AWT Control Center</p>
          </div>

          <form className="space-y-6 relative z-10" onSubmit={handleLogin}>
            
            {error && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start backdrop-blur-sm">
                <AlertCircle className="w-5 h-5 mr-3 shrink-0 mt-0.5" />
                <span>Access Denied: {error}</span>
              </motion.div>
            )}

            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-content-secondary uppercase tracking-widest mb-2 block ml-2">Email Protocol</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-content-secondary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email" required
                    className="w-full bg-surface/50 border border-glass-border rounded-2xl pl-12 pr-6 py-4 text-white placeholder-content-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-all"
                    placeholder="admin@awtgroup.co.ke"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-content-secondary uppercase tracking-widest mb-2 block ml-2">Security Cipher</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-content-secondary">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type="password" required
                    className="w-full bg-surface/50 border border-glass-border rounded-2xl pl-12 pr-6 py-4 text-white placeholder-content-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-all"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 mt-8 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Authenticate
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
            
            <div className="text-center pt-6 border-t border-glass-border mt-8">
              <Link to="/" className="text-xs font-bold text-content-secondary hover:text-white uppercase tracking-widest transition-colors inline-flex items-center">
                Return to Surface
              </Link>
            </div>
          </form>
        </motion.div>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 text-center">
          <Logo className="h-6 mx-auto mb-4 opacity-50 grayscale" />
          <p className="text-[10px] font-bold text-content-secondary/50 uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} AWT GROUP DIGITAL DEFENSE SYSTEM
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;




