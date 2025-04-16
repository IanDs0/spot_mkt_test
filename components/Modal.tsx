import { ReactNode } from 'react';
import { useTheme } from './ThemeProvider';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onSave?: () => void;
  saveLabel?: string;
}

export function Modal({ isOpen, onClose, title, children, onSave, saveLabel = 'Salvar' }: ModalProps) {
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className={`p-6 rounded-lg shadow-xl ${
        theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'
      }`}>
        <h3 className={`text-lg font-medium mb-4 ${
          theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
        }`}>{title}</h3>
        
        {children}

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className={`px-4 py-2 text-sm rounded-lg transition-all
              ${theme === 'dark' 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            Cancelar
          </button>
          {onSave && (
            <button
              onClick={onSave}
              className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:opacity-90 transition-all"
            >
              {saveLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
