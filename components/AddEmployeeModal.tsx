
import React, { useState } from 'react';
import { ContractType } from '../types';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEmployee: (employeeData: { name: string; position: string; salary: number; company: string; contractType: ContractType }) => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ isOpen, onClose, onAddEmployee }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [company, setCompany] = useState('Pachi Central');
  const [contractType, setContractType] = useState<ContractType>(ContractType.FULL_TIME);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && position && salary && company) {
      onAddEmployee({ name, position, salary: parseFloat(salary), company, contractType });
      setName('');
      setPosition('');
      setSalary('');
      setCompany('Pachi Central');
      setContractType(ContractType.FULL_TIME);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-md m-4">
        <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">Añadir Nuevo Empleado</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Nombre Completo</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="position" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Puesto</label>
            <input
              type="text"
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
           <div className="mb-4">
            <label htmlFor="company" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Empresa</label>
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
           <div className="mb-4">
            <label htmlFor="contractType" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Tipo de Contrato</label>
            <select
              id="contractType"
              value={contractType}
              onChange={(e) => setContractType(e.target.value as ContractType)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value={ContractType.FULL_TIME}>Tiempo Indeterminado</option>
              <option value={ContractType.PART_TIME}>Tiempo Parcial</option>
              <option value={ContractType.TEMPORARY}>Temporal</option>
              <option value={ContractType.EVENTUAL}>Eventual</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="salary" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Salario</label>
            <input
              type="number"
              id="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
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
              Añadir Empleado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
