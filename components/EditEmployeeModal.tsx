
import React, { useState, useEffect } from 'react';
import type { Employee } from '../types';
import { ContractType } from '../types';

interface EditEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
  onUpdate: (employee: Employee) => void;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({ isOpen, onClose, employee, onUpdate }) => {
  const [formData, setFormData] = useState<Employee>(employee);

  useEffect(() => {
    // Solo se resetea el formulario si el empleado que se edita realmente cambia (basado en el ID).
    // Esto previene que los cambios locales (como quitar una sanción) se pierdan durante las re-renderizaciones.
    if (employee?.id !== formData?.id) {
        setFormData(employee);
    }
  }, [employee, formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, salary: parseFloat(e.target.value) || 0 }));
  };

  const handleRemoveSanction = () => {
    if (formData.sanctions > 0) {
      setFormData(prev => ({ ...prev, sanctions: prev.sanctions - 1 }));
    }
  };

  const handleGenerateAvatar = () => {
    setFormData(prev => ({ ...prev, avatarUrl: `https://picsum.photos/seed/${Date.now()}/400`}));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  if (!isOpen) return null;

  const formInputClasses = "mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-lg max-h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">Editar Perfil de Empleado</h2>
        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold border-b border-slate-300 dark:border-slate-600 pb-2 mb-4">Información Personal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Nombre Completo</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={formInputClasses} required/>
                </div>
                 <div>
                    <label htmlFor="sex" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Sexo</label>
                    <select id="sex" name="sex" value={formData.sex || ''} onChange={handleChange} className={formInputClasses}>
                        <option value="">Seleccionar...</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>
            </div>
             <div className="mt-4">
                <label htmlFor="avatarUrl" className="block text-sm font-medium text-slate-700 dark:text-slate-300">URL de la Foto</label>
                <div className="flex items-center gap-2">
                    <input type="text" id="avatarUrl" name="avatarUrl" value={formData.avatarUrl} onChange={handleChange} className={`${formInputClasses} flex-grow`}/>
                    <button type="button" onClick={handleGenerateAvatar} className="py-2 px-3 bg-slate-200 dark:bg-slate-600 rounded-md text-sm hover:bg-slate-300 dark:hover:bg-slate-500">Generar</button>
                </div>
             </div>
             <div className="mt-4">
                <label htmlFor="personalInfo" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Información Adicional</label>
                <textarea id="personalInfo" name="personalInfo" value={formData.personalInfo || ''} onChange={handleChange} rows={3} className={formInputClasses}/>
             </div>
          </div>
          
          {/* Job Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold border-b border-slate-300 dark:border-slate-600 pb-2 mb-4">Detalles del Puesto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Empresa</label>
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className={formInputClasses} required/>
                </div>
                <div>
                    <label htmlFor="salary" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Remuneración (Salario)</label>
                    <input type="number" id="salary" name="salary" value={formData.salary} onChange={handleSalaryChange} className={formInputClasses} required />
                </div>
            </div>
            <div className="mt-4">
              <label htmlFor="contractType" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Tipo de Contrato</label>
              <select
                id="contractType"
                name="contractType"
                value={formData.contractType}
                onChange={handleChange}
                className={formInputClasses}
              >
                <option value={ContractType.FULL_TIME}>Tiempo Indeterminado</option>
                <option value={ContractType.PART_TIME}>Tiempo Parcial</option>
                <option value={ContractType.TEMPORARY}>Temporal</option>
                <option value={ContractType.EVENTUAL}>Eventual</option>
              </select>
            </div>
             <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Sanciones Aplicadas</label>
                <div className="flex items-center gap-4 p-2 bg-slate-100 dark:bg-slate-700 rounded-md">
                    <span className="font-bold text-lg">{formData.sanctions}</span>
                    <button type="button" onClick={handleRemoveSanction} disabled={formData.sanctions === 0} className="py-1 px-3 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 disabled:bg-red-300 dark:disabled:bg-red-800 disabled:cursor-not-allowed">
                        Quitar una sanción
                    </button>
                </div>
             </div>
          </div>

          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition">
              Cancelar
            </button>
            <button type="submit" className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
