import React from "react";
import { Plus, AlertCircle } from "lucide-react";

const DashboardHeader = ({ error, onAddNew, activeTab }) => {
  const canAddNew = activeTab !== "orders"; // Determine if "Add New" is allowed

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="flex space-x-2">
            {canAddNew && ( // Conditionally render or disable the button
              <button
                onClick={onAddNew}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                // disabled={!canAddNew} // Alternative: disable instead of hiding
              >
                <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Add New {activeTab.slice(0, -1)}
              </button>
            )}
          </div>
        </div>
      </div>
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle
                  className="h-5 w-5 text-red-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
