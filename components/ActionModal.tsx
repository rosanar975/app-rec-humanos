
import React, { useState } from 'react';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (details: string) => void;
  employeeName: string;
  actionType: 'Accidente' | 'Licencia';
}

const ActionModal: React.FC<ActionModalProps> = ({ isOpen, onClose, onSubmit, employeeName, actionType }) => {
  const [details, setDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(details);
    setDetails('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-md m-4">
        <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">Reportar {actionType}</h2>
        <p className="text-sm mb-4 text-slate-600 dark:text-slate-300">Para el empleado: {employeeName}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="details" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Detalles</label>
            <textarea
              id="details"
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={`Proporcione detalles sobre ${actionType === 'Accidente' ? 'el accidente' : 'la licencia'}...`}
              required
            ></textarea>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
            >
              Enviar Reporte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActionModal;
