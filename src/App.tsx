import React from 'react';
import { Header } from './components/Header';
import { GeneratorForm } from './components/Generator/GeneratorForm';
import { HistoryList } from './components/History/HistoryList';
import { TemplateManager } from './components/Templates/TemplateManager';
import { useEmailGenerator } from './hooks/useEmailGenerator';

function App() {
  const {
    state,
    settings,
    history,
    templates,
    setMode,
    updateState,
    toggleSetting,
    generateSingleEmail,
    generateBulkEmails,
    generatePreview,
    saveTemplate,
    loadTemplate,
    deleteTemplate,
    clearHistory,
  } = useEmailGenerator();

  return (
    <div className="min-h-screen bg-background text-slate-200 selection:bg-primary-500/30 selection:text-white pb-12">

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-900/20 blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary-900/20 blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6">
        <Header />

        <main className="space-y-8">

          <div className="glass-card rounded-2xl p-6 sm:p-8 animate-slide-up">
            <TemplateManager 
              templates={templates}
              onSave={saveTemplate}
              onLoad={loadTemplate}
              onDelete={deleteTemplate}
            />
            
            <GeneratorForm 
              state={state}
              settings={settings}
              onModeChange={setMode}
              onUpdateState={updateState}
              onToggleSetting={toggleSetting}
              onGenerateSingle={generateSingleEmail}
              onGenerateBulk={generateBulkEmails}
              onPreview={generatePreview}
            />
          </div>


          <div className="glass-card rounded-2xl p-6 sm:p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <HistoryList 
              history={history} 
              onClear={clearHistory} 
            />
            {history.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                <p className="text-sm">No history yet. Generate some emails to see them here.</p>
              </div>
            )}
          </div>
        </main>

        <footer className="mt-12 text-center text-xs text-slate-600">
          <p>© {new Date().getFullYear()} MbotixTECH. Open Source Project.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
