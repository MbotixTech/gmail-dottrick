import { useState, useEffect, useCallback } from 'react';
import { Template, GeneratorState, GeneratorSettings, Mode } from '../types';

export const useEmailGenerator = () => {

  const [state, setState] = useState<GeneratorState>({
    mode: 'single',
    baseInput: '',
    domain: 'gmail.com',
    counter: 1,
    bulkCount: 100,
    bulkStart: 1,
    generatedEmail: '',
    bulkEmails: [],
    previewEmails: [],
    isCopied: false,
    error: '',
  });

  const [settings, setSettings] = useState<GeneratorSettings>({
    usePlus: false,
    useDot: true,
    useUppercase: false,
    useLowercase: false,
    useDomainRandom: false,
  });

  const [history, setHistory] = useState<string[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);


  useEffect(() => {
    const savedHistory = localStorage.getItem('emailHistory');
    const savedTemplates = localStorage.getItem('emailTemplates');

    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (savedTemplates) setTemplates(JSON.parse(savedTemplates));
  }, []);


  const insertRandomDots = (username: string): string => {
    if (username.length <= 1) return username;
    const chars = username.split('');
    const possiblePositions: number[] = [];
    for (let i = 1; i < chars.length; i++) possiblePositions.push(i);

    const numDots = Math.floor(Math.random() * (possiblePositions.length)) + 1;
    const selectedPositions = possiblePositions
      .sort(() => Math.random() - 0.5)
      .slice(0, numDots)
      .sort((a, b) => b - a);

    selectedPositions.forEach(pos => chars.splice(pos, 0, '.'));
    return chars.join('');
  };

  const randomizeCase = (text: string): string => {
    return text.split('').map(char => 
      Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
    ).join('');
  };

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const applyTricks = useCallback((username: string, num: number): string => {
    let result = username;

    if (settings.useDot) result = insertRandomDots(result);
    
    if (settings.useUppercase && settings.useLowercase) {
      result = randomizeCase(result);
    } else if (settings.useUppercase) {
      result = result.toUpperCase();
    } else if (settings.useLowercase) {
      result = result.toLowerCase();
    }

    if (settings.usePlus) result = `${result}+${num}`;

    return result;
  }, [settings]);

  const applyDomainTricks = useCallback((domainName: string): string => {
    return settings.useDomainRandom ? randomizeCase(domainName) : domainName;
  }, [settings.useDomainRandom]);


  const setMode = (mode: Mode) => setState(prev => ({ ...prev, mode }));
  
  const updateState = (updates: Partial<GeneratorState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const toggleSetting = (key: keyof GeneratorSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const generateSingleEmail = () => {
    if (!state.baseInput.trim()) return;

    const username = state.baseInput.split('@')[0];
    const processedUsername = applyTricks(username, state.counter);
    const processedDomain = applyDomainTricks(state.domain);
    const newEmail = `${processedUsername}@${processedDomain}`;

    if (!validateEmail(newEmail)) {
      updateState({ error: 'Format email tidak valid' });
      return;
    }

    const newHistory = [newEmail, ...history.filter(e => e !== newEmail)];
    setHistory(newHistory);
    localStorage.setItem('emailHistory', JSON.stringify(newHistory));

    updateState({ 
      generatedEmail: newEmail, 
      counter: state.counter + 1,
      error: '',
      isCopied: true 
    });

    navigator.clipboard.writeText(newEmail);
    setTimeout(() => updateState({ isCopied: false }), 2000);
  };

  const generateBulkEmails = () => {
    if (!state.baseInput.trim()) return;

    const username = state.baseInput.split('@')[0];
    const emails: string[] = [];

    for (let i = 0; i < state.bulkCount; i++) {
      const num = state.bulkStart + i;
      const processedUsername = applyTricks(username, num);
      const processedDomain = applyDomainTricks(state.domain);
      emails.push(`${processedUsername}@${processedDomain}`);
    }

    updateState({ bulkEmails: emails, error: '' });
  };

  const generatePreview = () => {
    if (!state.baseInput.trim()) return;

    const username = state.baseInput.split('@')[0];
    const emails: string[] = [];
    const count = Math.min(10, state.bulkCount);

    for (let i = 0; i < count; i++) {
      const num = state.bulkStart + i;
      const processedUsername = applyTricks(username, num);
      const processedDomain = applyDomainTricks(state.domain);
      emails.push(`${processedUsername}@${processedDomain}`);
    }

    updateState({ previewEmails: emails, error: '' });
  };

  const saveTemplate = (name: string) => {
    if (!name.trim()) return;
    const newTemplate: Template = { name, ...settings };
    const updated = [...templates, newTemplate];
    setTemplates(updated);
    localStorage.setItem('emailTemplates', JSON.stringify(updated));
  };

  const loadTemplate = (template: Template) => {
    setSettings({
      usePlus: template.usePlus,
      useDot: template.useDot,
      useUppercase: template.useUppercase,
      useLowercase: template.useLowercase,
      useDomainRandom: template.useDomainRandom,
    });
  };

  const deleteTemplate = (index: number) => {
    const updated = templates.filter((_, i) => i !== index);
    setTemplates(updated);
    localStorage.setItem('emailTemplates', JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('emailHistory');
  };

  return {
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
  };
};
