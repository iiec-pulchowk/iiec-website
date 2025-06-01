"use client";
import React, { useState, useEffect, useCallback } from "react";

// Import modular components
import DashboardHeader from "../../../components/admin/dashboard/DashboardHeader";
import DashboardNav from "../../../components/admin/dashboard/DashboardNav";
import ItemList from "../../../components/admin/dashboard/ItemList";
import ItemForm from "../../../components/admin/dashboard/ItemForm";
import ProjectSectionForm from "../../../components/admin/dashboard/ProjectSectionForm";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [events, setEvents] = useState([]);
  const [notices, setNotices] = useState([]);
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [orders, setOrders] = useState([]); // Add state for orders
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

  // Function to calculate status, can be moved to a utility file if used elsewhere
  const getEventStatus = (eventDateStr) => {
    if (!eventDateStr) return "upcoming"; // Default if date is not set
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(eventDateStr);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today ? "upcoming" : "past";
  };

  useEffect(() => {
    // Reset form states when tab changes
    setEditingItem(null);
    setShowForm(false);
    setEditingSection(null);
    setShowSectionForm(false);
    setSelectedProjectId(null);

    fetchData();
  }, [activeTab]); // Add fetchData to dependency array if it's not already, ensure it's memoized with useCallback

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
              mainImageUrl: project.main_image_url || null, // For project's main image
              createdAt: project.created_at,
              updatedAt: project.updated_at,
              // Map sections and their image URLs
              sections: (project.sections || []).map((sec) => ({
                ...sec,
                imageUrl: sec.main_image_url || null, // Map main_image_url to imageUrl
                // project_id is already part of sec from backend
              })),
            }));
            setProjects(transformedData);
          } catch (err) {
            console.error("Projects API not available, using mock data:", err);
          }
          break;
        case "events":
          try {
            response = await fetch(`${API_BASE}/events`);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const transformedData = data.map((event) => ({
              ...event,
              status: getEventStatus(event.date), // Calculate status
            }));
            setEvents(transformedData);
          } catch (err) {
            console.error("Events API not available, using mock data:", err);
            setEvents(
              mockEventsData.map((event) => ({
                ...event,
                status: getEventStatus(event.date),
              }))
            );
          }
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
        case "orders": // Add case for orders
          try {
            response = await fetch(`${API_BASE}/orders`);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // Assuming backend returns data in the correct format for OrderHistory schema
            // No transformation needed if frontend schema matches backend response
            setOrders(data);
          } catch (err) {
            console.error("Orders API not available, using empty array:", err);
            setError(`Failed to fetch orders. ${err.message}`);
            setOrders([]);
          }
          break;
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(`Failed to fetch ${activeTab}. ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [activeTab, API_BASE]); // Removed getEventStatus from here, it's defined in component scope

  const handleSave = async (item, type) => {
    setLoading(true);
    setError(null);
    try {
      let response;
      const method = editingItem ? "PUT" : "POST";
      let url;
      let itemData = { ...item }; // Clone item to avoid modifying original state object directly

      switch (type) {
        case "projects":
          url = editingItem
            ? `${API_BASE}/projects/${editingItem.id}`
            : `${API_BASE}/projects/`;

          // Transform frontend data to match backend structure
          const projectPayload = {
            // Renamed to avoid conflict with projectData in outer scope
            ...item,
            main_image_url: item.mainImageUrl || null,
          };
          delete projectPayload.mainImageUrl; // Remove frontend-specific key
          delete projectPayload.sections; // Sections are managed separately
          delete projectPayload.createdAt;
          delete projectPayload.updatedAt;

          try {
            response = await fetch(url, {
              method: method,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(projectPayload), // Use renamed payload
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const savedItem = await response.json();
            // When a project is saved, its sections should ideally be re-fetched or updated if the backend returns them.
            // For now, we preserve existing sections on the frontend or rely on a full re-fetch if needed.
            // The backend GET /projects/{id} should return sections if properly configured.
            const transformedItem = {
              ...savedItem,
              mainImageUrl: savedItem.main_image_url || null,
              createdAt: savedItem.created_at,
              updatedAt: savedItem.updated_at,
              // If backend sends sections with project after save, map them here too
              sections: (savedItem.sections || editingItem?.sections || []).map(
                (sec) => ({
                  ...sec,
                  imageUrl: sec.main_image_url || null,
                })
              ),
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
          url = editingItem
            ? `${API_BASE}/events/${editingItem.id}`
            : `${API_BASE}/events/`;

          delete itemData.status; // Remove status before sending to backend
          // Ensure date is in YYYY-MM-DD format if it's a Date object
          if (itemData.date && typeof itemData.date !== "string") {
            itemData.date = itemData.date.toISOString().split("T")[0];
          }

          try {
            response = await fetch(url, {
              method: method,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(itemData), // itemData now excludes status
            });
            if (!response.ok) {
              const errorBody = await response.text();
              throw new Error(
                `HTTP error! status: ${response.status}, body: ${errorBody}`
              );
            }
            let savedItem = await response.json();
            savedItem = {
              ...savedItem,
              status: getEventStatus(savedItem.date),
            }; // Add calculated status to saved item

            if (editingItem) {
              setEvents((prev) =>
                prev.map((e) => (e.id === editingItem.id ? savedItem : e))
              );
            } else {
              setEvents((prev) => [...prev, savedItem]);
            }
          } catch (err) {
            console.error("Events API call failed, using mock behavior:", err);
            setError(
              `Failed to save event (API error): ${err.message}. Using mock behavior.`
            );
            // Mock behavior as fallback
            let mockSavedItem = {
              ...itemData,
              id: editingItem?.id || Date.now(),
            };
            mockSavedItem = {
              ...mockSavedItem,
              status: getEventStatus(mockSavedItem.date),
            };

            if (editingItem) {
              setEvents((prev) =>
                prev.map((e) => (e.id === editingItem.id ? mockSavedItem : e))
              );
            } else {
              setEvents((prev) => [...prev, mockSavedItem]);
            }
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
        case "orders": // Add case for orders
          url = editingItem
            ? `${API_BASE}/orders/${editingItem.id}`
            : `${API_BASE}/orders/`;

          // itemData should already match OrderHistoryCreate or OrderHistoryUpdate schema
          // No specific transformation needed here if ItemForm sends correct data
          // Ensure quantity and total_amount are numbers if they come as strings from form
          if (itemData.quantity)
            itemData.quantity = parseInt(itemData.quantity, 10);
          if (itemData.total_amount)
            itemData.total_amount = parseFloat(itemData.total_amount);

          try {
            response = await fetch(url, {
              method: method,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(itemData),
            });
            if (!response.ok) {
              const errorBody = await response.text();
              throw new Error(
                `HTTP error! status: ${response.status}, body: ${errorBody}`
              );
            }
            const savedItem = await response.json();
            if (editingItem) {
              setOrders((prev) =>
                prev.map((o) => (o.id === editingItem.id ? savedItem : o))
              );
            } else {
              setOrders((prev) => [...prev, savedItem]);
            }
          } catch (err) {
            console.error("Orders API call failed:", err);
            setError(`Failed to save order (API error): ${err.message}.`);
            // Optionally, add mock behavior for fallback if needed
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
          try {
            const response = await fetch(`${API_BASE}/events/${id}`, {
              method: "DELETE",
            });
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            setEvents((prev) => prev.filter((e) => e.id !== id));
          } catch (err) {
            console.error(
              "Events API delete call failed, using mock behavior:",
              err
            );
            setError(
              `Failed to delete event (API error): ${err.message}. Using mock behavior.`
            );
            setEvents((prev) => prev.filter((e) => e.id !== id)); // Mock delete
          }
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
        case "orders": // Add case for orders
          try {
            const response = await fetch(`${API_BASE}/orders/${id}`, {
              method: "DELETE",
            });
            if (!response.ok) {
              // For DELETE, a 204 No Content is also a success
              if (response.status !== 204) {
                const errorBody = await response.text();
                throw new Error(
                  `HTTP error! status: ${response.status}, body: ${errorBody}`
                );
              }
            }
            setOrders((prev) => prev.filter((o) => o.id !== id));
          } catch (err) {
            console.error("Orders API delete call failed:", err);
            setError(`Failed to delete order (API error): ${err.message}.`);
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

  const handleAddNew = () => {
    // Prevent adding new orders directly from admin dashboard
    if (activeTab === "orders") {
      setError(
        "New orders are created through the customer store, not the admin panel."
      );
      return;
    }
    setEditingItem(null); // Ensure we're not editing when adding new
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingItem(null);
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

      // Transform frontend data to match backend structure for sections
      const apiData = {
        ...sectionData, // Includes title, description, details
        project_id: selectedProjectId, // Ensure project_id is correctly set
        main_image_url: sectionData.imageUrl || null, // Map imageUrl to main_image_url
      };
      delete apiData.imageUrl; // Remove frontend-specific key
      delete apiData.id; // Remove id if it's a new section, backend will assign
      if (editingSection) {
        delete apiData.project_id; // project_id is not usually updatable or part of update payload for existing section
      }

      if (editingSection) {
        url = `${API_BASE}/projects/sections/${editingSection.id}`;
      } else {
        url = `${API_BASE}/projects/${selectedProjectId}/sections`;
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
          const errorBody = await response.text();
          console.error("Save section error response:", errorBody);
          throw new Error(
            `HTTP error! status: ${response.status}. ${errorBody}`
          );
        }

        const savedSection = await response.json();
        const transformedSection = {
          ...savedSection,
          projectId: savedSection.project_id, // Ensure this comes from backend
          imageUrl: savedSection.main_image_url || null, // Map back for frontend state
          // createdAt and updatedAt should come from backend
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
      const url = `${API_BASE}/projects/sections/${sectionId}`; // Corrected URL
      try {
        const response = await fetch(url, {
          // Use corrected URL
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (err) {
        console.error(
          "API call failed for delete section, using mock behavior:",
          err
        );
        // If API fails, we might still want to update UI optimistically or show error
        // For now, if API fails, the UI won't change unless we force it like below
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
      case "orders": // Add case for orders
        return orders;
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader
        error={error}
        onAddNew={handleAddNew}
        activeTab={activeTab} // Pass activeTab to DashboardHeader
      />

      {/* Navigation Tabs */}
      <DashboardNav activeTab={activeTab} onTabChange={setActiveTab} />

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
            onCancel={handleCancelForm}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
