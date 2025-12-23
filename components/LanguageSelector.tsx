
import React from 'react';
import { Language } from '../types';

interface Props {
  current: Language;
  onSelect: (lang: Language) => void;
}

export const LanguageSelector: React.FC<Props> = ({ current, onSelect }) => {
  const langs: { code: Language; label: string; short: string }[] = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'es', label: 'Español', short: 'ES' },
    { code: 'pt', label: 'Português', short: 'PT' },
    { code: 'zh', label: '中文', short: 'ZH' },
  ];

  return (
    <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl">
      {langs.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onSelect(lang.code)}
          className={`px-2 md:px-3 py-1 text-[10px] md:text-xs font-bold rounded-lg transition-all ${
            current === lang.code
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <span className="hidden sm:inline">{lang.label}</span>
          <span className="sm:hidden">{lang.short}</span>
        </button>
      ))}
    </div>
  );
};
