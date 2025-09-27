import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

export default function OrderCompletion() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await api.get(`/orders/orders/${id}/`);
        setOrder(res.data);
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [id]);

  if (loading) return <p className="p-6">Loading order...</p>;
  if (!order) return <p className="p-6">Order not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        🎉 Order Placed Successfully!
      </h1>
      <p className="mb-6">Thank you for your purchase, {order.first_name}!</p>

      <div className="bg-gray-100 p-6 rounded-lg shadow text-left">
        <p className="font-bold">Order #{order.id}</p>
        <p>Status: {order.status}</p>
        <p>Total: ₹{order.total_price}</p>
        <p>Email: {order.email}</p>
        <p>Address: {order.address}, {order.city}, {order.country}</p>

        <h2 className="mt-4 font-semibold">Items:</h2>
        <ul className="list-disc ml-6">
          {order.items.map((item) => (
            <li key={item.id}>
              {item.quantity} × {item.product_name} — ₹{item.subtotal}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
