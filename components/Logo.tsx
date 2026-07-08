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
        <span className="text-2xl md:text-3xl font-black text-awt-text-primary tracking-[0.45em] leading-none font-display">AWT <span className="text-blue-500 italic">GROUP</span></span>
        <span className="text-[6px] md:text-[7px] font-bold text-blue-400 uppercase tracking-[0.12em] mt-1 hidden md:block">Transforming Businesses and Lives through Innovation</span>
      </div>
    </div>
  );
};

export default Logo;



