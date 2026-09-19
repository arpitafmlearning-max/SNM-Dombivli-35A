import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  glow?: boolean;
  watermark?: boolean;
}

export const MissionLogo: React.FC<LogoProps> = ({
  className = '',
  size = 72,
  glow = true,
  watermark = false,
}) => {
  if (watermark) {
    return (
      <div 
        className={`pointer-events-none select-none fixed inset-0 flex items-center justify-center overflow-hidden z-0 ${className}`}
        aria-hidden="true"
      >
        <img
          src="/nirankari-emblem-icon.png"
          alt=""
          className="w-[min(70vw,520px)] h-[min(70vw,520px)] object-contain opacity-[0.025] pointer-events-none"
        />
      </div>
    );
  }

  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div 
          className="absolute -inset-2 rounded-full bg-sky-400/20 blur-lg pointer-events-none transition-opacity duration-300"
          aria-hidden="true"
        />
      )}
      <div className="relative z-10 w-full h-full p-1 rounded-full bg-white shadow-xs border border-sky-100 flex items-center justify-center">
        <img
          src="/nirankari-emblem-icon.png"
          alt="Sant Nirankari Mission Official Emblem"
          width={size}
          height={size}
          className="w-full h-full object-contain rounded-full transform transition-transform duration-300 hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};
