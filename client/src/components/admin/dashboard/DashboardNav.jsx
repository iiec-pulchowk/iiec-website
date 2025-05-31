import React from "react";
import { FolderOpen, Calendar, Bell, ShoppingCart } from "lucide-react";

const navItems = [
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "events", label: "Events", icon: Calendar },
  { id: "products", label: "Products", icon: ShoppingCart },
];

const DashboardNav = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-8">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                activeTab === id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default DashboardNav;
