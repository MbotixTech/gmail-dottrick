import React from 'react';
import { Copy, Trash2, Clock } from 'lucide-react';
import { Button } from '../ui/Button';

interface HistoryListProps {
  history: string[];
  onClear: () => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ history, onClear }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (history.length === 0) return null;

  return (
    <div className="mt-8 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-slate-400">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">Recent Generated</span>
        </div>
        <Button variant="ghost" size="sm" onClick={onClear} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
          Clear History
        </Button>
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {history.map((email, idx) => (
          <div 
            key={idx}
            className="group flex items-center justify-between p-3 rounded-xl bg-surface/30 border border-white/5 hover:bg-surface/50 transition-all"
          >
            <span className="text-sm font-mono text-slate-300 truncate max-w-[250px]">{email}</span>
            <button
              onClick={() => copyToClipboard(email)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-primary-400 hover:bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-all"
              title="Copy"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
