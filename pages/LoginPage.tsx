import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo';

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
            // Check role or redirect to dashboard (logic can vary)
            navigate('/hq');
        }
    };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-mesh"></div>
      
      <div className="max-w-md w-full relative z-10 reveal">
        <div className="glass-card p-12 backdrop-blur-3xl border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
          <div className="text-center mb-10">
            <Logo className="h-16 justify-center mb-10" />
            <h2 className="text-4xl font-extrabold text-white tracking-tight leading-tight">Admin Gateway</h2>
            <p className="mt-4 text-awt-text-secondary text-sm">Secure access to AWT Control Center</p>
          </div>

          <form className="space-y-8" onSubmit={handleLogin}>
            <div className="space-y-6">
              <div className="relative group">
                <label htmlFor="email-address" className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-4 mb-2 block">Email Protocol</label>
                <div className="relative">
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    placeholder="Enter admin identifier..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-blue-500/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity"></div>
                </div>
              </div>

              <div className="relative group">
                <label htmlFor="password" className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-4 mb-2 block">Security Cipher</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    placeholder="Enter encryption key..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-blue-500/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity"></div>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center animate-pulse">
                Access Denied: {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-lg shadow-[0_0_40px_rgba(0,87,184,0.3)] hover:shadow-[0_0_60px_rgba(0,87,184,0.5)] flex items-center justify-center group"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Authenticate
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </>
              )}
            </button>
            
            <div className="text-center pt-4">
              <Link to="/" className="text-[10px] font-bold text-awt-text-secondary hover:text-white uppercase tracking-[0.2em] transition-colors">
                Return to Surface
              </Link>
            </div>
          </form>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">
            &copy; 2026 AWT GROUP DIGITAL DEFENSE SYSTEM
          </p>
        </div>
      </div>
    </div>
  );

};

export default LoginPage;
