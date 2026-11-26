import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  isLight?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', isLight = false }) => {
  return (
    <Link to="/" className={`inline-flex items-center gap-2 group tracking-tight select-none ${className}`}>
      {/* Premium Minimal Icon Graphic */}
      <div className="w-8 h-8 rounded-lg bg-[#0F172A] border border-blue-500/20 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
        <div className="w-3.5 h-3.5 rounded-full border-2 border-[#2563EB] flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
        </div>
      </div>
      {/* Brand Name Text: Gap in Primary / White, Zero in Royal Blue */}
      <span className={`text-2xl font-extrabold tracking-tight ${isLight ? 'text-white' : 'text-[#0F172A]'}`}>
        Gap<span className="text-[#2563EB] relative">Zero
          <span className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#2563EB] to-transparent opacity-80" />
        </span>
      </span>
    </Link>
  );
};
