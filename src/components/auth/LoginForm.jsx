import React, { useState } from 'react';
import PasswordInput from './PasswordInput';
import { FiLoader, FiCheckCircle } from 'react-icons/fi';

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }
      
      // Save token and user details to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setIsLoading(false);
      setIsSuccess(true);
      
      // Reset success status after a delay and trigger redirect
      setTimeout(() => {
        setIsSuccess(false);
        if (onLoginSuccess) {
          onLoginSuccess(data.user);
        }
      }, 1000);
    } catch (err) {
      setIsLoading(false);
      setError(err.message || 'Something went wrong. Please check your connection.');
    }
  };

  return (
    <div className="w-full max-w-[400px] mx-auto">
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center py-8 px-6 bg-emerald-50 border border-emerald-100 rounded-2xl text-center animate-fade-in">
          <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white mb-4 shadow-md shadow-emerald-500/10">
            <FiCheckCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-emerald-950 mb-1">Signed in successfully!</h3>
          <p className="text-sm text-emerald-700/80">Welcome back to HUMAI Management Console.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-xs md:text-sm font-medium animate-fade-in flex items-center gap-2.5">
              <svg className="w-4 h-4 text-rose-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
              <span>{error}</span>
            </div>
          )}
          {/* Email field */}
          <div className="w-full">
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D5C7D]/20 focus:border-[#0D5C7D] transition-all duration-200 text-sm"
            />
          </div>

          {/* Password field */}
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            label="Password"
          />

          {/* Remember me & Forgot Password */}
          <div className="flex items-center justify-between pt-0.5">
            <label className="flex items-center group cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded border flex items-center justify-center mr-2 transition-all duration-150 ${
                rememberMe
                  ? 'bg-[#14B8A6] border-[#14B8A6] text-white'
                  : 'bg-white border-slate-300 group-hover:border-slate-400'
              }`}>
                {rememberMe && (
                  <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20">
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                  </svg>
                )}
              </div>
              <span className="text-xs text-slate-600 group-hover:text-slate-800 transition-colors">
                Remember me
              </span>
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2.5 px-4 bg-[#0D5C7D] hover:bg-[#0F3D5E] text-white font-medium rounded-xl text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#0D5C7D]/25 focus:ring-offset-2 flex justify-center items-center h-10 ${
              isLoading ? 'opacity-85 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <FiLoader className="w-5 h-5 animate-spin" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
