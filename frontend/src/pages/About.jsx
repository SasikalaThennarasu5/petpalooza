import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function About() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("pages/about/");
        setData(res.data);
      } catch (err) {
        console.error("About page load error", err);
      }
    };
    load();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="font-sans">
      {/* Hero / Mission */}
      {data.mission_image && (
        <section className="relative">
          <img
            src={data.mission_image}
            alt="Mission"
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-center text-white px-4">
            <h2 className="text-2xl font-bold">{data.title}</h2>
            <p className="mt-2 max-w-2xl">{data.mission}</p>
          </div>
        </section>
      )}

      {/* Description */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h3 className="text-center text-xl font-bold mb-4">
          {data.description_title}
        </h3>
        <p className="text-gray-700 leading-relaxed text-center whitespace-pre-line">
          {data.description}
        </p>
      </section>

      {/* 3 Cards */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="border rounded-md overflow-hidden shadow text-center"
          >
            <img
              src={data[`card${i}_image`]}
              alt={data[`card${i}_title`]}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold">{data[`card${i}_title`]}</h4>
              {data[`card${i}_link`] && (
                <Link
                  to={data[`card${i}_link`]}
                  className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Learn more
                </Link>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Bottom Section */}
      {(data.bottom_title || data.bottom_text) && (
        <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-xl font-bold mb-4">{data.bottom_title}</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {data.bottom_text}
            </p>
          </div>
          {data.bottom_image && (
            <img
              src={data.bottom_image}
              alt={data.bottom_title}
              className="w-full h-64 object-cover rounded"
            />
          )}
        </section>
      )}
    </div>
  );
}
