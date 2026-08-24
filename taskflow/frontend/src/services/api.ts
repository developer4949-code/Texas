import axios from 'axios';
import type { Task, TaskCreate, TaskUpdate } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTasks = async (status?: string, search?: string): Promise<Task[]> => {
  const params = new URLSearchParams();
  if (status && status !== 'all') params.append('status', status);
  if (search) params.append('search', search);
  
  const response = await api.get(`/api/tasks`, { params });
  return response.data;
};

export const getTask = async (id: number): Promise<Task> => {
  const response = await api.get(`/api/tasks/${id}`);
  return response.data;
};

export const createTask = async (data: TaskCreate): Promise<Task> => {
  const response = await api.post('/api/tasks', data);
  return response.data;
};

export const updateTask = async (id: number, data: TaskUpdate): Promise<Task> => {
  const response = await api.put(`/api/tasks/${id}`, data);
  return response.data;
};

export const completeTask = async (id: number, completed: boolean): Promise<Task> => {
  const response = await api.patch(`/api/tasks/${id}/complete`, null, {
    params: { completed }
  });
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/api/tasks/${id}`);
};

export default api;
