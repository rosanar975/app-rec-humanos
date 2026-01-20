
import React, { useMemo } from 'react';
import type { Employee } from '../types';
import { EmployeeStatus } from '../types';
import type { Company } from '../data/companies';
import { UsersIcon, UserPlusIcon, UserMinusIcon, LockClosedIcon } from './Icons';

interface DashboardProps {
  allCompanies: Company[];
  employees: Employee[];
  unlockedCompanies: string[];
  onRequestUnlock: (company: Company) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ allCompanies, employees, unlockedCompanies, onRequestUnlock }) => {
  const employeesByCompany = useMemo(() => {
    return employees.reduce((acc, employee) => {
      if (!acc[employee.company]) {
        acc[employee.company] = [];
      }
      acc[employee.company].push(employee);
      return acc;
    }, {} as Record<string, Employee[]>);
  }, [employees]);

  return (
    <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-6">
            Inicio / Resumen por Empresa
        </h1>
        <div className="space-y-8">
            {allCompanies.map((company) => {
                const isUnlocked = unlockedCompanies.includes(company.name);
                const companyEmployees = employeesByCompany[company.name] || [];
                const totalEmployees = companyEmployees.length;
                const activeEmployees = companyEmployees.filter(emp => emp.status === EmployeeStatus.ACTIVE).length;
                const inactiveEmployees = totalEmployees - activeEmployees;

                return (
                    <div key={company.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg transition-all duration-300">
                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                            <img src={company.photoUrl} alt={company.name} className="w-24 h-24 rounded-full object-cover border-4 border-slate-200 dark:border-slate-700"/>
                            <div className="text-center sm:text-left">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{company.name}</h2>
                                {!isUnlocked && <p className="text-sm text-yellow-600 dark:text-yellow-400">Acceso restringido</p>}
                            </div>
                        </div>

                        {isUnlocked ? (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                                <div className="bg-slate-100 dark:bg-slate-700/50 p-6 rounded-lg">
                                    <UsersIcon className="h-10 w-10 text-indigo-500 mx-auto mb-3" />
                                    <p className="text-4xl font-extrabold text-slate-800 dark:text-white">{totalEmployees}</p>
                                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-semibold">Total</p>
                                </div>
                                 <div className="bg-slate-100 dark:bg-slate-700/50 p-6 rounded-lg">
                                    <UserPlusIcon className="h-10 w-10 text-green-500 mx-auto mb-3" />
                                    <p className="text-4xl font-extrabold text-slate-800 dark:text-white">{activeEmployees}</p>
                                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-semibold">Activos</p>
                                </div>
                                 <div className="bg-slate-100 dark:bg-slate-700/50 p-6 rounded-lg">
                                    <UserMinusIcon className="h-10 w-10 text-red-500 mx-auto mb-3" />
                                    <p className="text-4xl font-extrabold text-slate-800 dark:text-white">{inactiveEmployees}</p>
                                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-semibold">Inactivos</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center bg-slate-100 dark:bg-slate-700/50 p-8 rounded-lg flex flex-col items-center">
                                <LockClosedIcon className="h-12 w-12 text-slate-500 mb-4"/>
                                <p className="text-slate-600 dark:text-slate-300 mb-4">Introduce el código para ver los datos de esta empresa.</p>
                                <button 
                                    onClick={() => onRequestUnlock(company)}
                                    className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200">
                                    Desbloquear
                                </button>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    </div>
  );
};

export default Dashboard;
