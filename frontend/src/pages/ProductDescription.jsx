import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ProductDescription() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch product & related
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await api.get(`/products/${id}/`);
        setProduct(res.data);
        setSelectedImage(
          res.data.image?.startsWith("http")
            ? res.data.image
            : `http://127.0.0.1:8000${res.data.image}`
        );

        if (res.data.category?.id) {
          const relatedRes = await api.get(
            `/products/category/${res.data.category.id}/`
          );
          setRelated(relatedRes.data.filter((p) => p.id !== parseInt(id)));
        }

        // ✅ Save to recently viewed (localStorage)
        const stored = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
        const updated = [
          res.data,
          ...stored.filter((p) => p.id !== res.data.id),
        ].slice(0, 6); // limit to 6
        localStorage.setItem("recentlyViewed", JSON.stringify(updated));
        setRecentlyViewed(updated);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  async function handleAddToCart() {
    try {
      await api.post("/orders/cart/add/", {
        product_id: product.id,
        quantity,
      });
      navigate("/cart", { replace: true });
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  }

  function handleBuyNow() {
    navigate("/checkout");
  }

  if (loading) return <p className="p-6">Loading product...</p>;
  if (!product) return <p className="p-6">Product not found.</p>;

  return (
    <div className="p-6 space-y-12 font-montserrat">
      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image gallery */}
        <div>
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow"
          />
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {[product.image, ...(product.gallery_images || [])].map(
              (img, idx) => {
                if (!img) return null;
                const url = img.startsWith("http")
                  ? img
                  : `http://127.0.0.1:8000${img}`;
                return (
                  <img
                    key={idx}
                    src={url}
                    onClick={() => setSelectedImage(url)}
                    className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                      selectedImage === url ? "border-blue-600" : "border-gray-200"
                    }`}
                  />
                );
              }
            )}
          </div>
        </div>

        {/* Product details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-1">Code: {product.sku || "N/A"}</p>
          <p className="text-gray-600 mb-1">
            Availability:{" "}
            <span className="text-green-600">In stock</span>
          </p>
          <p className="text-xl font-semibold text-gray-800 mb-4">
            ₹{product.price}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Quantity */}
          <div className="flex items-center mb-6">
            <span className="mr-4 font-medium">Quantity:</span>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 border rounded-l bg-gray-100 hover:bg-gray-200"
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 border rounded-r bg-gray-100 hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Product Description with banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Product Description</h2>
          <p className="text-gray-700 leading-relaxed">
            {product.long_description ||
              "Detailed description coming soon. This section can include benefits, nutrition info, and care instructions."}
          </p>
        </div>
        <img
          src="/banner-placeholder.jpg"
          alt="Marketing Banner"
          className="w-full h-80 object-cover rounded-lg shadow"
        />
      </div>

      {/* Customer Reviews */}
      <div className="border rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <div className="space-y-3 mb-6">
          <p>⭐⭐⭐⭐☆ (4.0 / 5 based on 23 reviews)</p>
        </div>
        <form className="space-y-4">
          <textarea
            placeholder="Write your review..."
            className="w-full border rounded p-3"
          />
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded p-3"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">You might like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition block"
              >
                <img
                  src={
                    item.image?.startsWith("http")
                      ? item.image
                      : `http://127.0.0.1:8000${item.image}`
                  }
                  alt={item.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="mt-2 font-bold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Recently Viewed</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recentlyViewed.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition block"
              >
                <img
                  src={
                    item.image?.startsWith("http")
                      ? item.image
                      : `http://127.0.0.1:8000${item.image}`
                  }
                  alt={item.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="mt-2 font-bold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
