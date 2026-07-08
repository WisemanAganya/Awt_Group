import React from 'react';
import { Link } from 'react-router-dom';
import { navLinks } from '../constants';
import { InstagramIcon, TwitterIcon, LinkedInIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-black text-white/70 pt-[80px]">
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-[32px] lg:gap-[40px] pb-[60px] border-b border-white/10">
          
          <div className="flex flex-col">
            <Link to="/" className="flex items-center gap-[10px] group w-fit">
              <img src="/assets/img/logo.png" alt="AWT Group" className="h-[52px] w-auto object-contain drop-shadow-sm rounded-[4px] bg-white/5 p-1" />
              <span className="font-bold text-[19px] text-white">AWT <span className="font-normal text-white/50">Group</span></span>
            </Link>
            <p className="text-[13.5px] leading-[1.7] text-white/50 my-[18px] max-w-[280px]">
              Transforming businesses and lives through innovation — strategy, engineering and product, delivered by one accountable team.
            </p>
            <div className="flex gap-[10px]">
              <a href="#" className="w-[34px] h-[34px] border border-white/20 rounded-full flex items-center justify-center text-white/70 hover:border-brand-gold hover:text-brand-gold transition-colors">
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-[34px] h-[34px] border border-white/20 rounded-full flex items-center justify-center text-white/70 hover:border-brand-gold hover:text-brand-gold transition-colors">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-[34px] h-[34px] border border-white/20 rounded-full flex items-center justify-center text-white/70 hover:border-brand-gold hover:text-brand-gold transition-colors">
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-col">
            <h4 className="font-mono text-[11.5px] tracking-[0.1em] text-brand-gold uppercase mb-[20px]">Company</h4>
            <ul className="flex flex-col gap-[12px]">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-[13.5px] opacity-65 hover:opacity-100 transition-opacity">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="font-mono text-[11.5px] tracking-[0.1em] text-brand-gold uppercase mb-[20px]">Products</h4>
            <ul className="flex flex-col gap-[12px]">
              <li>
                <Link to="/products/biztracker-pro" className="text-[13.5px] opacity-65 hover:opacity-100 transition-opacity">
                  Mysales
                </Link>
              </li>
              <li>
                <Link to="/products/twende" className="text-[13.5px] opacity-65 hover:opacity-100 transition-opacity">
                  Twende House Hunting
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[13.5px] opacity-65 hover:opacity-100 transition-opacity">
                  Request a demo
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="font-mono text-[11.5px] tracking-[0.1em] text-brand-gold uppercase mb-[20px]">Get in touch</h4>
            <ul className="flex flex-col gap-[14px]">
              <li className="flex gap-[10px] text-[13.5px] opacity-75">Nyayo Highrise, Lang'ata Nairobi, Kenya</li>
              <li className="flex gap-[10px] text-[13.5px] opacity-75">+254 714 441 312</li>
              <li className="flex gap-[10px] text-[13.5px] opacity-75">info@awtgroup.co.ke</li>
            </ul>
          </div>

        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center py-[26px] text-[12.5px] text-white/45 gap-4">
          <div>© {new Date().getFullYear()} AWT Group. All rights reserved.</div>
          <div className="flex gap-[22px]">
            <Link to="#" className="hover:text-white transition-colors">Privacy policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
