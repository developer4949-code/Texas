import React from 'react';
import type { Task } from '../types';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: number, current: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const priorityColors = {
    low: 'bg-gray-100 text-gray-700',
    medium: 'bg-blue-100 text-blue-700',
    high: 'bg-red-100 text-red-700'
  };

  return (
    <div className={`group flex items-start p-5 bg-white rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md ${task.completed ? 'opacity-75' : ''}`}>
      <div className="flex-shrink-0 pt-1">
        <input
          type="checkbox"
          className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id, task.completed)}
        />
      </div>
      
      <div className="ml-4 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className={`text-sm font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
            {task.title}
          </p>
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
        </div>
        
        {task.description && (
          <p className={`mt-1 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-500'}`}>
            {task.description}
          </p>
        )}
        
        <div className="mt-3 flex items-center text-xs text-gray-400 gap-4">
          <span>Created: {new Date(task.created_at).toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="ml-4 flex-shrink-0 flex opacity-0 group-hover:opacity-100 transition-opacity gap-2">
        <button
          onClick={() => onEdit(task)}
          className="p-1.5 text-gray-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
          title="Edit"
        >
          <PencilIcon className="h-4 w-4" />
        </button>
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this task?')) {
              onDelete(task.id);
            }
          }}
          className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
          title="Delete"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
