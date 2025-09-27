import { useEffect, useState } from "react";
import cartService from "../services/cartService";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await cartService.getOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p>You have no past orders.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 shadow">
              <h2 className="font-semibold mb-2">
                Order #{order.id} – {new Date(order.created_at).toLocaleString()}
              </h2>
              <p className="mb-2">
                Status: <span className="font-medium">{order.status}</span>
              </p>
              <ul className="space-y-1">
                {order.items.map((item) => (
                  <li key={item.id} className="text-sm">
                    {item.product.name} × {item.quantity} – ₹
                    {item.product.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
