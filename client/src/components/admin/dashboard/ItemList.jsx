import React from "react";
import {
  Edit,
  Trash2,
  Plus,
  Check,
  XIcon,
  ImageIcon,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const ItemList = ({
  items,
  type,
  onEdit,
  onDelete,
  loading,
  expandedProjects,
  onToggleProject,
  onAddSection,
  onEditSection,
  onDeleteSection,
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
      case "upcoming":
        return "bg-green-100 text-green-800";
      case "inactive":
      case "past":
        return "bg-gray-100 text-gray-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 capitalize">
          {type} Management
        </h2>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No {type} found. Create your first one!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {type === "projects" && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Overview
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                  </>
                )}
                {type === "events" && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </>
                )}
                {type === "notices" && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notice
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </>
                )}
                {type === "products" && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      In Stock
                    </th>
                  </>
                )}
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <React.Fragment key={item.id}>
                  <tr className="hover:bg-gray-50">
                    {type === "projects" && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <button
                              onClick={() => onToggleProject(item.id)}
                              className="mr-2 p-1 hover:bg-gray-100 rounded"
                            >
                              {expandedProjects.has(item.id) ? (
                                <ChevronDown size={16} />
                              ) : (
                                <ChevronRight size={16} />
                              )}
                            </button>
                            <div>
                              <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                {item.name}
                              </div>
                              <div className="text-sm text-gray-500 truncate max-w-xs ">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-xs">
                          {item.overview || "No overview provided"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                      </>
                    )}
                    {type === "events" && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap truncate max-w-xs">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {item.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.description}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>{item.date}</div>
                          <div className="text-gray-500">{item.time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </>
                    )}
                    {type === "notices" && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap truncate max-w-xs">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {item.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.content}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(
                              item.priority
                            )}`}
                          >
                            {item.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>Publish: {item.publishDate}</div>
                          <div>Expire: {item.expiryDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </>
                    )}
                    {type === "products" && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap truncate max-w-xs">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.description}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl || "/placeholder.svg"}
                              alt={item.name}
                              className="h-12 w-12 rounded-lg object-cover"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                              }}
                            />
                          ) : null}
                          <div
                            className={`h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center ${
                              item.imageUrl ? "hidden" : "flex"
                            }`}
                          >
                            <ImageIcon size={20} className="text-gray-400" />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            {item.inStock ? (
                              <Check size={16} className="text-green-600" />
                            ) : (
                              <XIcon size={16} className="text-red-600" />
                            )}
                            <span className="ml-2">
                              {item.inStock ? "In Stock" : "Out of Stock"}
                            </span>
                          </div>
                        </td>
                      </>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => onEdit(item, type)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => onDelete(item.id, type)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Project Sections Row */}
                  {type === "projects" && expandedProjects.has(item.id) && (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 bg-gray-50">
                        <div className="ml-8">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="text-sm font-medium text-gray-900">
                              Project Sections
                            </h4>
                            <button
                              onClick={() => onAddSection(item.id)}
                              className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 flex items-center space-x-1"
                            >
                              <Plus size={12} />
                              <span>Add Section</span>
                            </button>
                          </div>
                          {item.sections && item.sections.length > 0 ? (
                            <div className="space-y-2">
                              {item.sections.map((section) => (
                                <div
                                  key={section.id}
                                  className="bg-white p-3 rounded border border-gray-200"
                                >
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <h5 className="text-sm font-medium text-gray-900">
                                        {section.title}
                                      </h5>
                                      <p className="text-sm text-gray-600 mt-1">
                                        {section.description}
                                      </p>
                                      {section.details && (
                                        <p className="text-xs text-gray-500 mt-1">
                                          {section.details}
                                        </p>
                                      )}
                                    </div>
                                    <div className="flex items-center space-x-2 ml-3">
                                      {section.imageUrl && (
                                        <img
                                          src={
                                            section.imageUrl ||
                                            "/placeholder.svg"
                                          }
                                          alt={section.title}
                                          className="h-8 w-8 rounded object-cover"
                                        />
                                      )}
                                      <button
                                        onClick={() =>
                                          onEditSection(section, item.id)
                                        }
                                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                      >
                                        <Edit size={12} />
                                      </button>
                                      <button
                                        onClick={() =>
                                          onDeleteSection(section.id, item.id)
                                        }
                                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                      >
                                        <Trash2 size={12} />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">
                              No sections added yet.
                            </p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ItemList;
