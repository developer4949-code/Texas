import React from 'react';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-primary-600 p-2 rounded-lg">
                <ClipboardDocumentCheckIcon className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">
                TaskFlow
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {import.meta.env.VITE_CONDUCTOR_API_KEY && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                Connected through Conductor
              </span>
            )}
            <span className="text-sm text-gray-500 hidden sm:block">Manage your daily tasks efficiently</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
