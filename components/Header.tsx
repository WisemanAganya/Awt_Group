import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { navLinks } from '../constants';
import { cn } from './ui/utils';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => setIsOpen(false), [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white/92 backdrop-blur-md border-b border-ui-line">
      <div className="relative h-0">
        <svg viewBox="0 0 1200 46" preserveAspectRatio="none" className="absolute top-[-1px] left-0 w-full h-[46px]">
          <path d="M0,46 Q600,-10 1200,46" fill="none" stroke="rgba(30,79,214,0.18)" strokeWidth="1.5"/>
        </svg>
      </div>
      <div className="wrap flex items-center justify-between h-[92px] relative">
        <Link to="/" className="flex items-center gap-[10px] group">
          <img src="/assets/img/logo.png" alt="AWT Group" className="h-[46px] w-auto object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105" />
          <span className="font-bold text-[19px] text-content-primary">AWT <span className="font-normal text-content-secondary transition-colors group-hover:text-brand-blue">Group</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-[2px]">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="relative px-[18px] py-[10px] text-[13.5px] font-medium flex flex-col items-center gap-2 text-content-primary opacity-80 hover:opacity-100 transition-opacity group"
            >
              {link.name}
              <span className={cn(
                "w-[5px] h-[5px] rounded-full transition-all duration-300",
                location.pathname === link.path 
                  ? "bg-brand-gold shadow-nav-node" 
                  : "bg-ui-line group-hover:bg-brand-gold group-hover:shadow-nav-node"
              )}></span>
            </Link>
          ))}
          
          {/* Products Dropdown */}
          <div className="relative group flex flex-col items-center gap-2 px-[18px] py-[10px] cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
            <span className="text-[13.5px] font-medium flex items-center gap-1">
              Products <ChevronDown className="w-3 h-3 transition-transform group-hover:-rotate-180" />
            </span>
            <span className="w-[5px] h-[5px] rounded-full bg-ui-line group-hover:bg-brand-gold group-hover:shadow-nav-node transition-all duration-300"></span>
            
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="bg-white border border-ui-line p-2 rounded-[2px] shadow-card w-64 flex flex-col">
                <Link to="/products/biztracker-pro" className="p-3 hover:bg-surface transition-colors">
                  <div className="font-semibold text-[13.5px] text-content-primary">Mysales</div>
                  <div className="text-[12px] text-content-secondary mt-1">SME's Management</div>
                </Link>
                <Link to="/products/twende" className="p-3 hover:bg-surface transition-colors">
                  <div className="font-semibold text-[13.5px] text-content-primary">Twende House Hunting</div>
                  <div className="text-[12px] text-content-secondary mt-1">Real Estate Ecosystem</div>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/contact" className="cta-btn">Start a project →</Link>
          {user && (
            <Link to="/hq" className="text-[13.5px] font-semibold text-brand-blue hover:text-brand-gold transition-colors">
              Admin HQ
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-content-primary focus:outline-none"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white pointer-events-auto flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-ui-line">
              <Link to="/" className="flex items-center gap-[10px]" onClick={() => setIsOpen(false)}>
                <img src="/assets/img/logo.png" alt="AWT Group" className="h-[36px] w-auto object-contain drop-shadow-sm" />
                <span className="font-bold text-[19px] text-content-primary">AWT <span className="font-normal text-content-secondary">Group</span></span>
              </Link>
              <button onClick={() => setIsOpen(false)} className="p-2 text-content-primary">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              <nav className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    className="text-xl font-display font-semibold text-content-primary hover:text-brand-blue transition-colors flex items-center gap-4"
                  >
                    <span className={cn("w-2 h-2 rounded-full", location.pathname === link.path ? "bg-brand-gold" : "bg-ui-line")}></span>
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="h-px w-full bg-ui-line my-4" />
              <div>
                <h4 className="font-mono text-[11px] tracking-[0.1em] text-brand-gold uppercase mb-6">Our Products</h4>
                <div className="flex flex-col gap-6">
                  <Link to="/products/biztracker-pro" className="text-lg font-semibold text-content-primary hover:text-brand-blue transition-colors">
                    Mysales
                  </Link>
                  <Link to="/products/twende" className="text-lg font-semibold text-content-primary hover:text-brand-blue transition-colors">
                    Twende House Hunting
                  </Link>
                </div>
              </div>
              <div className="mt-auto pt-8 flex flex-col gap-4">
                <Link to="/contact" className="cta-btn justify-center w-full py-4 text-base">Start a project →</Link>
                {user && (
                  <Link to="/hq" className="ghost-btn text-center w-full py-4 text-base">Admin Console</Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;




