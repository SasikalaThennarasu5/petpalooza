import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await api.get("/orders/cart/");
        setCart(res.data);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, []);

  async function removeItem(itemId) {
    try {
      await api.post("/orders/cart/remove/", { item_id: itemId });
      setCart(cart.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  }

  if (loading) return <p className="p-6">Loading cart...</p>;

  const subtotal = cart.reduce((sum, i) => sum + i.subtotal, 0);
  const shipping = 99;
  const total = subtotal + shipping;

  return (
    <div className="p-6 font-montserrat space-y-10">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500">
        <Link to="/" className="hover:underline">Home</Link> / Cart
      </p>

      {/* Free shipping progress */}
      <div>
        <p className="text-blue-600 font-medium mb-2">
          Your order qualifies for free shipping!
        </p>
        <div className="w-full bg-gray-200 h-2 rounded">
          <div className="bg-blue-600 h-2 rounded" style={{ width: "70%" }} />
        </div>
      </div>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Table */}
          <div className="lg:col-span-2">
            <table className="w-full border rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3">Remove</th>
                  <th className="p-3">Product</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-3">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:underline"
                      >
                        ✕
                      </button>
                    </td>
                    <td className="p-3 flex items-center gap-3">
                      <img
                        src={
                          item.product_image?.startsWith("http")
                            ? item.product_image
                            : `http://127.0.0.1:8000${item.product_image}`
                        }
                        alt={item.product_name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <span>{item.product_name}</span>
                    </td>
                    <td className="p-3">₹{item.product_price}</td>
                    <td className="p-3">
                      <div className="flex items-center border rounded w-fit">
                        <button className="px-2">-</button>
                        <span className="px-3">{item.quantity}</span>
                        <button className="px-2">+</button>
                      </div>
                    </td>
                    <td className="p-3 font-medium">₹{item.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Coupon */}
            <div className="flex items-center gap-3 mt-6">
              <input
                type="text"
                placeholder="Coupon code"
                className="border rounded-lg p-3 flex-1"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                Apply coupon
              </button>
            </div>

            {/* Promo boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-green-100 text-green-700 rounded-lg text-center font-medium">
                Free products dog food combo 5 kg, turkey
              </div>
              <div className="p-4 bg-green-100 text-green-700 rounded-lg text-center font-medium">
                Free products dog food 2 kg chicken
              </div>
              <div className="p-4 bg-green-100 text-green-700 rounded-lg text-center font-medium">
                Free products dog treats pack
              </div>
            </div>

            {/* Info boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-center text-sm text-gray-600">
              <div>
                <p className="font-medium">Have a question?</p>
                <p>Our experts are here to call: <Link to="/" className="text-blue-600">call us</Link></p>
              </div>
              <div>
                <p className="font-medium">Secure shopping</p>
                <p>All transactions are protected by SSL</p>
              </div>
              <div>
                <p className="font-medium">Privacy protection</p>
                <p>Your privacy is always our top priority.</p>
              </div>
            </div>
          </div>

          {/* Cart Totals */}
          <div className="border rounded-lg p-6 shadow space-y-6">
            <h2 className="text-xl font-bold">Card Totals</h2>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Flat rate: ₹{shipping}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>

            {/* Payment methods */}
            <div className="flex flex-wrap gap-3 justify-center mt-4">
              <img src="/icons/gpay.png" alt="GPay" className="h-6" />
              <img src="/icons/paypal.png" alt="Paypal" className="h-6" />
              <img src="/icons/visa.png" alt="Visa" className="h-6" />
              <img src="/icons/mastercard.png" alt="Mastercard" className="h-6" />
            </div>

            {/* Info */}
            <div className="text-xs text-gray-600 mt-4 space-y-2">
              <p>
                <span className="font-medium">Delivery information:</span> If you
                don’t think you’ll ever want one, we’ll gladly provide a refund
                if it’s requested within 14 days of purchase.
              </p>
              <p>
                <span className="font-medium">14 Days Money Back Guarantee:</span>{" "}
                We’ll gladly provide a refund if requested within 14 days of
                purchase.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
