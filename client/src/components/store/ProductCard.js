"use client";
// Product Card Component with Image Zoom
import { useState, useRef } from "react";

// Product Card Component with Image Zoom
export default function ProductCard({ product, onBuyNow }) {
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  const imageContainerRef = useRef(null);
  const zoomFactor = 4; // 10x zoom

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    
    // Get the container's position relative to the viewport
    const rect = imageContainerRef.current.getBoundingClientRect();
    
    // Calculate cursor position within the image (0 to 1)
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Ensure values are between 0 and 1
    const boundedX = Math.max(0, Math.min(1, x));
    const boundedY = Math.max(0, Math.min(1, y));
    
    setCursorPosition({ x: boundedX, y: boundedY });
    
    // Position the zoom lens to follow the cursor
    setZoomPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <div 
        className="h-48 bg-gray-200 relative"
        ref={imageContainerRef}
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={product.image || "/api/placeholder/400/320"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Zoom lens indicator */}
        {showZoom && (
          <div 
            className="absolute w-6 h-6 border-2 border-white rounded-full pointer-events-none"
            style={{
              left: `${zoomPosition.x - 12}px`,
              top: `${zoomPosition.y - 12}px`,
              transform: "translate(0, 0)",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.3)"
            }}
          />
        )}
        
        {/* Zoomed image overlay */}
        {showZoom && (
          <div className="absolute top-0 right-0 w-32 h-32 border-2 border-gray-400 rounded-md overflow-hidden bg-white shadow-lg z-10">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `url(${product.image || "/api/placeholder/400/320"})`,
                backgroundPosition: `${cursorPosition.x * 100}% ${cursorPosition.y * 100}%`,
                backgroundSize: `${zoomFactor * 100}%`,
                backgroundRepeat: "no-repeat"
              }}
            />
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          {product.name}
        </h3>
        <p className="text-gray-600 mb-4 h-20 overflow-hidden">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-600">
            रु. {product.price}
          </span>
          <span
            className={`px-2 py-1 rounded text-xs font-bold ${
              product.inStock
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
        <button
          onClick={() => onBuyNow(product)}
          disabled={!product.inStock}
          className={`mt-4 w-full py-2 px-4 rounded font-bold text-white ${
            product.inStock
              ? "bg-gray-600 hover:bg-gray-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
