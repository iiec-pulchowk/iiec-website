"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

// Import modular components
import DashboardHeader from "../../../components/admin/dashboard/DashboardHeader";
import DashboardNav from "../../../components/admin/dashboard/DashboardNav";
import ItemList from "../../../components/admin/dashboard/ItemList";
import ItemForm from "../../../components/admin/dashboard/ItemForm";
import ProjectSectionForm from "../../../components/admin/dashboard/ProjectSectionForm";

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-gray-600">Verifying authentication...</p>
    </div>
  </div>
);

// Login form component
const LoginForm = ({ onLogin, loading, error }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please sign in to access the admin dashboard
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [user, setUser] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Existing dashboard states
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

  const router = useRouter();

  // Update API URL to match your FastAPI backend
  const API_BASE = "http://localhost:8080";

  // Authentication functions
  const getStoredToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("admin_token");
    }
    return null;
  };

  const setStoredToken = (token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_token", token);
    }
  };

  const removeStoredToken = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_token");
    }
  };

  const verifyToken = async (token) => {
    try {
      const response = await fetch(`${API_BASE}/users/verify`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Token verification failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Token verification error:", error);
      throw error;
    }
  };

  const handleLogin = async (credentials) => {
    setLoginLoading(true);
    setAuthError(null);

    try {
      const response = await fetch(`${API_BASE}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed");
      }

      const data = await response.json();

      // Store token
      setStoredToken(data.access_token);

      // Set user data
      setUser(data.user);
      setIsAuthenticated(true);
      setAuthError(null);
    } catch (error) {
      console.error("Login error:", error);
      setAuthError(error.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    removeStoredToken();
    setIsAuthenticated(false);
    setUser(null);
    router.push("/");
  };

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const token = getStoredToken();

      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        const userData = await verifyToken(token);
        setUser(userData.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth check failed:", error);
        removeStoredToken();
        setIsAuthenticated(false);
        setAuthError("Session expired. Please login again.");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

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
    if (isAuthenticated) {
      // Reset form states when tab changes
      setEditingItem(null);
      setShowForm(false);
      setEditingSection(null);
      setShowSectionForm(false);
      setSelectedProjectId(null);
      fetchData();
    }
  }, [activeTab, isAuthenticated]);

  const fetchData = useCallback(async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError(null);
    const token = getStoredToken();

    try {
      let response;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      switch (activeTab) {
        case "projects":
          try {
            response = await fetch(`${API_BASE}/projects`, { headers });
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
            response = await fetch(`${API_BASE}/events`, { headers });
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
            setEvents([]);
          }
          break;
        case "products":
          try {
            response = await fetch(`${API_BASE}/products`, { headers });
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

      // Check if it's an auth error
      if (err.message.includes("401") || err.message.includes("unauthorized")) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  }, [activeTab, isAuthenticated]);

  const makeAuthenticatedRequest = async (url, options = {}) => {
    const token = getStoredToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    };

    try {
      const response = await fetch(url, { ...options, headers });

      if (response.status === 401) {
        handleLogout();
        throw new Error("Authentication failed");
      }

      return response;
    } catch (error) {
      if (error.message === "Authentication failed") {
        throw error;
      }
      throw new Error(`Request failed: ${error.message}`);
    }
  };

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
            ...item,
            main_image_url: item.mainImageUrl || null,
          };
          delete projectPayload.mainImageUrl; // Remove frontend-specific key
          delete projectPayload.sections; // Sections are managed separately
          delete projectPayload.createdAt;
          delete projectPayload.updatedAt;

          try {
            response = await makeAuthenticatedRequest(url, {
              method: method,
              body: JSON.stringify(projectPayload),
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
            if (err.message === "Authentication failed") {
              return;
            }
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
            response = await makeAuthenticatedRequest(url, {
              method: method,
              body: JSON.stringify(itemData),
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
            if (err.message === "Authentication failed") {
              return;
            }
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
            response = await makeAuthenticatedRequest(url, {
              method: method,
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
            if (err.message === "Authentication failed") {
              return;
            }
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
      if (error.message === "Authentication failed") {
        return;
      }
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
            const response = await makeAuthenticatedRequest(
              `${API_BASE}/projects/${id}`,
              {
                method: "DELETE",
              }
            );

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            setProjects((prev) => prev.filter((p) => p.id !== id));
          } catch (err) {
            if (err.message === "Authentication failed") {
              return;
            }
            console.error("API call failed, using mock behavior:", err);
            setProjects((prev) => prev.filter((p) => p.id !== id));
          }
          break;
        case "events":
          try {
            const response = await makeAuthenticatedRequest(
              `${API_BASE}/events/${id}`,
              {
                method: "DELETE",
              }
            );
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            setEvents((prev) => prev.filter((e) => e.id !== id));
          } catch (err) {
            if (err.message === "Authentication failed") {
              return;
            }
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
            const response = await makeAuthenticatedRequest(
              `${API_BASE}/products/${id}`,
              {
                method: "DELETE",
              }
            );

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            setProducts((prev) => prev.filter((p) => p.id !== id));
          } catch (err) {
            if (err.message === "Authentication failed") {
              return;
            }
            console.error("API call failed, using mock behavior:", err);
            setProducts((prev) => prev.filter((p) => p.id !== id));
          }
          break;
      }
    } catch (error) {
      if (error.message === "Authentication failed") {
        return;
      }
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
        const response = await makeAuthenticatedRequest(url, {
          method: method,
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
        if (err.message === "Authentication failed") {
          return;
        }
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
      if (error.message === "Authentication failed") {
        return;
      }
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
        const response = await makeAuthenticatedRequest(url, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (err) {
        if (err.message === "Authentication failed") {
          return;
        }
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
      if (error.message === "Authentication failed") {
        return;
      }
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

  // Show loading spinner while checking authentication
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <LoginForm
        onLogin={handleLogin}
        loading={loginLoading}
        error={authError}
      />
    );
  }

  // Show dashboard if authenticated
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with logout functionality */}
      <DashboardHeader
        error={error}
        onAddNew={handleAddNew}
        user={user}
        onLogout={handleLogout}
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
