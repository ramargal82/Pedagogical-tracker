
import React from 'react';

interface Props {
  label: string;
  selected: boolean;
  onClick: () => void;
  variant?: 'blue' | 'gray' | 'green';
}

export const OptionButton: React.FC<Props> = ({ label, selected, onClick, variant = 'blue' }) => {
  const getStyles = () => {
    if (selected) {
      switch (variant) {
        case 'blue': return 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100';
        case 'gray': return 'bg-slate-600 border-slate-600 text-white shadow-md shadow-slate-100';
        case 'green': return 'bg-green-600 border-green-600 text-white shadow-md shadow-green-100';
      }
    } else {
      switch (variant) {
        case 'blue': return 'bg-white border-blue-100 text-blue-600 hover:bg-blue-50';
        case 'gray': return 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50';
        case 'green': return 'bg-white border-green-100 text-green-600 hover:bg-green-50';
      }
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-2 md:px-4 md:py-2.5 text-[11px] md:text-sm font-bold rounded-xl border-2 transition-all duration-200 active:scale-95 select-none ${getStyles()}`}
    >
      {label}
    </button>
  );
};
