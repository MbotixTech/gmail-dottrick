import React from 'react';
import { Mail, Github } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between py-6 mb-8">
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 shadow-lg shadow-primary-500/20">
          <Mail className="w-6 h-6 text-white" />
          <div className="absolute inset-0 rounded-xl bg-white/20 blur-sm -z-10"></div>
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-100 tracking-tight">
            Mbotix<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">TECH</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">Advanced Email Generator</p>
        </div>
      </div>
      
      <a 
        href="https://github.com/MbotixTech" 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
      >
        <Github className="w-5 h-5" />
      </a>
    </header>
  );
};
