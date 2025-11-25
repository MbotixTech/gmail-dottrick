import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl opacity-0 group-focus-within:opacity-50 transition duration-500 blur"></div>
        <input
          className={`relative w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-0 transition-all ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-400 ml-1">{error}</p>}
    </div>
  );
};
