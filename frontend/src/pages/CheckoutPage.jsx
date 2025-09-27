import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function CheckoutPage() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    payment_method: "cod",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/orders/checkout/", form);
      console.log("Checkout response:", res.data);
      navigate(`/order-completion/${res.data.order_id}`);
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col p-6 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-6">
        <Link to="/" className="hover:underline">Home</Link> /
        <Link to="/cart" className="hover:underline ml-1">Cart</Link> /
        <span className="ml-1 font-semibold text-gray-800">Checkout</span>
      </nav>

      <div className="flex gap-6">
        {/* Left Section - Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-2/3"
        >
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>

          {/* Contact */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1">
              Email (for order updates)
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="border p-3 w-full rounded mb-2"
              required
            />
            <label className="flex items-center space-x-2 text-sm text-gray-600">
              <input type="checkbox" className="rounded" />
              <span>
                Send me order updates, news and offers on Email and WhatsApp
              </span>
            </label>
          </div>

          {/* Delivery */}
          <h3 className="text-lg font-semibold mb-3">Delivery</h3>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={form.first_name}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={form.last_name}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />
          </div>

          <textarea
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="border p-3 rounded w-full mb-3"
            required
          />

          <div className="grid grid-cols-2 gap-4 mb-3">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={form.country}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />
          </div>

          {/* Save Info */}
          <label className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <input type="checkbox" className="rounded" />
            <span>Save this information for next time</span>
          </label>

          {/* Payment */}
          <h3 className="text-lg font-semibold mb-3">Choose your payment method</h3>

          <label className="flex items-center justify-between border p-3 rounded mb-3 cursor-pointer hover:border-blue-500">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="payment_method"
                value="card"
                checked={form.payment_method === "card"}
                onChange={handleChange}
              />
              <span>Secure transaction (UPI, Cards, Wallets, Net banking)</span>
            </div>
            <div className="flex space-x-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Google_Pay_Logo.svg" alt="GPay" className="h-5" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" className="h-5" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-5" />
            </div>
          </label>

          <label className="flex items-center space-x-2 border p-3 rounded mb-6 cursor-pointer hover:border-blue-500">
            <input
              type="radio"
              name="payment_method"
              value="cod"
              checked={form.payment_method === "cod"}
              onChange={handleChange}
            />
            <span>Cash on Delivery</span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 font-semibold"
          >
            {loading ? "Placing Order..." : "Order Now"}
          </button>
        </form>

        {/* Right Section - Order Summary */}
        <div className="bg-green-100 p-6 rounded shadow-md w-1/3">
          <h3 className="text-lg font-bold mb-4">Order Summary</h3>

          {/* 🔹 This is placeholder since your API/cart context isn’t wired here */}
          <div className="flex items-center mb-4">
            <img
              src="https://via.placeholder.com/80"
              alt="Product"
              className="w-20 h-20 object-cover mr-4 rounded"
            />
            <div>
              <p className="font-semibold">Sample Product</p>
              <p className="text-sm text-gray-500">Qty: 1</p>
              <p className="font-bold">₹1,899</p>
            </div>
          </div>

          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Discount code or gift card"
              className="flex-grow border p-2 rounded-l"
            />
            <button className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700">
              Apply
            </button>
          </div>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹1,899</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>₹99</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹1,998</span>
          </div>
          <p className="text-xs text-gray-600 mt-1">(Includes ₹251.62 CGST, ₹251.62 SGST)</p>
        </div>
      </div>
    </div>
  );
}
