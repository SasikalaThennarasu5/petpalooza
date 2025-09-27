import { useEffect, useState } from "react";

export default function HeroBanner({ hero_banner }) {
  const banners = Array.isArray(hero_banner)
    ? hero_banner
    : hero_banner
    ? [hero_banner]
    : [];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (banners.length > 1) {
      const id = setInterval(() => {
        setIndex((prev) => (prev + 1) % banners.length);
      }, 8000); // 4s interval
      return () => clearInterval(id);
    }
  }, [banners.length]);

  if (banners.length === 0) return null;

  return (
    <section className="w-full overflow-hidden relative">
      <div
        className="flex transition-transform duration-[5000ms] ease-in-out"
        style={{
          transform: `translateX(-${index * 100}%)`,
          width: `${banners.length * 100}%`,
        }}
      >
        {banners.map((banner, i) => (
          <div
            key={i}
            className="relative w-full h-[400px] md:h-[500px] flex-shrink-0"
          >
            {/* Background image with contain */}
            <div
              className="w-full h-full bg-center  bg-contain "
              style={{ backgroundImage: `url(${banner.image})` }}
            />

            {/* Overlay Content */}
            {banner.title && (
              <div className="absolute bottom-6 left-6 bg-black/50 text-white p-4 rounded-md max-w-[70%]">
                <h2 className="text-2xl font-bold">{banner.title}</h2>
                {banner.subtitle && (
                  <p className="text-sm mt-1">{banner.subtitle}</p>
                )}
                {banner.button_text && (
                  <a
                    href={banner.button_link || "/"}
                    className="mt-3 inline-block bg-[#0045FF] text-white px-4 py-2 rounded"
                  >
                    {banner.button_text}
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
