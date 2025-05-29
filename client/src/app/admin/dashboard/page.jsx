"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Calendar,
  Bell,
  ShoppingCart,
  Upload,
  Check,
  XIcon,
  ImageIcon,
  Link,
  FolderOpen,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [events, setEvents] = useState([]);
  const [notices, setNotices] = useState([]);
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedProjects, setExpandedProjects] = useState(new Set());
  const [showSectionForm, setShowSectionForm] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // Update API URL to match your FastAPI backend
  const API_BASE = "http://localhost:8080";

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  // Fetch data based on active tab
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      switch (activeTab) {
        case "projects":
          try {
            response = await fetch(`${API_BASE}/projects`);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // Transform backend data to match our frontend structure
            const transformedData = data.map((project) => ({
              ...project,
              mainImageUrl: project.main_image_url || null,
              createdAt: project.created_at,
              updatedAt: project.updated_at,
              sections: project.sections || [],
            }));
            setProjects(transformedData);
          } catch (err) {
            console.error("Projects API not available, using mock data:", err);
            setProjects([
              {
                id: 1,
                name: "Website Redesign",
                description: "Complete overhaul of company website",
                overview:
                  "A comprehensive redesign project to modernize our web presence",
                mainImageUrl: null,
                status: "active",
                createdAt: "2025-01-15T10:00:00Z",
                updatedAt: "2025-01-20T15:30:00Z",
                sections: [
                  {
                    id: 1,
                    projectId: 1,
                    title: "Design Phase",
                    description: "Create mockups and wireframes",
                    details:
                      "Detailed design specifications and user experience flow",
                    imageUrl: null,
                  },
                  {
                    id: 2,
                    projectId: 1,
                    title: "Development Phase",
                    description: "Frontend and backend implementation",
                    details: "Full stack development using modern technologies",
                    imageUrl: null,
                  },
                ],
              },
            ]);
          }
          break;
        case "events":
          setEvents([
            {
              id: 1,
              title: "Annual Conference 2025",
              description: "Join us for our biggest event of the year",
              date: "2025-06-15",
              time: "09:00",
              location: "Convention Center",
              image: null,
              status: "upcoming",
            },
          ]);
          break;
        case "notices":
          setNotices([
            {
              id: 1,
              title: "Important Update",
              content: "Please note the new office hours starting next week",
              priority: "high",
              publishDate: "2025-05-20",
              expiryDate: "2025-06-20",
              status: "active",
            },
          ]);
          break;
        case "products":
          try {
            response = await fetch(`${API_BASE}/products`);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const transformedData = data.map((product) => ({
              ...product,
              inStock: product.in_stock !== undefined ? product.in_stock : true,
              imageUrl: product.image || null,
            }));
            setProducts(transformedData);
          } catch (err) {
            console.error(
              "Products API not available, using empty array:",
              err
            );
            setProducts([]);
          }
          break;
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(`Failed to fetch ${activeTab}. ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [activeTab, API_BASE]);

  const handleSave = async (item, type) => {
    setLoading(true);
    setError(null);
    try {
      let response;
      const method = editingItem ? "PUT" : "POST";
      let url;

      switch (type) {
        case "projects":
          url = editingItem
            ? `${API_BASE}/projects/${editingItem.id}`
            : `${API_BASE}/projects/`;

          // Transform frontend data to match backend structure
          const projectData = {
            ...item,
            main_image_url: item.mainImageUrl || null,
          };
          delete projectData.mainImageUrl;
          delete projectData.sections;
          delete projectData.createdAt;
          delete projectData.updatedAt;

          try {
            response = await fetch(url, {
              method: method,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(projectData),
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const savedItem = await response.json();
            const transformedItem = {
              ...savedItem,
              mainImageUrl: savedItem.main_image_url || null,
              createdAt: savedItem.created_at,
              updatedAt: savedItem.updated_at,
              sections: editingItem?.sections || [],
            };

            if (editingItem) {
              setProjects((prev) =>
                prev.map((p) => (p.id === editingItem.id ? transformedItem : p))
              );
            } else {
              setProjects((prev) => [...prev, transformedItem]);
            }
          } catch (err) {
            console.error("API call failed, using mock behavior:", err);
            if (editingItem) {
              const updatedItem = {
                ...item,
                id: editingItem.id,
                updatedAt: new Date().toISOString(),
              };
              setProjects((prev) =>
                prev.map((p) => (p.id === editingItem.id ? updatedItem : p))
              );
            } else {
              const newItem = {
                ...item,
                id: Date.now(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                sections: [],
              };
              setProjects((prev) => [...prev, newItem]);
            }
          }
          break;
        case "events":
          if (editingItem) {
            const updatedItem = { ...item, id: editingItem.id };
            setEvents((prev) =>
              prev.map((e) => (e.id === editingItem.id ? updatedItem : e))
            );
          } else {
            const newItem = { ...item, id: Date.now() };
            setEvents((prev) => [...prev, newItem]);
          }
          break;
        case "notices":
          if (editingItem) {
            const updatedItem = { ...item, id: editingItem.id };
            setNotices((prev) =>
              prev.map((n) => (n.id === editingItem.id ? updatedItem : n))
            );
          } else {
            const newItem = { ...item, id: Date.now() };
            setNotices((prev) => [...prev, newItem]);
          }
          break;
        case "products":
          url = editingItem
            ? `${API_BASE}/products/${editingItem.id}`
            : `${API_BASE}/products/`;

          const productData = {
            ...item,
            in_stock: item.inStock,
            image: item.imageUrl || null,
          };
          delete productData.inStock;
          delete productData.imageUrl;

          try {
            response = await fetch(url, {
              method: method,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(productData),
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const savedItem = await response.json();
            const transformedItem = {
              ...savedItem,
              inStock:
                savedItem.in_stock !== undefined ? savedItem.in_stock : true,
              imageUrl: savedItem.image || null,
            };

            if (editingItem) {
              setProducts((prev) =>
                prev.map((p) => (p.id === editingItem.id ? transformedItem : p))
              );
            } else {
              setProducts((prev) => [...prev, transformedItem]);
            }
          } catch (err) {
            console.error("API call failed, using mock behavior:", err);
            if (editingItem) {
              const updatedItem = {
                ...item,
                id: editingItem.id,
                inStock: item.inStock !== undefined ? item.inStock : true,
              };
              setProducts((prev) =>
                prev.map((p) => (p.id === editingItem.id ? updatedItem : p))
              );
            } else {
              const newItem = {
                ...item,
                id: Date.now(),
                inStock: item.inStock !== undefined ? item.inStock : true,
              };
              setProducts((prev) => [...prev, newItem]);
            }
          }
          break;
      }

      setShowForm(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Error saving item:", error);
      setError(`Failed to save ${type.slice(0, -1)}. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, type) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    setLoading(true);
    setError(null);
    try {
      switch (type) {
        case "projects":
          try {
            const response = await fetch(`${API_BASE}/projects/${id}`, {
              method: "DELETE",
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            setProjects((prev) => prev.filter((p) => p.id !== id));
          } catch (err) {
            console.error("API call failed, using mock behavior:", err);
            setProjects((prev) => prev.filter((p) => p.id !== id));
          }
          break;
        case "events":
          setEvents((prev) => prev.filter((e) => e.id !== id));
          break;
        case "notices":
          setNotices((prev) => prev.filter((n) => n.id !== id));
          break;
        case "products":
          try {
            const response = await fetch(`${API_BASE}/products/${id}`, {
              method: "DELETE",
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            setProducts((prev) => prev.filter((p) => p.id !== id));
          } catch (err) {
            console.error("API call failed, using mock behavior:", err);
            setProducts((prev) => prev.filter((p) => p.id !== id));
          }
          break;
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      setError(`Failed to delete ${type.slice(0, -1)}. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item, type) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleAddSection = (projectId) => {
    setSelectedProjectId(projectId);
    setEditingSection(null);
    setShowSectionForm(true);
  };

  const handleEditSection = (section, projectId) => {
    setSelectedProjectId(projectId);
    setEditingSection(section);
    setShowSectionForm(true);
  };

  const handleSaveSection = async (sectionData) => {
    setLoading(true);
    setError(null);
    try {
      const method = editingSection ? "PUT" : "POST";
      let url;

      // Transform frontend data to match backend structure
      const apiData = {
        ...sectionData,
        project_id: selectedProjectId,
        image_url: sectionData.imageUrl || null,
      };
      delete apiData.imageUrl;

      if (editingSection) {
        url = `${API_BASE}/project-sections/${editingSection.id}`;
      } else {
        url = `${API_BASE}/project-sections/`;
      }

      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const savedSection = await response.json();
        const transformedSection = {
          ...savedSection,
          projectId: savedSection.project_id,
          imageUrl: savedSection.image_url || null,
          createdAt: savedSection.created_at,
          updatedAt: savedSection.updated_at,
        };

        // Update the projects state with the new/updated section
        setProjects((prev) =>
          prev.map((project) => {
            if (project.id === selectedProjectId) {
              const updatedSections = editingSection
                ? (project.sections || []).map((s) =>
                    s.id === editingSection.id ? transformedSection : s
                  )
                : [...(project.sections || []), transformedSection];
              return { ...project, sections: updatedSections };
            }
            return project;
          })
        );
      } catch (err) {
        console.error("API call failed, using mock behavior:", err);
        // Fallback to mock behavior
        const newSection = {
          ...sectionData,
          id: editingSection?.id || Date.now(),
          projectId: selectedProjectId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setProjects((prev) =>
          prev.map((project) => {
            if (project.id === selectedProjectId) {
              const updatedSections = editingSection
                ? (project.sections || []).map((s) =>
                    s.id === editingSection.id ? newSection : s
                  )
                : [...(project.sections || []), newSection];
              return { ...project, sections: updatedSections };
            }
            return project;
          })
        );
      }

      setShowSectionForm(false);
      setEditingSection(null);
      setSelectedProjectId(null);
    } catch (error) {
      console.error("Error saving section:", error);
      setError(`Failed to save section. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSection = async (sectionId, projectId) => {
    if (!confirm("Are you sure you want to delete this section?")) return;

    setLoading(true);
    setError(null);
    try {
      try {
        const response = await fetch(
          `${API_BASE}/project-sections/${sectionId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (err) {
        console.error("API call failed, using mock behavior:", err);
      }

      // Update the projects state to remove the section
      setProjects((prev) =>
        prev.map((project) => {
          if (project.id === projectId) {
            return {
              ...project,
              sections: (project.sections || []).filter(
                (s) => s.id !== sectionId
              ),
            };
          }
          return project;
        })
      );
    } catch (error) {
      console.error("Error deleting section:", error);
      setError(`Failed to delete section. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleProjectExpansion = (projectId) => {
    setExpandedProjects((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case "projects":
        return projects;
      case "events":
        return events;
      case "notices":
        return notices;
      case "products":
        return products;
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
                onClick={() => setShowForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
              >
                <Plus size={16} />
                <span>Add New</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              {
                id: "projects",
                label: "Projects",
                icon: FolderOpen,
              },
              {
                id: "events",
                label: "Events",
                icon: Calendar,
              },
              {
                id: "notices",
                label: "Notices",
                icon: Bell,
              },
              {
                id: "products",
                label: "Products",
                icon: ShoppingCart,
              },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showForm && !showSectionForm ? (
          <ItemList
            items={getCurrentData()}
            type={activeTab}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
            expandedProjects={expandedProjects}
            onToggleProject={toggleProjectExpansion}
            onAddSection={handleAddSection}
            onEditSection={handleEditSection}
            onDeleteSection={handleDeleteSection}
          />
        ) : showSectionForm ? (
          <ProjectSectionForm
            section={editingSection}
            projectId={selectedProjectId}
            onSave={handleSaveSection}
            onCancel={() => {
              setShowSectionForm(false);
              setEditingSection(null);
              setSelectedProjectId(null);
            }}
            loading={loading}
          />
        ) : (
          <ItemForm
            type={activeTab}
            item={editingItem}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingItem(null);
            }}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

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
                              <div className="text-sm font-medium text-gray-900">
                                {item.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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
                        <td className="px-6 py-4 whitespace-nowrap">
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
                        <td className="px-6 py-4 whitespace-nowrap">
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
                        <td className="px-6 py-4 whitespace-nowrap">
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
                          ${item.price.toFixed(2)}
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

const ItemForm = ({ type, item, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState(item || getDefaultFormData(type));
  const [imageUploadType, setImageUploadType] = useState("url");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (item?.imageUrl || item?.mainImageUrl) {
      setImagePreview(item.imageUrl || item.mainImageUrl);
    } else {
      setImagePreview(null);
    }
  }, [item]);

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData(getDefaultFormData(type));
    }
  }, [item, type]);

  function getDefaultFormData(type) {
    switch (type) {
      case "projects":
        return {
          name: "",
          description: "",
          overview: "",
          mainImageUrl: "",
          status: "active",
        };
      case "events":
        return {
          title: "",
          description: "",
          date: "",
          time: "",
          location: "",
          image: null,
          status: "upcoming",
        };
      case "notices":
        return {
          title: "",
          content: "",
          priority: "medium",
          publishDate: new Date().toISOString().split("T")[0],
          expiryDate: "",
          status: "active",
        };
      case "products":
        return {
          name: "",
          description: "",
          price: 0,
          inStock: true,
          imageUrl: "",
        };
      default:
        return {};
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData, type);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUrlChange = (url) => {
    const imageField = type === "projects" ? "mainImageUrl" : "imageUrl";
    handleChange(imageField, url);
    setImagePreview(url);
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        const imageField = type === "projects" ? "mainImageUrl" : "imageUrl";
        handleChange(imageField, dataUrl);
        setImagePreview(dataUrl);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">
          {item ? `Edit ${type.slice(0, -1)}` : `Add New ${type.slice(0, -1)}`}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {type === "projects" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Overview
              </label>
              <textarea
                value={formData.overview}
                onChange={(e) => handleChange("overview", e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Detailed project overview..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Project Image
              </label>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setImageUploadType("url")}
                    className={`px-3 py-2 text-sm font-medium rounded-md flex items-center space-x-2 ${
                      imageUploadType === "url"
                        ? "bg-blue-100 text-blue-700 border border-blue-300"
                        : "bg-gray-100 text-gray-700 border border-gray-300"
                    }`}
                  >
                    <Link size={16} />
                    <span>URL</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageUploadType("file")}
                    className={`px-3 py-2 text-sm font-medium rounded-md flex items-center space-x-2 ${
                      imageUploadType === "file"
                        ? "bg-blue-100 text-blue-700 border border-blue-300"
                        : "bg-gray-100 text-gray-700 border border-gray-300"
                    }`}
                  >
                    <Upload size={16} />
                    <span>Upload</span>
                  </button>
                </div>

                {imageUploadType === "url" && (
                  <div>
                    <input
                      type="url"
                      placeholder="Enter image URL"
                      value={formData.mainImageUrl || ""}
                      onChange={(e) => handleImageUrlChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}

                {imageUploadType === "file" && (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e.target.files[0])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Supported formats: JPG, PNG, GIF (Max 5MB)
                    </p>
                  </div>
                )}

                {imagePreview && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preview
                    </label>
                    <div className="relative inline-block">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="h-32 w-32 object-cover rounded-lg border"
                        onError={() => setImagePreview(null)}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          handleChange("mainImageUrl", "");
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </>
        )}

        {type === "events" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleChange("time", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </>
        )}

        {type === "notices" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notice Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleChange("content", e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleChange("priority", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Publish Date
                </label>
                <input
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) => handleChange("publishDate", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => handleChange("expiryDate", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </>
        )}

        {type === "products" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setImageUploadType("url")}
                    className={`px-3 py-2 text-sm font-medium rounded-md flex items-center space-x-2 ${
                      imageUploadType === "url"
                        ? "bg-blue-100 text-blue-700 border border-blue-300"
                        : "bg-gray-100 text-gray-700 border border-gray-300"
                    }`}
                  >
                    <Link size={16} />
                    <span>URL</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageUploadType("file")}
                    className={`px-3 py-2 text-sm font-medium rounded-md flex items-center space-x-2 ${
                      imageUploadType === "file"
                        ? "bg-blue-100 text-blue-700 border border-blue-300"
                        : "bg-gray-100 text-gray-700 border border-gray-300"
                    }`}
                  >
                    <Upload size={16} />
                    <span>Upload</span>
                  </button>
                </div>

                {imageUploadType === "url" && (
                  <div>
                    <input
                      type="url"
                      placeholder="Enter image URL"
                      value={formData.imageUrl || ""}
                      onChange={(e) => handleImageUrlChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}

                {imageUploadType === "file" && (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e.target.files[0])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Supported formats: JPG, PNG, GIF (Max 5MB)
                    </p>
                  </div>
                )}

                {imagePreview && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preview
                    </label>
                    <div className="relative inline-block">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="h-32 w-32 object-cover rounded-lg border"
                        onError={() => setImagePreview(null)}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          handleChange("imageUrl", "");
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    handleChange(
                      "price",
                      Number.parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  In Stock
                </label>
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => handleChange("inStock", e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Product is in stock
                  </label>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Save size={16} />
            )}
            <span>{loading ? "Saving..." : "Save"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

const ProjectSectionForm = ({
  section,
  projectId,
  onSave,
  onCancel,
  loading,
}) => {
  const [formData, setFormData] = useState(
    section || {
      title: "",
      description: "",
      details: "",
      imageUrl: "",
    }
  );
  const [imageUploadType, setImageUploadType] = useState("url");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (section?.imageUrl) {
      setImagePreview(section.imageUrl);
    } else {
      setImagePreview(null);
    }
  }, [section]);

  useEffect(() => {
    if (section) {
      setFormData(section);
    } else {
      setFormData({
        title: "",
        description: "",
        details: "",
        imageUrl: "",
      });
    }
  }, [section]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUrlChange = (url) => {
    handleChange("imageUrl", url);
    setImagePreview(url);
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        handleChange("imageUrl", dataUrl);
        setImagePreview(dataUrl);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">
          {section ? "Edit Project Section" : "Add New Project Section"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Details
          </label>
          <textarea
            value={formData.details}
            onChange={(e) => handleChange("details", e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Additional details about this section..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section Image
          </label>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setImageUploadType("url")}
                className={`px-3 py-2 text-sm font-medium rounded-md flex items-center space-x-2 ${
                  imageUploadType === "url"
                    ? "bg-blue-100 text-blue-700 border border-blue-300"
                    : "bg-gray-100 text-gray-700 border border-gray-300"
                }`}
              >
                <Link size={16} />
                <span>URL</span>
              </button>
              <button
                type="button"
                onClick={() => setImageUploadType("file")}
                className={`px-3 py-2 text-sm font-medium rounded-md flex items-center space-x-2 ${
                  imageUploadType === "file"
                    ? "bg-blue-100 text-blue-700 border border-blue-300"
                    : "bg-gray-100 text-gray-700 border border-gray-300"
                }`}
              >
                <Upload size={16} />
                <span>Upload</span>
              </button>
            </div>

            {imageUploadType === "url" && (
              <div>
                <input
                  type="url"
                  placeholder="Enter image URL"
                  value={formData.imageUrl || ""}
                  onChange={(e) => handleImageUrlChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            {imageUploadType === "file" && (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: JPG, PNG, GIF (Max 5MB)
                </p>
              </div>
            )}

            {imagePreview && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preview
                </label>
                <div className="relative inline-block">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded-lg border"
                    onError={() => setImagePreview(null)}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      handleChange("imageUrl", "");
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Save size={16} />
            )}
            <span>{loading ? "Saving..." : "Save Section"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminDashboard;
