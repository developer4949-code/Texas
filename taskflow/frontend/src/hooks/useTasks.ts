import { useState, useCallback } from 'react';
import { getTasks, createTask, updateTask, completeTask, deleteTask } from '../services/api';
import type { Task, TaskCreate, TaskUpdate } from '../types';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async (status?: string, search?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks(status, search);
      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        throw { response: { data: { detail: 'Invalid API response format (expected an array).' } } };
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateTask = async (data: TaskCreate) => {
    try {
      const newTask = await createTask(data);
      setTasks(prev => [newTask, ...prev]);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create task');
      return false;
    }
  };

  const handleUpdateTask = async (id: number, data: TaskUpdate) => {
    try {
      const updated = await updateTask(id, data);
      setTasks(prev => prev.map(t => (t.id === id ? updated : t)));
      return true;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update task');
      return false;
    }
  };

  const handleToggleComplete = async (id: number, currentStatus: boolean) => {
    try {
      const updated = await completeTask(id, !currentStatus);
      setTasks(prev => prev.map(t => (t.id === id ? updated : t)));
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update task status');
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to delete task');
    }
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    handleCreateTask,
    handleUpdateTask,
    handleToggleComplete,
    handleDeleteTask,
  };
};
