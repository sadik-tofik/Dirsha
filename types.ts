import { ReactNode } from 'react';

export enum Language {
  EN = 'en',
  AM = 'am',
  OR = 'or',
  TI = 'ti',
}

export interface TranslationSet {
  [key: string]: string;
}

export interface Translations {
  [Language.EN]: TranslationSet;
  [Language.AM]: TranslationSet;
}

export interface AppContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isProfileOpen: boolean;
  setProfileOpen: (isOpen: boolean) => void;
}

export interface AppProviderProps {
  children: ReactNode;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}
