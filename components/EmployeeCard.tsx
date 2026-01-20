
import React from 'react';
import type { Employee } from '../types';
import { EmployeeStatus } from '../types';
import { CalendarIcon, CurrencyDollarIcon, ExclamationTriangleIcon, ClockIcon, BanIcon, ShieldExclamationIcon, DocumentReportIcon, ClipboardListIcon, PencilIcon, DocumentTextIcon, UserPlusIcon } from './Icons';

interface EmployeeCardProps {
  employee: Employee;
  onCancelContract: (id: string) => void;
  onSanction: (id: string) => void;
  onReportAction: (employee: Employee, type: 'Accidente' | 'Licencia') => void;
  onEditProfile: (employee: Employee) => void;
  onRehire: (id: string) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onCancelContract, onSanction, onReportAction, onEditProfile, onRehire }) => {
  const lastAttendance = employee.attendance[employee.attendance.length - 1];

  const statusColor = employee.status === EmployeeStatus.ACTIVE
    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
  
  const actionButtonClasses = "flex items-center justify-center gap-2 p-2 text-xs font-semibold text-white rounded-md transition-colors duration-200";

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col">
      <div className="p-4 flex-grow">
        <div className="flex items-center mb-4">
          <img className="h-16 w-16 rounded-full object-cover mr-4 border-2 border-indigo-400" src={employee.avatarUrl} alt={employee.name} />
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{employee.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{employee.position}</p>
          </div>
        </div>
        
        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${statusColor} mb-4`}>
          {employee.status}
        </span>

        <div className="space-y-3 text-sm">
          <div className="flex items-center text-slate-600 dark:text-slate-300">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span>{employee.startDate} {employee.endDate ? ` - ${employee.endDate}` : ''}</span>
          </div>
          <div className="flex items-center text-slate-600 dark:text-slate-300">
            <CurrencyDollarIcon className="h-4 w-4 mr-2" />
            <span>${employee.salary.toLocaleString()}</span>
          </div>
          <div className="flex items-center text-slate-600 dark:text-slate-300">
            <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
            <span>{employee.sanctions} Sanciones</span>
          </div>
           <div className="flex items-center text-slate-600 dark:text-slate-300">
            <DocumentTextIcon className="h-4 w-4 mr-2" />
            <span>{employee.contractType}</span>
          </div>
          {lastAttendance && employee.status === EmployeeStatus.ACTIVE && (
             <div className="flex items-center text-slate-600 dark:text-slate-300">
                <ClockIcon className="h-4 w-4 mr-2" />
                <span>Entrada: {lastAttendance.clockIn} | Salida: {lastAttendance.clockOut}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-slate-50 dark:bg-slate-700/50 p-2 grid grid-cols-3 gap-2">
         <button onClick={() => onEditProfile(employee)} className={`${actionButtonClasses} bg-gray-500 hover:bg-gray-600 col-span-1`}><PencilIcon className="h-4 w-4"/> Editar</button>
         <button onClick={() => onSanction(employee.id)} className={`${actionButtonClasses} bg-yellow-500 hover:bg-yellow-600 col-span-2`}><ShieldExclamationIcon className="h-4 w-4"/> Sancionar</button>
         <button onClick={() => onReportAction(employee, 'Accidente')} className={`${actionButtonClasses} bg-orange-500 hover:bg-orange-600 col-span-3`}><DocumentReportIcon className="h-4 w-4"/> Reportar Accidente</button>
         <button onClick={() => onReportAction(employee, 'Licencia')} className={`${actionButtonClasses} bg-blue-500 hover:bg-blue-600 col-span-3`}><ClipboardListIcon className="h-4 w-4"/> Reportar Licencia</button>
         {employee.status === EmployeeStatus.ACTIVE && (
            <button onClick={() => onCancelContract(employee.id)} className={`${actionButtonClasses} bg-red-500 hover:bg-red-600 col-span-3`}><BanIcon className="h-4 w-4"/> Cancelar Contrato</button>
         )}
         {employee.status === EmployeeStatus.INACTIVE && (
            <button onClick={() => onRehire(employee.id)} className={`${actionButtonClasses} bg-green-500 hover:bg-green-600 col-span-3`}><UserPlusIcon className="h-4 w-4"/> Recontratar</button>
         )}
      </div>
    </div>
  );
};

export default EmployeeCard;
