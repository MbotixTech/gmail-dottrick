import React from 'react';
import { Settings, Zap, List, Download, Copy, Check, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Toggle } from '../ui/Toggle';
import { Card } from '../ui/Card';
import { GeneratorState, GeneratorSettings, Mode } from '../../types';

interface GeneratorFormProps {
  state: GeneratorState;
  settings: GeneratorSettings;
  onModeChange: (mode: Mode) => void;
  onUpdateState: (updates: Partial<GeneratorState>) => void;
  onToggleSetting: (key: keyof GeneratorSettings) => void;
  onGenerateSingle: () => void;
  onGenerateBulk: () => void;
  onPreview: () => void;
}

export const GeneratorForm: React.FC<GeneratorFormProps> = ({
  state,
  settings,
  onModeChange,
  onUpdateState,
  onToggleSetting,
  onGenerateSingle,
  onGenerateBulk,
  onPreview,
}) => {
  const downloadBulk = () => {
    const text = state.bulkEmails.join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `emails-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyBulk = () => {
    navigator.clipboard.writeText(state.bulkEmails.join('\n'));
    onUpdateState({ isCopied: true });
    setTimeout(() => onUpdateState({ isCopied: false }), 2000);
  };

  return (
    <div className="space-y-6">

      <div className="flex p-1 bg-surface/50 rounded-xl border border-white/5">
        <button
          onClick={() => onModeChange('single')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${
            state.mode === 'single'
              ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-4 h-4" />
          Single Mode
        </button>
        <button
          onClick={() => onModeChange('bulk')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${
            state.mode === 'bulk'
              ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <List className="w-4 h-4" />
          Bulk Mode
        </button>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Username"
          placeholder="MbotixTech"
          value={state.baseInput}
          onChange={(e) => onUpdateState({ baseInput: e.target.value })}
        />
        <Input
          label="Domain"
          placeholder="gmail.com"
          value={state.domain}
          onChange={(e) => onUpdateState({ domain: e.target.value })}
        />
      </div>


      <Card className="space-y-4">
        <div className="flex items-center gap-2 text-slate-300 font-medium text-sm mb-2">
          <Settings className="w-4 h-4 text-primary-400" />
          <span>Generator Settings</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
          <Toggle
            label="Plus Trick (+1, +2)"
            checked={settings.usePlus}
            onChange={() => onToggleSetting('usePlus')}
          />
          <Toggle
            label="Dot Trick (r.a.n.d.o.m)"
            checked={settings.useDot}
            onChange={() => onToggleSetting('useDot')}
          />
          <Toggle
            label="Uppercase Username"
            checked={settings.useUppercase}
            onChange={() => onToggleSetting('useUppercase')}
          />
          <Toggle
            label="Lowercase Username"
            checked={settings.useLowercase}
            onChange={() => onToggleSetting('useLowercase')}
          />
          <Toggle
            label="Random Domain Case"
            checked={settings.useDomainRandom}
            onChange={() => onToggleSetting('useDomainRandom')}
          />
        </div>
      </Card>


      {state.mode === 'single' ? (
        <div className="space-y-4 animate-fade-in">
          <Button
            onClick={onGenerateSingle}
            className="w-full py-4 text-lg"
            disabled={!state.baseInput}
          >
            {state.isCopied ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                Copied to Clipboard!
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Generate & Copy
              </>
            )}
          </Button>

          {state.generatedEmail && (
            <div className="text-center p-4 rounded-xl bg-surface/30 border border-white/5">
              <p className="text-xs text-slate-500 mb-1">Generated Email</p>
              <p className="text-xl font-mono text-primary-300 select-all">{state.generatedEmail}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Number"
              type="number"
              value={state.bulkStart}
              onChange={(e) => onUpdateState({ bulkStart: parseInt(e.target.value) || 1 })}
            />
            <Input
              label="Quantity"
              type="number"
              value={state.bulkCount}
              onChange={(e) => onUpdateState({ bulkCount: parseInt(e.target.value) || 100 })}
            />
          </div>

          <div className="flex gap-3">
            <Button 
              variant="secondary" 
              onClick={onPreview} 
              className="flex-1"
              disabled={!state.baseInput}
            >
              Preview First 10
            </Button>
            <Button 
              onClick={onGenerateBulk} 
              className="flex-[2]"
              disabled={!state.baseInput}
            >
              Generate {state.bulkCount} Emails
            </Button>
          </div>


          {state.previewEmails.length > 0 && (
            <div className="p-4 rounded-xl bg-surface/30 border border-white/5">
              <p className="text-xs font-medium text-slate-400 mb-2">Preview:</p>
              {state.previewEmails.map((email, i) => (
                <div key={i} className="font-mono text-xs text-slate-300 py-0.5">{email}</div>
              ))}
            </div>
          )}


          {state.bulkEmails.length > 0 && (
            <div className="flex gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 animate-slide-up">
              <div className="flex-1 flex items-center gap-2 text-green-400 text-sm font-medium">
                <Check className="w-4 h-4" />
                {state.bulkEmails.length} Generated
              </div>
              <Button size="sm" variant="ghost" onClick={copyBulk} className="text-green-400 hover:text-green-300 hover:bg-green-500/20">
                <Copy className="w-4 h-4 mr-1.5" />
                Copy
              </Button>
              <Button size="sm" variant="ghost" onClick={downloadBulk} className="text-green-400 hover:text-green-300 hover:bg-green-500/20">
                <Download className="w-4 h-4 mr-1.5" />
                Save .txt
              </Button>
            </div>
          )}
        </div>
      )}

      {state.error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center animate-pulse">
          {state.error}
        </div>
      )}
    </div>
  );
};
