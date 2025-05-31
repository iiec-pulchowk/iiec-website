import React from "react";
import { Plus } from "lucide-react";

const DashboardHeader = ({ error, onAddNew }) => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="flex space-x-2">
            <button
              onClick={onAddNew}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
            >
              <Plus size={16} />
              <span>Add New</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
