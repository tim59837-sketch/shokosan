import React from 'react';

export const GeometricCafeBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#F5EBE6] -z-20 overflow-hidden pointer-events-none">
      {/* Decorative geometric warm gradients */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-[#EAE0D5]/40 blur-[120px]" />
      <div className="absolute -bottom-20 -left-20 w-[60vw] h-[60vw] rounded-full bg-[#E4D5C7]/30 blur-[150px]" />
      
      {/* Dynamic diagonal subtle lines for Cafe/Geometric aesthetic */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4A3E3D" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};
