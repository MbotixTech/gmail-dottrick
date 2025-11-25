export type Mode = 'single' | 'bulk';

export interface Template {
  name: string;
  usePlus: boolean;
  useDot: boolean;
  useUppercase: boolean;
  useLowercase: boolean;
  useDomainRandom: boolean;
}

export interface GeneratorState {
  mode: Mode;
  baseInput: string;
  domain: string;
  counter: number;
  bulkCount: number;
  bulkStart: number;
  generatedEmail: string;
  bulkEmails: string[];
  previewEmails: string[];
  isCopied: boolean;
  error: string;
}

export interface GeneratorSettings {
  usePlus: boolean;
  useDot: boolean;
  useUppercase: boolean;
  useLowercase: boolean;
  useDomainRandom: boolean;
}
