import React, { useState, useEffect } from "react";
import { Save, X, Upload, Link as LinkIcon } from "lucide-react";

const ProjectSectionForm = ({
  section,
  projectId, // Keep projectId if needed for context, though not directly used in form fields
  onSave,
  onCancel,
  loading,
}) => {
  const [formData, setFormData] = useState(
    section || {
      title: "",
      description: "",
      details: "",
      imageUrl: "", // For section image
    }
  );
  const [imageUploadType, setImageUploadType] = useState("url"); // 'url' or 'file'
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
      // Reset form for new section
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
    onSave(formData); // Pass formData which includes projectId if it was part of initial section data or added
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
    // Similar to ItemForm, using Data URL for preview
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
                    onError={() => setImagePreview("/placeholder.svg")} // Fallback to placeholder on error
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

export default ProjectSectionForm;
