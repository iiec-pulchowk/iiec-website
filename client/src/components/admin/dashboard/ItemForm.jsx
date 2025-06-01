import React, { useState, useEffect } from "react";
import { Save, X, Upload, Link as LinkIcon } from "lucide-react"; // Renamed Link to LinkIcon to avoid conflict

const ItemForm = ({ type, item, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState(item || getDefaultFormData(type));
  const [imageUploadType, setImageUploadType] = useState("url"); // 'url' or 'file'
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (item) {
      let currentFormData = { ...item };

      setFormData(currentFormData);

      // Set image preview based on the item type and its image field
      if (type === "projects" && item.mainImageUrl) {
        setImagePreview(item.mainImageUrl);
      } else if ((type === "events" || type === "products") && item.imageUrl) {
        setImagePreview(item.imageUrl);
      } else {
        setImagePreview(null);
      }
    } else {
      // Reset form for new item
      setFormData(getDefaultFormData(type));
      setImagePreview(null); // Clear preview for new item
    }
  }, [item, type]);

  function getDefaultFormData(type) {
    switch (type) {
      case "projects":
        return {
          name: "",
          description: "",
          overview: "",
          mainImageUrl: "", // Ensure this matches the field name used (mainImageUrl vs imageUrl)
          status: "active",
        };
      case "events":
        return {
          title: "",
          description: "",
          date: "", // Should be YYYY-MM-DD
          time: "",
          location: "",
          imageUrl: "",
          url: "",
          // status: "upcoming", // Removed status from default form data
        };
      case "products":
        return {
          name: "",
          description: "",
          price: 0,
          inStock: true,
          imageUrl: "",
        };
      case "orders": // Default fields for orders
        return {
          full_name: "",
          email: "",
          contact: "",
          product_title: "", // ADDED
          quantity: 1,
          total_amount: 0,
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

  const commonFields = [
    // ...
  ];

  const typeSpecificFields = {
    projects: [
      { name: "name", label: "Project Name", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "overview", label: "Overview", type: "textarea" },
      { name: "mainImageUrl", label: "Main Project Image", type: "text" },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["active", "inactive", "draft"],
      },
    ],
    events: [
      { name: "title", label: "Event Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "time", label: "Time", type: "time", required: true },
      { name: "location", label: "Location", type: "text", required: true },
      { name: "imageUrl", label: "Event Image", type: "text" },
      { name: "url", label: "Registration/Event URL", type: "text" },
    ],
    products: [
      { name: "name", label: "Product Name", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      {
        name: "price",
        label: "Price",
        type: "number",
        step: "0.01",
        required: true,
      },
      { name: "imageUrl", label: "Image URL", type: "text" },
      { name: "inStock", label: "In Stock", type: "checkbox" },
    ],
    // orders: [
    //   { name: "full_name", label: "Full Name", type: "text", required: true },
    //   { name: "email", label: "Email", type: "email", required: true },
    //   { name: "contact", label: "Contact Number", type: "tel", required: true },
    //   {
    //     name: "product_title",
    //     label: "Product Title",
    //     type: "text",
    //     required: true,
    //   }, 
    //   {
    //     name: "quantity",
    //     label: "Quantity",
    //     type: "number",
    //     required: true,
    //     min: 1,
    //   },
    //   {
    //     name: "total_amount",
    //     label: "Total Amount",
    //     type: "number",
    //     step: "0.01",
    //     required: true,
    //     min: 0,
    //   },

    // ],
  };

  const fields = typeSpecificFields[type] || [];

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">
          {item ? `Edit ${type.slice(0, -1)}` : `Add New ${type.slice(0, -1)}`}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Common fields can be abstracted further if needed */}

        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={formData[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required={field.required}
              />
            ) : field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required={field.required}
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            ) : field.type === "checkbox" ? (
              <input
                type="checkbox"
                name={field.name}
                id={field.name}
                checked={formData[field.name] || false}
                onChange={handleChange}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            ) : field.type === "number" ? (
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                required={field.required}
                min={field.min}
                step={field.step}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                required={field.required}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            )}
          </div>
        ))}

        {type === "projects" && (
          <>
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
                        onError={() => setImagePreview("/placeholder.svg")} // Fallback to placeholder on error
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {" "}
              {/* Changed from md:grid-cols-3 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date" // HTML5 date input expects YYYY-MM-DD
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
              {/* Status Dropdown Removed */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status || "upcoming"} 
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                </select>
              </div> */}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registration/Event URL
              </label>
              <input
                type="url"
                value={formData.url || ""}
                onChange={(e) => handleChange("url", e.target.value)}
                placeholder="https://example.com/register"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Event Image Upload - Similar to Project Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Image
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

        {/* {type === "orders" && ( // Order fields
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => handleChange("full_name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number
              </label>
              <input
                type="tel"
                value={formData.contact}
                onChange={(e) => handleChange("contact", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleChange("quantity", e.target.value)}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Amount ($)
                </label>
                <input
                  type="number"
                  value={formData.total_amount}
                  onChange={(e) => handleChange("total_amount", e.target.value)}
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </>
        )} */}

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
