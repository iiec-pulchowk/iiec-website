"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/data/Products"; // Updated import to use the hook

import Modal from "@/components/Modal/PurchaseModal";
import ProductCard from "@/components/store/ProductCard";
import Link from "next/link";
import emailjs from "@emailjs/browser";

const API_BASE = "http://localhost:8080"; // Define API_BASE for backend calls

export default function Store() {
  // Use the custom hook for products data
  const { products, loading, error, refreshProducts } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle submission state
  const [submitError, setSubmitError] = useState(null); // To handle submission errors
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [productData, setProductData] = useState({
    name: "",
    image: "",
    price: "",
  });

  const openModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setIsModalOpen(true);
    setOrderSuccess(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    // Make handleSubmit async
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setOrderSuccess(false);

    // Prepare order data for the backend
    const orderPayload = {
      full_name: formData.name,
      email: formData.email,
      contact: formData.phone,
      product_title: selectedProduct.name, // Assuming selectedProduct holds the product being ordered
      quantity: quantity,
      total_amount: parseFloat((selectedProduct.price * quantity).toFixed(2)),
      // user_id can be added if you have user authentication and want to link orders
    };

    try {
      // 1. Send order to backend
      const response = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || `HTTP error! status: ${response.status}`
        );
      }

      // Backend call successful, now proceed with EmailJS
      // EmailJS template parameters
      const templateParams = {
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        product_name: selectedProduct.name, // Use selectedProduct
        product_image: selectedProduct.imageUrl || selectedProduct.image, // Use selectedProduct and handle potential naming difference
        quantity: quantity,
        unit_price: selectedProduct.price, // Use selectedProduct
        total_price: (selectedProduct.price * quantity).toFixed(2), // Use selectedProduct
        order_date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        current_timestamp: new Date().toLocaleString(),
      };

      // 2. Send email via EmailJS
      await emailjs.send(
        "service_3eiujct",
        "template_dtv6sqp",
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      // Both backend and EmailJS successful
      setOrderSuccess(true);
      console.log(
        "New order submitted to backend and email sent: ",
        orderPayload
      );
      setFormData({ name: "", email: "", phone: "" });
      setProductData({
        name: "",
        image: "",
        price: "",
      });
    } catch (error) {
      console.error("Order submission failed:", error);
      setSubmitError(
        error.message || "Failed to submit order. Please try again."
      );
      // Handle error appropriately - maybe show a message to the user
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Startup Store
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover and support innovative products created by our
                  startup community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Loading State */}
        <section className="container mx-auto p-4 my-8">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Featured Products
          </h2>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <span className="ml-4 text-lg text-gray-600">
              Loading products...
            </span>
          </div>
        </section>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Startup Store
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover and support innovative products created by our
                  startup community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Error State */}
        <section className="container mx-auto p-4 my-8">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Featured Products
          </h2>
          <div className="flex flex-col justify-center items-center py-20">
            <div className="text-red-500 text-xl mb-4">
              ⚠️ Failed to load products
            </div>
            <p className="text-gray-600 mb-4">Error: {error}</p>
            <Button onClick={refreshProducts} variant="outline">
              Try Again
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Startup Store
              </h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover and support innovative products created by our startup
                community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto p-4 my-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 flex-1">
            Featured Products
          </h2>
          <Button onClick={refreshProducts} variant="outline" size="sm">
            Refresh
          </Button>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onBuyNow={openModal}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="text-gray-400 text-xl mb-4">📦</div>
              <p className="text-gray-600">
                No products available at the moment
              </p>
              <Button
                onClick={refreshProducts}
                variant="outline"
                className="mt-4"
              >
                Refresh
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* Modal */}
      {isModalOpen && selectedProduct && (
        <Modal
          product={selectedProduct}
          onClose={closeModal}
          quantity={quantity}
          setQuantity={setQuantity}
          formData={formData}
          handleInputChange={handleInputChange}
          setProductData={setProductData} // This might be removable if selectedProduct is primary source
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          orderSuccess={orderSuccess}
          submitError={submitError} // Pass submission error to modal
        />
      )}

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Have a Product to Showcase?
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                If you're part of our incubation program and want to feature
                your product in our store, get in touch with us.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Submit Your Product</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="/programs">Join Our Program</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
