import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-12' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg viewBox="0 0 52 52" className="h-full w-auto mr-3" aria-hidden="true">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#00a3e0', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0057b8', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path
          d="M46 2H6C3.79 2 2 3.79 2 6V22.5H21C23.76 22.5 26 24.74 26 27.5S23.76 32.5 21 32.5H2V46C2 48.21 3.79 50 6 50H46C48.21 50 50 48.21 50 46V29.5H31C28.24 29.5 26 27.26 26 24.5S28.24 19.5 31 19.5H50V6C50 3.79 48.21 2 46 2Z"
          fill="url(#logoGradient)"
        />
      </svg>
      <div className="flex flex-col justify-center">
        <span className="text-3xl font-extrabold text-awt-dark tracking-tighter leading-none">AWT</span>
        <span className="text-3xl font-extrabold text-awt-dark tracking-tighter leading-none">GROUP</span>
        <span className="text-xs font-medium text-awt-gray tracking-widest mt-1">INNOVATING THE FUTURE</span>
      </div>
    </div>
  );
};

export default Logo;