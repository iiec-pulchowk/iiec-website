// products.js - Replace your hardcoded products with API integration

// API configuration
const apiUrl  = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// API service for products
export const productsAPI = {
  // Get all products
  getProducts: async () => {
    try {
      const response = await fetch(`${apiUrl }/products`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  // Get single product by ID
  getProduct: async (id) => {
    try {
      const response = await fetch(`${apiUrl }/products/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },
};

// React Hook for managing products data
import { useState, useEffect } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productsAPI.getProducts();

      // Transform the data to match your existing structure
      const transformedProducts = data.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image ? product.image : null,
        inStock: product.in_stock,
        stock: product.stock,
        category: product.category,
        status: product.status,
        created_at: product.created_at,
        updated_at: product.updated_at,
      }));
      console.log("pro", transformedProducts);

      setProducts(transformedProducts);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  const refreshProducts = () => {
    fetchProducts();
  };

  return {
    products,
    loading,
    error,
    refreshProducts,
  };
};

// For backward compatibility, export products as a function that returns the API call
export const getProducts = async () => {
  try {
    const data = await productsAPI.getProducts();
    return data.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image ? `${apiUrl }/uploads/${product.image}` : null,
      inStock: product.in_stock,
      stock: product.stock,
      category: product.category,
      status: product.status,
    }));
  } catch (error) {
    console.error("Error getting products:", error);
    return [];
  }
};

// Export the API service as default
export default productsAPI;
