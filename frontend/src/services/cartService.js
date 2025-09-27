import api from "../api/axios";

const getCart = async () => {
  const res = await api.get("orders/cart/");
  return res.data;
};

const addToCart = async (productId, quantity = 1) => {
  const res = await api.post("orders/cart/add/", { product_id: productId, quantity });
  return res.data;
};

const removeFromCart = async (itemId) => {
  const res = await api.post("orders/cart/remove/", { item_id: itemId });
  return res.data;
};

const checkout = async () => {
  const res = await api.post("orders/checkout/");
  return res.data;
};

const getOrders = async () => {
  const res = await api.get("orders/orders/");
  return res.data;
};

export default { getCart, addToCart, removeFromCart, checkout, getOrders };
