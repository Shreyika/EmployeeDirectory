
import axios from 'axios';
import type { Employee } from '../types/Employee';

const API_URL = 'http://127.0.0.1:5000/employees';

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get<Employee[]>(API_URL);
  return response.data;
};

export const addEmployee = async (
  employee: Omit<Employee, 'id' | 'created_at'>
): Promise<{ message: string; id: number }> => {
  const response = await axios.post(API_URL, employee);
  return response.data;
};

export const updateEmployee = async (
  id: number,
  employee: Omit<Employee, 'id' | 'created_at'>
) => {
  const response = await axios.put(`${API_URL}/${id}`, employee);
  return response.data;
};

export const deleteEmployee = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
