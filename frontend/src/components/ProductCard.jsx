import cartService from "../services/cartService";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const handleAddToCart = async () => {
    try {
      await cartService.addToCart(product.id, 1);
      alert("Added to cart!");
    } catch (err) {
      alert("Error adding to cart");
    }
  };

  return (
    <div className="border rounded-lg shadow hover:shadow-lg p-4 bg-white flex flex-col">
      <Link to={`/product/${product.id}`}>
  <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded" />
</Link>
      <Link to={`/product/${product.id}`}>
  <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
</Link>
      <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
      <div className="mt-auto flex justify-between items-center pt-2">
        <span className="font-bold text-persianBlue">₹{product.price}</span>
        <button
          onClick={handleAddToCart}
          className="bg-paleGreen text-black px-3 py-1 rounded hover:bg-white hover:text-persianBlue transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
