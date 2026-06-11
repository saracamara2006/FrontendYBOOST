import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import HeroSection from '../components/marketing/HeroSection';
import DashboardPreview from '../components/marketing/DashboardPreview';

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white overflow-x-hidden">
      
      {/* Left Panel: Auth Form */}
      <section className="w-full lg:w-1/2 min-h-screen flex flex-col justify-between p-6 sm:p-10 md:p-16 bg-white animate-fade-in">
        {/* Company Header */}
        <div className="flex items-center space-x-2.5 select-none">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0D5C7D] to-[#14B8A6] flex items-center justify-center text-sm font-extrabold text-white shadow-md shadow-[#0D5C7D]/15">
            H
          </div>
          <span className="text-slate-900 text-base font-extrabold tracking-wide">HUMAI</span>
        </div>

        {/* Form Content Wrapper */}
        <div className="my-auto py-12 max-w-[420px] w-full mx-auto flex flex-col justify-center">
          <div className="mb-8 text-left">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back
            </h1>
            <p className="mt-2 text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
              AI-powered HR Management Platform for modern teams
            </p>
          </div>

          {/* Form */}
          <LoginForm />
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-between text-[11px] font-medium text-slate-400 select-none">
          <p>© {new Date().getFullYear()} HUMAI Inc.</p>
          <div className="flex space-x-4">
            <a href="#privacy" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-600 transition-colors">Terms of Service</a>
          </div>
        </footer>
      </section>

      {/* Right Panel: Marketing & Mockup */}
      <section className="hidden lg:flex lg:w-1/2 min-h-screen bg-[#F4F9FB] flex-col justify-center items-center p-8 relative overflow-hidden border-l border-slate-100">
        {/* Decorative background gradients */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#14B8A6]/5 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-[#0D5C7D]/5 to-transparent blur-3xl pointer-events-none" />
        
        {/* Marketing Hero section */}
        <HeroSection />

        {/* High-fidelity Mockup */}
        <div className="w-full max-w-[660px] relative z-10 transition-transform duration-500 hover:scale-[1.01]">
          <DashboardPreview />
        </div>
      </section>

    </div>
  );
};

export default LoginPage;
