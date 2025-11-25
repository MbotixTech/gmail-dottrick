import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label }) => {
  return (
    <button
      onClick={onChange}
      className="flex items-center gap-3 group cursor-pointer focus:outline-none"
    >
      <div
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-background ${
          checked ? 'bg-primary-600' : 'bg-surface border border-white/10'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </div>
      {label && (
        <span className={`text-sm font-medium transition-colors ${checked ? 'text-slate-200' : 'text-slate-400 group-hover:text-slate-300'}`}>
          {label}
        </span>
      )}
    </button>
  );
};
