"use client";
import React, { useState, useEffect, useCallback } from "react";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardNav from "@/components/admin/dashboard/DashboardNav";
import ItemList from "@/components/admin/dashboard/ItemList";
import ItemForm from "@/components/admin/dashboard/ItemForm";
import ProjectSectionForm from "@/components/admin/dashboard/ProjectSectionForm";

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

  // Handle tab change and clear form state
  const handleTabChange = (newTab) => {
    // Clear all form-related state when switching tabs
    setActiveTab(newTab);
    setShowForm(false);
    setEditingItem(null);
    setShowSectionForm(false);
    setEditingSection(null);
    setSelectedProjectId(null);
  };

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
          // Replace with API call if available, using mock data for now
          setEvents([
            {
              id: 1,
              title: "Annual Conference 2025",
              description: "Join us for our biggest event of the year",
              date: "2025-06-15",
              time: "09:00",
              location: "Convention Center",
              image: null, // Or imageUrl: ""
              status: "upcoming",
            },
          ]);
          break;
        case "notices":
          // Replace with API call if available, using mock data for now
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
            // Transform backend data to match our frontend structure
            const transformedData = data.map((product) => ({
              ...product,
              inStock: product.in_stock !== undefined ? product.in_stock : true, // Ensure inStock is boolean
              imageUrl: product.image || null, // Match frontend field name
            }));
            setProducts(transformedData);
          } catch (err) {
            console.error(
              "Products API not available, using empty array:",
              err
            );
            setProducts([]); // Default to empty if API fails
          }
          break;
        default:
          // Optional: handle unknown tab or do nothing
          break;
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(`Failed to fetch ${activeTab}. ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [activeTab, API_BASE]); // API_BASE dependency added

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
            main_image_url: item.mainImageUrl || null, // Match backend field name
          };
          // Remove fields not expected by backend or managed by it
          delete projectData.mainImageUrl;
          delete projectData.sections; // Sections are managed separately
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
            // Transform backend response to match frontend structure
            const transformedItem = {
              ...savedItem,
              mainImageUrl: savedItem.main_image_url || null,
              createdAt: savedItem.created_at, // Ensure these are present
              updatedAt: savedItem.updated_at,
              sections: editingItem?.sections || [], // Preserve existing sections or initialize
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
            // Fallback to mock behavior if API fails
            if (editingItem) {
              const updatedItem = {
                ...item,
                id: editingItem.id,
                updatedAt: new Date().toISOString(),
              }; // Ensure all fields are present
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
              }; // Ensure all fields are present
              setProjects((prev) => [...prev, newItem]);
            }
          }
          break;
        case "events":
          // Mock behavior for events, replace with API call
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
          // Mock behavior for notices, replace with API call
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

          // Transform frontend data to match backend structure
          const productData = {
            ...item,
            in_stock: item.inStock, // Match backend field name
            image: item.imageUrl || null, // Match backend field name
          };
          delete productData.inStock; // Remove frontend-specific field name
          delete productData.imageUrl; // Remove frontend-specific field name

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
            // Transform backend response to match frontend structure
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
            // Fallback to mock behavior if API fails
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
        default:
          // Optional: handle unknown type
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
              // Check if response is JSON, if not, use text()
              let errorMsg = `HTTP error! status: ${response.status}`;
              try {
                const errorData = await response.json();
                errorMsg = errorData.detail || errorMsg;
              } catch (e) {
                // If not JSON, try to get text
                errorMsg = (await response.text()) || errorMsg;
              }
              throw new Error(errorMsg);
            }
            // No content expected on successful DELETE, so no response.json()
            setProjects((prev) => prev.filter((p) => p.id !== id));
          } catch (err) {
            console.error("API call failed, using mock behavior:", err);
            setError(`Failed to delete project. ${err.message}`);
            // Fallback: remove from UI anyway or handle error display
            setProjects((prev) => prev.filter((p) => p.id !== id));
          }
          break;
        case "events":
          // Mock behavior for events, replace with API call
          setEvents((prev) => prev.filter((e) => e.id !== id));
          break;
        case "notices":
          // Mock behavior for notices, replace with API call
          setNotices((prev) => prev.filter((n) => n.id !== id));
          break;
        case "products":
          try {
            const response = await fetch(`${API_BASE}/products/${id}`, {
              method: "DELETE",
            });
            if (!response.ok) {
              let errorMsg = `HTTP error! status: ${response.status}`;
              try {
                const errorData = await response.json();
                errorMsg = errorData.detail || errorMsg;
              } catch (e) {
                errorMsg = (await response.text()) || errorMsg;
              }
              throw new Error(errorMsg);
            }
            setProducts((prev) => prev.filter((p) => p.id !== id));
          } catch (err) {
            console.error("API call failed, using mock behavior:", err);
            setError(`Failed to delete product. ${err.message}`);
            setProducts((prev) => prev.filter((p) => p.id !== id));
          }
          break;
        default:
          // Optional: handle unknown type
          break;
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      // setError is already called in specific catch blocks if API fails
      if (!error) {
        // Set general error if not already set by API failure
        setError(`Failed to delete ${type.slice(0, -1)}. ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item, type) => {
    setEditingItem(item);
    setShowForm(true);
    setShowSectionForm(false); // Ensure section form is hidden
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setShowForm(true);
    setShowSectionForm(false); // Ensure section form is hidden
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setShowSectionForm(false);
    setEditingSection(null);
    setSelectedProjectId(null);
  };

  const handleAddSection = (projectId) => {
    setSelectedProjectId(projectId);
    setEditingSection(null); // Clear any previous editing section
    setShowSectionForm(true);
    setShowForm(false); // Hide main item form
  };

  const handleEditSection = (section, projectId) => {
    setSelectedProjectId(projectId);
    setEditingSection(section);
    setShowSectionForm(true);
    setShowForm(false); // Hide main item form
  };

  const handleSaveSection = async (sectionData) => {
    setLoading(true);
    setError(null);
    try {
      const method = editingSection ? "PUT" : "POST";
      let url;

      // Transform frontend data to match backend structure
      const apiData = {
        ...sectionData, // Contains title, description, details, imageUrl
        project_id: selectedProjectId,
        image_url: sectionData.imageUrl || null, // Match backend field name
      };
      delete apiData.imageUrl; // Remove frontend-specific field name

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
        // Transform backend response to match frontend structure
        const transformedSection = {
          ...savedSection,
          projectId: savedSection.project_id, // Ensure this matches frontend if needed
          imageUrl: savedSection.image_url || null,
          createdAt: savedSection.created_at, // Ensure these are present
          updatedAt: savedSection.updated_at,
        };

        // Update the projects state with the new/updated section
        setProjects((prevProjects) =>
          prevProjects.map((project) => {
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
        console.error("API call failed, using mock behavior for section:", err);
        // Fallback to mock behavior
        const newOrUpdatedSection = {
          ...sectionData,
          id: editingSection?.id || Date.now(),
          projectId: selectedProjectId,
          createdAt: editingSection?.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setProjects((prevProjects) =>
          prevProjects.map((project) => {
            if (project.id === selectedProjectId) {
              const updatedSections = editingSection
                ? (project.sections || []).map((s) =>
                    s.id === editingSection.id ? newOrUpdatedSection : s
                  )
                : [...(project.sections || []), newOrUpdatedSection];
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
        // No content expected on successful DELETE
      } catch (err) {
        console.error(
          "API call failed, using mock behavior for section deletion:",
          err
        );
        // Continue with UI update even if API fails, or handle error appropriately
      }

      // Update the projects state to remove the section
      setProjects((prevProjects) =>
        prevProjects.map((project) => {
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
      <DashboardHeader error={error} onAddNew={handleAddNew} />
      <DashboardNav activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm ? (
          <ItemForm
            type={activeTab}
            item={editingItem}
            onSave={handleSave}
            onCancel={handleCancelForm}
            loading={loading}
          />
        ) : showSectionForm ? (
          <ProjectSectionForm
            section={editingSection}
            projectId={selectedProjectId}
            onSave={handleSaveSection}
            onCancel={handleCancelForm}
            loading={loading}
          />
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
