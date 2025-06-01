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

  // const getPriorityColor = (priority) => {
  //   switch (priority) {
  //     case "high":
  //       return "bg-red-100 text-red-800";
  //     case "medium":
  //       return "bg-yellow-100 text-yellow-800";
  //     case "low":
  //       return "bg-green-100 text-green-800";
  //     default:
  //       return "bg-gray-100 text-gray-800";
  //   }
  // };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-10">
        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No {type} found
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by creating a new {type.slice(0, -1)}.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 capitalize">
          {type} Management
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <ul role="list" className="divide-y divide-gray-200">
          {/* Headers */}
          <li className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {type === "projects" && (
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-4">Project Name</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-3">Last Updated</div>
                <div className="col-span-3 text-right">Actions</div>
              </div>
            )}
            {type === "events" && (
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-3">Event</div>
                <div className="col-span-2">Image</div>
                <div className="col-span-2">Date & Time</div>
                <div className="col-span-2">Location</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>
            )}
            {type === "notices" && (
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-4">Title</div>
                <div className="col-span-2">Priority</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Publish Date</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>
            )}
            {type === "products" && (
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-3">Product Name</div>
                <div className="col-span-2">Image</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-2">In Stock</div>
                <div className="col-span-3 text-right">Actions</div>
              </div>
            )}
            {type === "orders" && (
              <div className="grid grid-cols-12 gap-2 items-center">
                {" "}
                {/* Adjusted gap */}
                <div className="col-span-1 text-center">Order ID</div>
                <div className="col-span-2 text-center">Full Name</div>
                <div className="col-span-1 text-center">Product Title</div>{" "}
                {/* Adjusted span */}
                <div className="col-span-2 text-center">Email</div>
                <div className="col-span-1 text-center">Contact</div>
                <div className="col-span-1 text-center">Qty</div>{" "}
                {/* Added text-center */}
                <div className="col-span-1 text-center">Total</div>
                <div className="col-span-1 text-center">Date</div>
                <div className="col-span-1 text-center">Time</div>
                <div className="col-span-1 text-center">Actions</div>{" "}
                {/* Changed "Action" to "Actions" */}
              </div>
            )}
          </li>

          {items.map((item) => (
            <li key={item.id} className="px-6 py-4">
              {/* Projects */}
              {type === "projects" && (
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4">
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
                  </div>
                  <div className="col-span-2">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="col-span-3 whitespace-nowrap text-sm text-gray-900">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                  <div className="col-span-3 text-right">
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
                  </div>
                </div>
              )}

              {/* Events */}
              {type === "events" && (
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-3">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {item.description}
                    </p>
                  </div>
                  <div className="col-span-2">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-10 w-10 rounded-md object-cover"
                        onError={(e) => (e.target.src = "/placeholder.svg")}
                      />
                    ) : (
                      <ImageIcon className="h-10 w-10 text-gray-300" />
                    )}
                  </div>
                  <div className="col-span-2 text-sm text-gray-500">
                    <p>{item.date}</p>
                    <p>{item.time}</p>
                  </div>
                  <div className="col-span-2 text-sm text-gray-500 truncate">
                    {item.location}
                  </div>
                  <div className="col-span-1">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status || "N/A"}
                    </span>
                  </div>
                  <div className="col-span-2 text-right space-x-2">
                    <button
                      onClick={() => onEdit(item, type)}
                      className="text-blue-600 hover:text-blue-900"
                      aria-label={`Edit ${item.title}`}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(item.id, type)}
                      className="text-red-600 hover:text-red-900"
                      aria-label={`Delete ${item.title}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* Notices */}
              {type === "notices" && (
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4 truncate">
                    <div className="text-sm font-medium text-gray-900">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-500">{item.content}</div>
                  </div>
                  <div className="col-span-2">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(
                        item.priority
                      )}`}
                    >
                      {item.priority}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="col-span-2 whitespace-nowrap text-sm text-gray-900">
                    <div>Publish: {item.publishDate}</div>
                    <div>Expire: {item.expiryDate}</div>
                  </div>
                  <div className="col-span-2 text-right">
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
                  </div>
                </div>
              )}

              {/* Products */}
              {type === "products" && (
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-3 truncate">
                    <div className="text-sm font-medium text-gray-900">
                      {item.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.description}
                    </div>
                  </div>
                  <div className="col-span-2">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-10 w-10 rounded-md object-cover"
                        onError={(e) => (e.target.src = "/placeholder.svg")}
                      />
                    ) : (
                      <ImageIcon className="h-10 w-10 text-gray-300" />
                    )}
                  </div>
                  <div className="col-span-2 whitespace-nowrap text-sm text-gray-900">
                    {item.price.toFixed(2)}
                  </div>
                  <div className="col-span-2 whitespace-nowrap text-sm text-gray-900">
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
                  </div>
                  <div className="col-span-3 text-right">
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
                  </div>
                </div>
              )}

              {/* Orders */}
              {type === "orders" && (
                <div className="grid grid-cols-12 gap-2 items-center text-center">
                  {" "}
                  {/* Adjusted gap */}
                  <div className="col-span-1 text-sm text-gray-900 text-center">
                    #{item.id}
                  </div>
                  <div className="col-span-2 text-sm text-gray-900 text-center">
                    {item.full_name}
                  </div>
                  <div className="col-span-1 text-sm text-gray-900 text-center">
                    {" "}
                    {/* Corrected and adjusted span */}
                    {item.product_title}
                  </div>
                  <div className="col-span-2 text-sm text-gray-500 text-center">
                    {item.email}
                  </div>
                  <div className="col-span-1 text-sm text-gray-500 text-center">
                    {item.contact}
                  </div>
                  <div className="col-span-1 text-sm text-gray-900 text-center">
                    {item.quantity}
                  </div>
                  <div className="col-span-1 text-sm text-gray-900 text-center">
                    Rs.{" "}
                    {item.total_amount ? item.total_amount.toFixed(2) : "0.00"}
                  </div>
                  <div className="col-span-1 text-sm text-gray-500 text-center">
                    {new Date(item.order_date).toLocaleDateString('en-GB')}
                  </div>
                  <div className="col-span-1 text-sm text-gray-500 text-center">
                    {new Date(item.order_date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true, // Ensures AM/PM format
                    })}
                  </div>
                  <div className="col-span-1 text-center space-x-2 ">
                    {/* <button
                      onClick={() => onEdit(item, type)}
                      className="text-blue-600 hover:text-blue-900"
                      aria-label={`Edit Order ${item.id}`}
                    >
                      <Edit size={18} />
                    </button> */}
                    <button
                      onClick={() => onDelete(item.id, type)}
                      className="text-red-600 hover:text-red-900"
                      aria-label={`Delete Order ${item.id}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* Project Sections Row */}
              {type === "projects" && expandedProjects.has(item.id) && (
                <div className="grid grid-cols-12 gap-4 items-center bg-gray-50 px-6 py-4">
                  <div className="col-span-12">
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
                                        section.imageUrl || "/placeholder.svg"
                                      }
                                      alt={section.title}
                                      className="h-8 w-8 rounded object-cover"
                                      onError={(e) => {
                                        e.target.src = "/placeholder.svg";
                                      }} // Simple fallback for section images
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
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ItemList;
