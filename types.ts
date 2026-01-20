
export enum EmployeeStatus {
  ACTIVE = 'Activo',
  INACTIVE = 'Inactivo',
}

export enum ContractType {
  FULL_TIME = 'Tiempo Indeterminado',
  PART_TIME = 'Tiempo Parcial',
  TEMPORARY = 'Temporal',
  EVENTUAL = 'Eventual',
}

export interface Attendance {
  date: string;
  clockIn: string;
  clockOut: string;
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  avatarUrl: string;
  status: EmployeeStatus;
  startDate: string;
  endDate?: string;
  salary: number;
  sanctions: number;
  attendance: Attendance[];
  company: string;
  contractType: ContractType;
  sex?: 'Masculino' | 'Femenino' | 'Otro';
  personalInfo?: string;
}
