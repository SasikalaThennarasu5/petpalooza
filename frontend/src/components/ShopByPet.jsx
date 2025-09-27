import Carousel from "./Carousel";

export default function ShopByPet({ pets }) {
  if (!pets || pets.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 mt-8">
      <h3 className="text-center text-lg font-medium mb-4">Shop by Pet</h3>
      <Carousel
        items={pets}
        visibleCount={5}
        renderItem={(p) => (
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-green-300 flex items-center justify-center">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="mt-2 text-sm font-semibold">{p.name}</span>
          </div>
        )}
      />
    </section>
  );
}
