import axios from 'axios';
import type { Task, TaskCreate, TaskUpdate } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Add Authorization header if API key is present
api.interceptors.request.use((config) => {
  const apiKey = import.meta.env.VITE_CONDUCTOR_API_KEY;
  if (apiKey) {
    config.headers['Authorization'] = `Bearer ${apiKey}`;
  }
  return config;
});

// Response interceptor: Validate response format and provide detailed error messages
api.interceptors.response.use(
  (response) => {
    const contentType = response.headers['content-type'];
    if (typeof contentType === 'string' && contentType.includes('text/html')) {
      return Promise.reject({
        response: {
          data: { detail: 'Invalid response: Gateway returned an HTML page instead of JSON. Check your VITE_API_BASE_URL.' }
        }
      });
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (status === 401 || status === 403) {
        error.message = error.message || 'Authentication failed. Check your VITE_CONDUCTOR_API_KEY.';
      } else if (status >= 500) {
        error.message = data?.detail || error.message || 'Backend server error. The API gateway or upstream backend may be down.';
      } else if (status >= 400) {
        error.message = data?.detail || error.message || 'Request failed';
      }
    } else if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout. The API gateway may be unreachable.';
    } else if (!error.response) {
      error.message = 'Network error: Cannot reach the API gateway. Check that VITE_API_BASE_URL is correct and the backend is running.';
    }

    return Promise.reject(error);
  }
);

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
    params: { completed },
  });
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/api/tasks/${id}`);
};

export default api;
