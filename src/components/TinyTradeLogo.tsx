import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSlogan?: boolean;
  className?: string;
  isWhite?: boolean;
}

export const TinyTradeLogo: React.FC<LogoProps> = ({
  size = 'md',
  showSlogan = false,
  className = '',
  isWhite = false,
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Visual Logo SVG mimicking the Figma 2-curved arrows brandmark */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center shrink-0`}>
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Cyan curved arrow */}
          <path
            d="M34 16C34 9.37 28.63 4 22 4C15.37 4 10 9.37 10 16C10 21.2 13.3 25.6 18 27.2V33L25 26L18 19V23.1C15.5 21.8 13.8 19.1 13.8 16C13.8 11.5 17.5 7.8 22 7.8C26.5 7.8 30.2 11.5 30.2 16C30.2 18.2 29.3 20.2 27.8 21.6L30.5 24.3C32.7 22.2 34 19.3 34 16Z"
            fill="#06B6D4"
          />
          {/* Orange curved arrow looping in harmony */}
          <path
            d="M14 32C14 38.63 19.37 44 26 44C32.63 44 38 38.63 38 32C38 26.8 34.7 22.4 30 20.8V15L23 22L30 29V24.9C32.5 26.2 34.2 28.9 34.2 32C34.2 36.5 30.5 40.2 26 40.2C21.5 40.2 17.8 36.5 17.8 32C17.8 29.8 18.7 27.8 20.2 26.4L17.5 23.7C15.3 25.8 14 28.7 14 32Z"
            fill="#F97316"
          />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span className={`font-bold tracking-tight font-heading ${textSizes[size]} ${isWhite ? 'text-white' : 'text-slate-900'}`}>
          Tiny<span className="text-orange-500 font-extrabold">Trade</span>
        </span>
        {showSlogan && (
          <span className={`text-[11px] font-medium tracking-wide mt-0.5 ${isWhite ? 'text-slate-300' : 'text-slate-500'}`}>
            Thrift. Trade. Trust.
          </span>
        )}
      </div>
    </div>
  );
};
