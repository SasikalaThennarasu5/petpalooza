import { useEffect, useState } from "react";
import cartService from "../services/cartService";

export default function Cart() {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const data = await cartService.getCart();
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async (itemId) => {
    await cartService.removeFromCart(itemId);
    fetchCart();
  };

  const handleCheckout = async () => {
    try {
      const res = await cartService.checkout();
      alert(`Order placed! Order ID: ${res.order_id}`);
      fetchCart();
    } catch (err) {
      alert("Checkout failed");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <h2 className="font-semibold">{item.product.name}</h2>
                <p className="text-sm text-gray-600">₹{item.product.price} × {item.quantity}</p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={handleCheckout}
            className="bg-persianBlue text-white px-4 py-2 rounded mt-4 hover:bg-brightBlue transition"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
