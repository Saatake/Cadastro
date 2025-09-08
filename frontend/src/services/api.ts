import axios from 'axios';
import { User, Task } from '../types';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API
export const userApi = {
  getAll: () => api.get<User[]>('/usuarios'),
  getById: (id: number) => api.get<User>(`/usuarios/${id}`),
  create: (user: Omit<User, 'id'>) => api.post<User>('/usuarios', user),
  update: (id: number, user: Omit<User, 'id'>) => api.put<User>(`/usuarios/${id}`, user),
  delete: (id: number) => api.delete(`/usuarios/${id}`),
};

// Task API
export const taskApi = {
  getAll: () => api.get<Task[]>('/tarefas'),
  getById: (id: number) => api.get<Task>(`/tarefas/${id}`),
  create: (task: Omit<Task, 'id'>) => api.post<Task>('/tarefas', task),
  update: (id: number, task: Omit<Task, 'id'>) => api.put<Task>(`/tarefas/${id}`, task),
  delete: (id: number) => api.delete(`/tarefas/${id}`),
};

export default api;