import React, { useState } from 'react';
import { Save, X, Play } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Template } from '../../types';

interface TemplateManagerProps {
  templates: Template[];
  onSave: (name: string) => void;
  onLoad: (template: Template) => void;
  onDelete: (index: number) => void;
}

export const TemplateManager: React.FC<TemplateManagerProps> = ({
  templates,
  onSave,
  onLoad,
  onDelete,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');

  const handleSave = () => {
    if (name.trim()) {
      onSave(name);
      setName('');
      setIsCreating(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-slate-400">Saved Templates</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsCreating(!isCreating)}
          className="text-primary-400 hover:text-primary-300"
        >
          <Save className="w-4 h-4 mr-1.5" />
          Save Current
        </Button>
      </div>

      {isCreating && (
        <div className="flex gap-2 mb-4 animate-fade-in">
          <Input
            placeholder="Template Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <Button onClick={handleSave} size="sm">Save</Button>
          <Button variant="ghost" onClick={() => setIsCreating(false)} size="sm">Cancel</Button>
        </div>
      )}

      {templates.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {templates.map((template, idx) => (
            <div 
              key={idx}
              className="group flex items-center gap-2 pl-3 pr-1 py-1.5 rounded-lg bg-surface border border-white/5 hover:border-primary-500/30 transition-all"
            >
              <span className="text-xs font-medium text-slate-300">{template.name}</span>
              <div className="flex items-center border-l border-white/5 pl-1 ml-1">
                <button
                  onClick={() => onLoad(template)}
                  className="p-1 text-slate-500 hover:text-primary-400 rounded hover:bg-white/5"
                  title="Load"
                >
                  <Play className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onDelete(idx)}
                  className="p-1 text-slate-500 hover:text-red-400 rounded hover:bg-white/5"
                  title="Delete"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !isCreating && <p className="text-xs text-slate-600 italic">No templates saved yet.</p>
      )}
    </div>
  );
};
