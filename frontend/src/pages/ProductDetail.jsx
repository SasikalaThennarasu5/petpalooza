import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import cartService from "../services/cartService";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`products/${id}/`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await cartService.addToCart(product.id, 1);
      alert("Added to cart!");
    } catch (err) {
      alert("Error adding to cart");
    }
  };

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-96 object-cover rounded"
      />
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-xl font-semibold text-persianBlue mb-6">₹{product.price}</p>
        <button
          onClick={handleAddToCart}
          className="bg-paleGreen text-black px-6 py-2 rounded hover:bg-white hover:text-persianBlue transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
