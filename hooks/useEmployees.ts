
import { useState, useCallback } from 'react';
import type { Employee } from '../types';
import { EmployeeStatus, ContractType } from '../types';

const initialEmployees: Employee[] = [
  {
    id: '1',
    name: 'Carlos Rodriguez',
    position: 'Desarrollador Frontend',
    avatarUrl: 'https://picsum.photos/seed/carlos/400',
    status: EmployeeStatus.ACTIVE,
    startDate: '2022-01-15',
    salary: 50000,
    sanctions: 0,
    attendance: [{ date: '2024-07-26', clockIn: '09:05', clockOut: '18:02' }],
    company: 'Pachy Central',
    contractType: ContractType.FULL_TIME,
    sex: 'Masculino',
    personalInfo: 'Experto en React y tecnologías web modernas.'
  },
  {
    id: '2',
    name: 'Ana Gomez',
    position: 'Gerente de Proyecto',
    avatarUrl: 'https://picsum.photos/seed/ana/400',
    status: EmployeeStatus.ACTIVE,
    startDate: '2021-03-20',
    salary: 75000,
    sanctions: 1,
    attendance: [{ date: '2024-07-26', clockIn: '08:58', clockOut: '17:55' }],
    company: 'Pachy Central',
    contractType: ContractType.FULL_TIME,
    sex: 'Femenino',
    personalInfo: 'Certificada en PMP con 5 años de experiencia liderando equipos.'
  },
  {
    id: '3',
    name: 'Luisa Fernandez',
    position: 'Diseñadora UI/UX',
    avatarUrl: 'https://picsum.photos/seed/luisa/400',
    status: EmployeeStatus.INACTIVE,
    startDate: '2020-07-10',
    endDate: '2023-12-31',
    salary: 60000,
    sanctions: 0,
    attendance: [],
    company: 'Pachy Central',
    contractType: ContractType.TEMPORARY,
    sex: 'Femenino',
    personalInfo: 'Apasionada por crear interfaces intuitivas y centradas en el usuario.'
  },
  {
    id: '4',
    name: 'Juan Perez',
    position: 'Analista de Sistemas',
    avatarUrl: 'https://picsum.photos/seed/juan/400',
    status: EmployeeStatus.ACTIVE,
    startDate: '2023-02-01',
    salary: 45000,
    sanctions: 0,
    attendance: [{ date: '2024-07-26', clockIn: '09:00', clockOut: '18:00' }],
    company: 'Adhoc S.A',
    contractType: ContractType.FULL_TIME,
    sex: 'Masculino',
    personalInfo: 'Especialista en bases de datos SQL.'
  },
  {
    id: '5',
    name: 'Sofia Lopez',
    position: 'Especialista en Marketing',
    avatarUrl: 'https://picsum.photos/seed/sofia/400',
    status: EmployeeStatus.ACTIVE,
    startDate: '2022-09-10',
    salary: 48000,
    sanctions: 1,
    attendance: [{ date: '2024-07-26', clockIn: '09:15', clockOut: '18:10' }],
    company: 'Adhoc S.A',
    contractType: ContractType.PART_TIME,
    sex: 'Femenino',
    personalInfo: 'Experta en campañas de redes sociales y SEO.'
  },
  {
    id: '6',
    name: 'Martin Torres',
    position: 'Soporte Técnico',
    avatarUrl: 'https://picsum.photos/seed/martin/400',
    status: EmployeeStatus.INACTIVE,
    startDate: '2021-05-01',
    endDate: '2024-01-20',
    salary: 40000,
    sanctions: 2,
    attendance: [],
    company: 'Adhoc S.A',
    contractType: ContractType.FULL_TIME,
    sex: 'Masculino',
    personalInfo: 'Resolución de problemas de hardware y software.'
  }
];

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  const addEmployee = useCallback((employee: Employee) => {
    setEmployees((prev) => [employee, ...prev]);
  }, []);

  const updateEmployee = useCallback((updatedEmployee: Employee) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
  }, []);

  const cancelContract = useCallback((employeeId: string) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === employeeId
          ? { ...emp, status: EmployeeStatus.INACTIVE, endDate: new Date().toISOString().split('T')[0] }
          : emp
      )
    );
  }, []);

  const sanctionEmployee = useCallback((employeeId: string) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === employeeId ? { ...emp, sanctions: emp.sanctions + 1 } : emp
      )
    );
  }, []);
  
  const rehireEmployee = useCallback((employeeId: string) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === employeeId
          ? { ...emp, status: EmployeeStatus.ACTIVE, endDate: undefined }
          : emp
      )
    );
  }, []);

  return { employees, addEmployee, updateEmployee, cancelContract, sanctionEmployee, rehireEmployee };
};
