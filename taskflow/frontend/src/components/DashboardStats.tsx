import React from 'react';
import { Task } from '../types';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  ExclamationCircleIcon, 
  QueueListIcon 
} from '@heroicons/react/24/outline';

interface DashboardStatsProps {
  tasks: Task[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const active = total - completed;
  const highPriority = tasks.filter(t => !t.completed && t.priority === 'high').length;

  const stats = [
    { name: 'Total Tasks', value: total, icon: QueueListIcon, color: 'text-blue-500', bg: 'bg-blue-50' },
    { name: 'Active Tasks', value: active, icon: ClockIcon, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { name: 'Completed Tasks', value: completed, icon: CheckCircleIcon, color: 'text-green-500', bg: 'bg-green-50' },
    { name: 'High Priority', value: highPriority, icon: ExclamationCircleIcon, color: 'text-red-500', bg: 'bg-red-50' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 mb-8">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white overflow-hidden rounded-xl shadow-sm border border-gray-100 flex items-center p-5 transition-all hover:shadow-md">
          <div className={`p-3 rounded-lg ${stat.bg} mr-4`}>
            <stat.icon className={`h-6 w-6 ${stat.color}`} aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 truncate">{stat.name}</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
