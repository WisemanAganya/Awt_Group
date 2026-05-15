import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { navLinks } from '../constants';
import { FacebookIcon, TwitterIcon, LinkedInIcon, InstagramIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-awt-bg pt-20 border-t border-white/5 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container-premium relative z-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Brand Identity */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-8 group">
              <Logo className="h-14" />
            </Link>
            <p className="text-awt-text-secondary text-sm leading-relaxed mb-8 max-w-xs">
              Pioneering the digital frontier with state-of-the-art solutions that transform businesses and empower lives through relentless innovation.
            </p>
            <div className="flex space-x-4">
              {[FacebookIcon, TwitterIcon, LinkedInIcon, InstagramIcon].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-awt-text-secondary hover:text-white hover:bg-blue-600/20 hover:border-blue-500/50 border border-transparent transition-all duration-300">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Matrix */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 tracking-tight">Ecosystem</h3>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-awt-text-secondary hover:text-white transition-all duration-300 text-sm flex items-center group">
                    <span className="w-1 h-1 rounded-full bg-blue-500 mr-0 opacity-0 group-hover:mr-3 group-hover:opacity-100 transition-all"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Global Operations */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 tracking-tight">Global Reach</h3>
            <ul className="space-y-6">
              <li className="flex items-start group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-blue-400 mr-4 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-awt-text-secondary uppercase tracking-widest mb-1">Headquarters</div>
                  <div className="text-sm text-white">Nairobi, Kenya</div>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-cyan-400 mr-4 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-awt-text-secondary uppercase tracking-widest mb-1">Email Inquiries</div>
                  <div className="text-sm text-white">awtgroup.co.ke</div>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-blue-400 mr-4 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-awt-text-secondary uppercase tracking-widest mb-1">Call Us</div>
                  <div className="text-sm text-white">+254 714 441 312</div>
                </div>
              </li>

            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="glass-card p-8 relative group">
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h3 className="text-white font-bold text-lg mb-4 tracking-tight relative z-10">Stay Ahead</h3>
            <p className="text-awt-text-secondary text-xs mb-6 relative z-10 leading-relaxed">
              Get the latest insights on digital transformation and innovation delivered to your inbox.
            </p>
            <div className="relative z-10">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all mb-4"
              />
              <button className="w-full btn-primary !py-3 !text-xs !rounded-xl">Subscribe Now</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-white/[0.02]">
        <div className="container-premium py-8 flex flex-col md:flex-row justify-between items-center text-xs font-medium text-awt-text-secondary uppercase tracking-widest">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} AWT Group // Digital Vanguard
          </div>
          <div className="flex space-x-8">
             <a href="#" className="hover:text-blue-400 transition-colors">Privacy Architecture</a>
             <a href="#" className="hover:text-blue-400 transition-colors">Security Protocol</a>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
