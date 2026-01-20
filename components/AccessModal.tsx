
import React, { useState, useEffect } from 'react';
import { LockClosedIcon } from './Icons';

interface AccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockAttempt: (code: string) => boolean;
  companyName: string;
}

const AccessModal: React.FC<AccessModalProps> = ({ isOpen, onClose, onUnlockAttempt, companyName }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  // Reset state when modal is opened
  useEffect(() => {
    if (isOpen) {
      setCode('');
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) {
        setError('Por favor, introduce un código.');
        return;
    }
    const success = onUnlockAttempt(code);
    if (!success) {
      setError('Código incorrecto. Inténtalo de nuevo.');
      setCode('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-sm m-4">
        <div className="flex flex-col items-center text-center">
            <LockClosedIcon className="h-12 w-12 text-indigo-500 mb-4"/>
            <h2 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">Acceso Restringido</h2>
            <p className="text-sm mb-4 text-slate-600 dark:text-slate-300">Introduce el código para ver los datos de <span className="font-bold">{companyName}</span>.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="password"
              id="access-code"
              value={code}
              onChange={(e) => {
                  setCode(e.target.value);
                  setError('');
              }}
              className="mt-1 block w-full text-center tracking-widest font-mono text-2xl px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
              autoFocus
            />
             {error && <p className="text-xs text-red-500 mt-2 text-center">{error}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
            >
              Desbloquear
            </button>
             <button
              type="button"
              onClick={onClose}
              className="w-full py-2 px-4 bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccessModal;
