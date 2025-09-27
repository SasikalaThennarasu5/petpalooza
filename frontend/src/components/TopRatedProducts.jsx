import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export default function TopRatedProducts({ products }) {
  const items = Array.isArray(products) ? products : [];

  if (items.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 mt-8">
      <h3 className="text-2xl font-semibold mb-4 text-center">
        Top Rated Calming Products
      </h3>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={4}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {items.map((p) => (
          <SwiperSlide key={p.id}>
            <div className="border rounded-md p-4 hover:shadow-lg transition">
              <Link to={`/product/${p.slug}`}>
                <img
                  src={p.image || "https://via.placeholder.com/200"}
                  alt={p.name}
                  className="w-full h-40 object-contain mb-3"
                />
                <h4 className="font-semibold">{p.name}</h4>
              </Link>
              <div className="flex items-center justify-between mt-2">
                <div>
                  <div className="text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">₹{p.price}</div>
                </div>
                <button className="bg-[#0045FF] text-white px-3 py-1 rounded">
                  Add
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
