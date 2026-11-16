export interface Employee {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at?: string;
}

export interface EmployeeFormData {
    name: string;
    email: string;
    role: string;
}