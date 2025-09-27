import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function DogsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("products/category/cat/");
        setProducts(res.data);
      } catch (err) {
        console.error("Error loading dog products", err);
      }
    };
    load();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 mt-8">
      <h2 className="text-2xl font-bold mb-4">Dog Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="border rounded-md p-4">
            <Link to={`/product/${p.slug}`}>
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-40 object-contain mb-3"
              />
              <h4 className="font-semibold">{p.name}</h4>
            </Link>
            <div className="text-sm text-gray-600">₹{p.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
