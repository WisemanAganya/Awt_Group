import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-12' }) => {
  const [logoUrl, setLogoUrl] = useState<string>('');

  useEffect(() => {
    const fetchLogo = async () => {
      const { data } = await supabase
        .from('system_settings')
        .select('value')
        .eq('key', 'site_logo')
        .single();
      if (data) setLogoUrl(data.value);
    };
    fetchLogo();
  }, []);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src={logoUrl || "/assets/img/logo.jpeg"} 
        alt="AWT Group" 
        className="h-full w-auto object-contain transition-transform duration-500 hover:scale-110" 
      />
      <div className="flex flex-col">
        <span className="text-xl md:text-2xl font-black text-white tracking-tighter leading-none font-display">AWT <span className="text-blue-500 italic">GROUP</span></span>
        <span className="text-[8px] font-bold text-blue-400 uppercase tracking-[0.3em] mt-1 hidden md:block">Innovating the Future</span>
      </div>
    </div>
  );
};

export default Logo;