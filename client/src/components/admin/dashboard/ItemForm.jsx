import React, { useState, useEffect } from "react";
import { Save, X, Upload, Link as LinkIcon } from "lucide-react"; // Renamed Link to LinkIcon to avoid conflict

const ItemForm = ({ type, item, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState(item || getDefaultFormData(type));
  const [imageUploadType, setImageUploadType] = useState("url"); // 'url' or 'file'
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    // Set image preview if item has an image URL
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
          image: null, // Or use imageUrl: "" if storing URL
          status: "upcoming",
        };
      case "notices":
        return {
          title: "",
          content: "",
          priority: "medium",
          publishDate: new Date().toISOString().split("T")[0], // Default to today
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

    // For simplicity, using Data URL for preview.
    // In a real app, you'd upload to a server and get back a URL.
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        const imageField = type === "projects" ? "mainImageUrl" : "imageUrl";
        handleChange(imageField, dataUrl); // Store Data URL or actual URL from server
        setImagePreview(dataUrl);
      };
      reader.readAsDataURL(file);
      // Example: If you were to upload
      // const uploadFormData = new FormData();
      // uploadFormData.append('image', file);
      // const response = await fetch('/api/upload', { method: 'POST', body: uploadFormData });
      // const result = await response.json();
      // handleChange(imageField, result.imageUrl);
      // setImagePreview(result.imageUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error (e.g., show a notification)
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
        {/* Common fields can be abstracted further if needed */}

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

            <div className="max-w-md">
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
                    <LinkIcon size={16} />
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
                        src={imagePreview || "/placeholder.svg"} // Fallback for broken links
                        alt="Preview"
                        className="h-32 w-32 object-cover rounded-lg border"
                        onError={() => setImagePreview(null)} // Clear preview if image fails to load
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          handleChange("mainImageUrl", ""); // Clear the image URL
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
            {/* Event Image Upload - Similar to Project Image */}
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
                    <LinkIcon size={16} />
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

export default ItemForm;
