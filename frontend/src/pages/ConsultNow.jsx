import React from "react";

const ConsultNow = () => {
  return (
    <section className="font-montserrat bg-white min-h-screen px-6 md:px-20 py-10">
      {/* Service Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left side with steps and image */}
        <div>
          <div className="flex justify-between bg-[#98FB98] p-4 rounded-t-xl">
            {[
              { text: "Pay & book the consultant", icon: "💳" },
              { text: "Choose video or Teleconsultation", icon: "🎥" },
              { text: "Receive prescription after the call", icon: "📄" },
            ].map((step, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-sm font-medium text-gray-700 w-1/3 text-center"
              >
                <span className="text-xl">{step.icon}</span>
                <p className="mt-2">{step.text}</p>
              </div>
            ))}
          </div>

          <img
            src="/images/consultnow1.png"
            alt="Consult Service"
            className="w-full h-64 md:h-80 object-cover rounded-b-xl shadow-lg"
          />
        </div>

        {/* Right side */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-persianBlue mb-2">
            Services
          </h1>
          <p className="text-gray-600 mb-6">Instant Consultation (10 AM to 7 PM)</p>

          <button className="bg-strongBlue text-white px-6 py-3 rounded-lg font-semibold w-full mb-4">
            Book Consultation
          </button>

          <div className="bg-gray-100 p-4 rounded-xl mb-4">
            <p className="font-semibold text-lg">
              ₹299{" "}
              <span className="line-through text-gray-400">₹499</span>{" "}
              <span className="text-green-600">(40% OFF)</span>
            </p>
          </div>

          <ul className="text-sm text-gray-600 space-y-2 mb-4">
            <li>💳 Bank offers and coupons</li>
            <li>⚠️ Currently, cash on delivery is not available</li>
            <li>🚚 Free delivery on orders above ₹599</li>
          </ul>

          <button className="w-full bg-strongBlue text-white py-3 rounded-xl font-semibold hover:bg-persianBlue">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-persianBlue mb-6">
          Customer Reviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Ajith Kumar AK",
              date: "31/01/2025",
              rating: 5,
              review: "Very very good experience doctors consultation.",
            },
            {
              name: "Prem Singh",
              date: "12/04/2024",
              rating: 5,
              review:
                "Talking to the doctor was like talking to a well wisher, very good at diagnosing the issue.",
            },
            {
              name: "Priya",
              date: "31/05/2024",
              rating: 4,
              review: "Good doctor.",
            },
          ].map((r, i) => (
            <div
              key={i}
              className="bg-gray-50 p-5 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{r.name}</h4>
                <span className="text-xs text-gray-400">{r.date}</span>
              </div>
              <p className="text-yellow-500 mb-2">
                {"★".repeat(r.rating) + "☆".repeat(5 - r.rating)}
              </p>
              <p className="text-gray-600 text-sm">{r.review}</p>
              <div className="flex gap-4 mt-3 text-gray-400 text-sm">
                <button>👍</button>
                <button>👎</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConsultNow;
