import React from 'react';

const HeroSection = () => {
  return (
    <div className="text-center max-w-[560px] mx-auto mb-8 animate-fade-in-up">
      <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F3D5E] tracking-tight leading-tight">
        Everything you need to manage your{' '}
        <span className="text-[#14B8A6] relative inline-block">
          workforce
          <span className="absolute bottom-1 left-0 w-full h-[3px] bg-[#14B8A6]/20 rounded-full"></span>
        </span>
      </h2>
      <p className="mt-3 text-slate-500 text-sm md:text-base font-normal max-w-[420px] mx-auto">
        AI-powered analytics, recruitment pipelines, and more — all in one place.
      </p>
    </div>
  );
};

export default HeroSection;
