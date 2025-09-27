export default function Services({ services }) {
  const srv = Array.isArray(services) ? services : services ? [services] : [];

  if (srv.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 mt-8 mb-12 text-center">
      <h2 className="text-2xl font-bold mb-2">Pet Services</h2>
      <p className="text-gray-600 mb-8">
        Treats Rewards members earn points on every service
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {srv.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm transition transform hover:shadow-lg hover:-translate-y-1"
          >
            {s.image ? (
              <div className="overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ) : (
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                No Image
              </div>
            )}

            {/* Title Bar */}
            <div className="bg-[#0045FF] text-white font-bold py-2 text-lg">
              {s.title}
            </div>

            {/* Description */}
            <div className="p-3">
              <p className="text-sm text-gray-700">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
