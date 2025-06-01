import { useEffect } from "react";

// Modal Component
export default function Modal({
  product,
  onClose,
  quantity,
  setQuantity,
  formData,
  handleInputChange,
  setProductData,
  handleSubmit,
  orderSuccess,
}) {
  const totalPrice = (product.price * quantity).toFixed(2);

  useEffect(() => {
    setProductData({
      name: product.name,
      image: product.image,
      price: product.price,
    });
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-800">
              Complete Your Purchase
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
        </div>

        <div className="p-4">
          {!orderSuccess ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  {/* Image wrapper with zoom effect */}
                  <div className="relative overflow-hidden mr-4 rounded group">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover transition-transform duration-300"
                    />
                    {/* Zoomed image that appears on hover */}
                    <div className="absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible -top-4 -left-4 z-10 transition-all duration-300 transform origin-top-left">
                      <div className="bg-white p-1 rounded shadow-lg">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-40 h-40 object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">{product.name}</h4>
                    <p className="text-gray-600">रु. {product.price} each</p>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Quantity:</label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="bg-gray-200 px-3 py-1 rounded-l"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="border text-center w-16 py-1"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="bg-gray-200 px-3 py-1 rounded-r"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Added Name field */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Full Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Email Address:
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Contact Number:
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                    placeholder="Your phone number"
                  />
                </div>

                <div className="mt-6 font-bold text-xl text-gray-600">
                  Total: रु. {totalPrice}
                </div>
              </div>

              <div className="flex justify-end border-t pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Confirm Order
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="text-green-600 text-5xl mb-4">✓</div>
              <h3 className="text-xl font-bold mb-2">
                Order Placed Successfully!
              </h3>
              <p className="mb-4">
                Payment on delivery. Our marketing team will contact you soon.
              </p>
              <p className="mb-4">
                <strong>Order Summary:</strong>
                <br />
                {product.name} x {quantity}
                <br />
                Total: रु. {totalPrice}
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
