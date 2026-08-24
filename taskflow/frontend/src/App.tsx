import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DashboardStats from './components/DashboardStats';
import TaskForm from './components/TaskForm';
import Filters from './components/Filters';
import TaskList from './components/TaskList';
import { useTasks } from './hooks/useTasks';
import { Task } from './types';

function App() {
  const {
    tasks,
    loading,
    error,
    fetchTasks,
    handleCreateTask,
    handleUpdateTask,
    handleToggleComplete,
    handleDeleteTask,
  } = useTasks();

  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTasks(statusFilter, searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [statusFilter, searchQuery, fetchTasks]);

  const onFormSubmit = async (data: any) => {
    if (editingTask) {
      const success = await handleUpdateTask(editingTask.id, data);
      if (success) {
        setEditingTask(undefined);
      }
      return success;
    } else {
      return await handleCreateTask(data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 rounded-md bg-red-50 text-red-700 text-sm border border-red-200">
            {error}
          </div>
        )}

        <DashboardStats tasks={tasks} />

        <div className="grid gap-8 grid-cols-1">
          <section>
            <TaskForm 
              onSubmit={onFormSubmit} 
              initialData={editingTask}
              onCancel={editingTask ? () => setEditingTask(undefined) : undefined}
            />
          </section>

          <section>
            <Filters 
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            <TaskList
              tasks={tasks}
              loading={loading}
              onToggleComplete={handleToggleComplete}
              onEdit={setEditingTask}
              onDelete={handleDeleteTask}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
