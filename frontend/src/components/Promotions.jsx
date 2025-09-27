import { Link } from "react-router-dom";

export default function Promotions({ promotions }) {
  const promos = Array.isArray(promotions) ? promotions : promotions ? [promotions] : [];

  if (promos.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 mt-8 space-y-6">
      {promos.map((promo, index) => (
        <div
          key={promo.id}
          className={`flex flex-col md:flex-row items-center justify-between rounded-2xl overflow-hidden shadow-md w-full ${
            index % 2 === 0 ? "bg-[#0045FF] text-white" : "bg-[#A8F5B5] text-black"
          }`}
        >
          {/* Left Side Text */}
          <div className="p-6 md:w-1/2">
            <h4 className="text-xl md:text-2xl font-bold mb-2">{promo.title}</h4>
            {promo.subtitle && <p className="text-sm md:text-base mb-4">{promo.subtitle}</p>}
            {promo.button_text && (
              <Link
                to={promo.button_link || "/"}
                className={`inline-block px-5 py-2 rounded-lg font-semibold shadow ${
                  index % 2 === 0
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-[#0045FF] text-white hover:bg-[#0030a8]"
                }`}
              >
                {promo.button_text}
              </Link>
            )}
          </div>

          {/* Right Side Image */}
          {promo.image && (
            <div className="md:w-1/2 flex items-center justify-center">
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-full object-contain md:object-cover"
              />
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
