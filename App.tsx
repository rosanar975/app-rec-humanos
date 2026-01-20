
import React, { useState, useCallback, useMemo } from 'react';
import { useEmployees } from './hooks/useEmployees';
import type { Employee } from './types';
import { EmployeeStatus } from './types';
import { companies } from './data/companies';
import type { Company } from './data/companies';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import EmployeeManagement from './components/EmployeeManagement';
import AddEmployeeModal from './components/AddEmployeeModal';
import EditEmployeeModal from './components/EditEmployeeModal';
import ActionModal from './components/ActionModal';
import SummaryGenerator from './components/SummaryGenerator';
import AccessModal from './components/AccessModal';

type Page = 'dashboard' | 'employees';

const App: React.FC = () => {
  const {
    employees,
    addEmployee,
    updateEmployee,
    cancelContract,
    sanctionEmployee,
    rehireEmployee,
  } = useEmployees();
  
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);
  const [isActionModalOpen, setActionModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [actionType, setActionType] = useState<'Accidente' | 'Licencia' | null>(null);

  // --- State for access control ---
  const [unlockedCompanies, setUnlockedCompanies] = useState<string[]>([]);
  const [isAccessModalOpen, setAccessModalOpen] = useState(false);
  const [companyToUnlock, setCompanyToUnlock] = useState<Company | null>(null);

  const handleRequestUnlock = (company: Company) => {
    setCompanyToUnlock(company);
    setAccessModalOpen(true);
  };

  const handleUnlockAttempt = (code: string): boolean => {
    if (companyToUnlock && companyToUnlock.accessCode === code) {
      setUnlockedCompanies(prev => [...new Set([...prev, companyToUnlock.name])]);
      setAccessModalOpen(false);
      setCompanyToUnlock(null);
      return true;
    }
    return false;
  };

  const unlockedEmployees = useMemo(() => 
    employees.filter(emp => unlockedCompanies.includes(emp.company)),
    [employees, unlockedCompanies]
  );
  
  const handleOpenActionModal = useCallback((employee: Employee, type: 'Accidente' | 'Licencia') => {
    setSelectedEmployee(employee);
    setActionType(type);
    setActionModalOpen(true);
  }, []);

  const handleOpenEditModal = useCallback((employee: Employee) => {
    setEmployeeToEdit(employee);
    setEditModalOpen(true);
  }, []);

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    updateEmployee(updatedEmployee);
    setEditModalOpen(false);
  };
  
  const handleActionSubmit = (details: string) => {
    if (selectedEmployee && actionType) {
        console.log({
            employeeId: selectedEmployee.id,
            action: actionType,
            details: details,
        });
        alert(`Reporte de ${actionType} enviado para ${selectedEmployee.name}`);
    }
    setActionModalOpen(false);
    setSelectedEmployee(null);
    setActionType(null);
  };

  return (
    <div className="min-h-screen">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="container mx-auto p-4 md:p-8">
        {currentPage === 'dashboard' && (
            <Dashboard 
                allCompanies={companies}
                employees={employees}
                unlockedCompanies={unlockedCompanies}
                onRequestUnlock={handleRequestUnlock}
            />
        )}
        {currentPage === 'employees' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <EmployeeManagement
                        employees={unlockedEmployees}
                        unlockedCompanies={unlockedCompanies}
                        onAddEmployee={() => setAddModalOpen(true)}
                        onCancelContract={cancelContract}
                        onSanction={sanctionEmployee}
                        onReportAction={handleOpenActionModal}
                        onEditProfile={handleOpenEditModal}
                        onRehire={rehireEmployee}
                    />
                </div>
                <div className="lg:col-span-1">
                    <SummaryGenerator />
                </div>
            </div>
        )}
      </main>

      <AddEmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddEmployee={(employeeData) => {
            const newEmployee: Employee = {
                ...employeeData,
                id: Date.now().toString(),
                avatarUrl: `https://picsum.photos/seed/${Date.now()}/400`,
                status: EmployeeStatus.ACTIVE,
                sanctions: 0,
                attendance: [],
                startDate: new Date().toISOString().split('T')[0],
            }
          addEmployee(newEmployee);
          setAddModalOpen(false);
        }}
      />

      {employeeToEdit && (
        <EditEmployeeModal
            isOpen={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
            employee={employeeToEdit}
            onUpdate={handleUpdateEmployee}
        />
      )}
      
      {selectedEmployee && actionType && (
         <ActionModal
            isOpen={isActionModalOpen}
            onClose={() => setActionModalOpen(false)}
            onSubmit={handleActionSubmit}
            employeeName={selectedEmployee.name}
            actionType={actionType}
        />
      )}

      {companyToUnlock && (
        <AccessModal 
            isOpen={isAccessModalOpen}
            onClose={() => setAccessModalOpen(false)}
            companyName={companyToUnlock.name}
            onUnlockAttempt={handleUnlockAttempt}
        />
      )}
    </div>
  );
};

export default App;
