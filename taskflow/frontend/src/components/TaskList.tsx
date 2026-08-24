import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';
import { QueueListIcon } from '@heroicons/react/24/outline';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onToggleComplete: (id: number, current: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, loading, onToggleComplete, onEdit, onDelete }) => {
  if (loading && tasks.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
        <QueueListIcon className="mx-auto h-12 w-12 text-gray-300" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No tasks found</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new task above.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
