import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon } from './icons';
import { useAuth } from '../context/AuthContext';
import { navLinks } from '../constants';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'top-4' : 'top-0'}`}>
      <div className="container-premium">
        <div className={`transition-all duration-500 ${isScrolled ? 'glass-card mx-auto px-8 py-0' : 'bg-transparent py-4'}`}>
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-2 group">
              <Logo className="h-10" />
            </Link>

            <div className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className="text-sm font-medium text-awt-text-secondary hover:text-white transition-colors relative group/link"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover/link:w-full"></span>
                </Link>
              ))}
              
              <div className="relative group py-6">
                <button className="text-sm font-medium text-awt-text-secondary hover:text-white transition-colors flex items-center">
                  Products <svg className="w-4 h-4 ml-1 opacity-70 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-0 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <div className="glass-card mt-2 p-2 shadow-2xl border border-white/10">
                    <Link to="/products/biztracker-pro" className="flex items-start gap-4 p-4 hover:bg-white/5 rounded-xl transition-colors group/item">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover/item:bg-blue-500 group-hover/item:text-white transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white">BizTracker Pro</div>
                        <div className="text-[10px] text-awt-text-secondary mt-1 uppercase tracking-widest font-bold">Business Management</div>
                      </div>
                    </Link>
                    <Link to="/products/twende" className="flex items-start gap-4 p-4 hover:bg-white/5 rounded-xl transition-colors group/item mt-1">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover/item:bg-cyan-500 group-hover/item:text-white transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white">Twende House Hunting</div>
                        <div className="text-[10px] text-awt-text-secondary mt-1 uppercase tracking-widest font-bold">Real Estate</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {user ? (
                <Link to="/hq" className="btn-primary px-6 py-2 text-sm">
                  Admin Console
                </Link>
              ) : null}
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 focus:outline-none glass-card !rounded-lg !p-2">
                {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 z-40 bg-awt-bg/95 backdrop-blur-2xl transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="text-2xl font-bold text-white hover:text-blue-500 transition-colors" 
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px w-20 bg-white/10 my-4"></div>
          <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Our Products</div>
          <Link to="/products/biztracker-pro" className="text-lg font-medium text-awt-text-secondary hover:text-white" onClick={() => setIsOpen(false)}>BizTracker Pro</Link>
          <Link to="/products/twende" className="text-lg font-medium text-awt-text-secondary hover:text-white" onClick={() => setIsOpen(false)}>Twende House Hunting</Link>
          <div className="pt-8">
            {user ? (
              <Link to="/hq" className="btn-primary text-xl px-12 py-4" onClick={() => setIsOpen(false)}>Admin Console</Link>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );

};

export default Header;
