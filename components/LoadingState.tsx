import React from 'react';

export const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-6">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-stone-200 border-t-gold-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      <p className="font-display text-stone-600 animate-pulse text-lg">Composing sacred words...</p>
    </div>
  );
};