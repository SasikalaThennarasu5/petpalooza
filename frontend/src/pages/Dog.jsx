// src/pages/Dog.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function DogPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products/category/dog/") // your backend URL
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded-lg shadow">
          <img
            src={`http://127.0.0.1:8000${product.image}`}
            alt={product.name}
            className="w-full h-48 object-contain"
          />
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-600">₹{product.price}</p>
          <button className="bg-blue-600 text-white px-4 py-2 mt-2 rounded">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
