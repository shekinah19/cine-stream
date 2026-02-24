import React, { useEffect } from 'react';
import { Check, Info } from './Icons';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type?: 'success' | 'info';
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose, type = 'info' }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[60] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-slate-800/90 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-slate-700">
        {type === 'success' ? (
          <div className="bg-green-500/20 p-1 rounded-full">
            <Check size={16} className="text-green-400" />
          </div>
        ) : (
          <div className="bg-indigo-500/20 p-1 rounded-full">
            <Info size={16} className="text-indigo-400" />
          </div>
        )}
        <span className="font-medium text-sm">{message}</span>
      </div>
    </div>
  );
};

export default Toast;