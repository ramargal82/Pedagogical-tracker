
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
        case 'blue': return 'bg-blue-600 border-blue-600 text-white';
        case 'gray': return 'bg-gray-600 border-gray-600 text-white';
        case 'green': return 'bg-green-600 border-green-600 text-white';
      }
    } else {
      switch (variant) {
        case 'blue': return 'bg-white border-blue-200 text-blue-600 hover:bg-blue-50';
        case 'gray': return 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50';
        case 'green': return 'bg-white border-green-200 text-green-600 hover:bg-green-50';
      }
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all duration-200 ${getStyles()}`}
    >
      {label}
    </button>
  );
};
