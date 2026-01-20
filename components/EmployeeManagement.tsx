
import React, { useMemo } from 'react';
import type { Employee } from '../types';
import { PlusCircleIcon, LockClosedIcon } from './Icons';
import EmployeeCard from './EmployeeCard';

interface EmployeeManagementProps {
    employees: Employee[];
    unlockedCompanies: string[];
    onAddEmployee: () => void;
    onCancelContract: (id: string) => void;
    onSanction: (id: string) => void;
    onReportAction: (employee: Employee, type: 'Accidente' | 'Licencia') => void;
    onEditProfile: (employee: Employee) => void;
    onRehire: (id: string) => void;
}

const EmployeeManagement: React.FC<EmployeeManagementProps> = ({
    employees,
    unlockedCompanies,
    onAddEmployee,
    onCancelContract,
    onSanction,
    onReportAction,
    onEditProfile,
    onRehire,
}) => {
    const employeesByCompany = useMemo(() => {
        return employees.reduce((acc, employee) => {
          const company = employee.company || 'Sin Empresa';
          if (!acc[company]) {
            acc[company] = [];
          }
          acc[company].push(employee);
          return acc;
        }, {} as Record<string, Employee[]>);
    }, [employees]);

    if (unlockedCompanies.length === 0) {
        return (
             <div>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
                    Gestión de Empleados
                    </h1>
                </div>
                <div className="text-center bg-white dark:bg-slate-800 p-12 rounded-xl shadow-lg flex flex-col items-center">
                    <LockClosedIcon className="h-16 w-16 text-slate-400 dark:text-slate-500 mb-6"/>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Acceso Restringido</h2>
                    <p className="text-slate-600 dark:text-slate-300 max-w-md">
                        Para gestionar los empleados, primero debes desbloquear al menos una empresa desde el
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400"> Inicio</span>.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
                Gestión de Empleados
                </h1>
                <button
                onClick={onAddEmployee}
                className="flex items-center gap-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
                >
                <PlusCircleIcon className="h-5 w-5" />
                <span>Añadir Empleado</span>
                </button>
            </div>

            <div className="space-y-10">
                {Object.entries(employeesByCompany).map(([company, companyEmployees]) => (
                    <section key={company}>
                        <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300 border-b-2 border-indigo-500 pb-2 mb-6">
                            {company}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {companyEmployees.map((employee) => (
                                <EmployeeCard
                                    key={employee.id}
                                    employee={employee}
                                    onCancelContract={onCancelContract}
                                    onSanction={onSanction}
                                    onReportAction={onReportAction}
                                    onEditProfile={onEditProfile}
                                    onRehire={onRehire}
                                />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default EmployeeManagement;
