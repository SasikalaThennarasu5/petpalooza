import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function CategoryPage() {
  const { id } = useParams(); // category id
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters & sort
  const [sort, setSort] = useState("");
  const [filters, setFilters] = useState({
    brand: [],
    size: [],
    breed: [],
    life_stage: [],
    flavor: [],
  });

  // toggle filter checkbox
  const toggleFilter = (category, value) => {
    setFilters((prev) => {
      const alreadySelected = prev[category].includes(value);
      return {
        ...prev,
        [category]: alreadySelected
          ? prev[category].filter((item) => item !== value)
          : [...prev[category], value],
      };
    });
  };

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const params = new URLSearchParams();

        if (filters.brand.length) params.append("brand", filters.brand.join(","));
        if (filters.size.length) params.append("size", filters.size.join(","));
        if (filters.breed.length) params.append("breed", filters.breed.join(","));
        if (filters.life_stage.length)
          params.append("life_stage", filters.life_stage.join(","));
        if (filters.flavor.length)
          params.append("flavor", filters.flavor.join(","));
        if (sort) params.append("sort", sort);

        const res = await api.get(
          `/products/category/${id}/?${params.toString()}`
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [id, filters, sort]);

  if (loading) return <p className="p-6">Loading products...</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Sidebar Filters */}
      <SidebarFilters filters={filters} setFilters={setFilters} />

      {/* Main Content */}
      <main className="col-span-3">
        {/* Breadcrumb + Sort */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Home / <span className="font-semibold">Category</span>
          </p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Sort By</option>
            <option value="bestseller">Best Sellers</option>
            <option value="new">New Arrivals</option>
            <option value="price_low_high">Price: Low to High</option>
            <option value="price_high_low">Price: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="bg-white border rounded-lg p-3 hover:shadow-md transition flex flex-col"
              >
                <img
                  src={
                    product.image?.startsWith("http")
                      ? product.image
                      : `http://127.0.0.1:8000${product.image}`
                  }
                  alt={product.name}
                  className="w-full h-40 object-contain mb-3"
                />
                <h3 className="font-semibold text-sm">{product.name}</h3>
                <p className="text-yellow-500 text-xs mt-1">⭐⭐⭐⭐☆ (42)</p>
                <p className="text-gray-700 text-sm mt-1">₹{product.price}</p>
                <p className="text-gray-500 text-xs">{product.size || "1kg"}</p>
                <button className="mt-auto bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700">
                  Add to Cart
                </button>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 border rounded ${
                page === 1 ? "bg-blue-600 text-white" : ""
              }`}
            >
              {page}
            </button>
          ))}
          <button className="px-3 py-1 border rounded">Next</button>
        </div>

        {/* Bottom Banner */}
        <div className="mt-10 p-6 bg-[#98FB98] rounded-lg text-center flex flex-col md:flex-row items-center justify-between">
          
          <img
            src="/images/dog-banner.png"
            alt="dog banner"
            className="h-24 object-contain mb-4 md:mb-0"
          />
          <p className="text-lg font-semibold px-6">
            A balanced dog diet should consist of protein, fats, carbohydrates,
            vitamins, and minerals, along with plenty of fresh water.
          </p>
          <img
            src="/images/dog-banner2.png"
            alt="dog banner 2"
            className="h-24 object-contain mt-4 md:mt-0"
          />
        </div>
      </main>
    </div>
  );
}

/* -----------------------
   SidebarFilters Component
----------------------- */
function SidebarFilters({ filters, setFilters }) {
  const [openSections, setOpenSections] = useState({
    brand: true,
    size: true,
    breed: false,
    life_stage: false,
    flavor: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Mock promo data
  const promos = [
    { title: "Stress-Free Summer", img: "/images/promo1.png" },
    { title: "Toys", img: "/images/promo2.png" },
    { title: "Dog & Cat Care", img: "/images/promo3.png" },
    { title: "Training", img: "/images/promo4.png" },
    { title: "Natural Food", img: "/images/promo5.png" },
  ];

  // Available options
  const filterOptions = {
    brand: ["Drools", "Pedigree", "Royal Canin"],
    size: ["Small", "Medium", "Large"],
    breed: ["Beagle", "Labrador", "German Shepherd", "Pug"],
    life_stage: ["Puppy", "Adult Dog", "Senior Dog"],
    flavor: ["Chicken", "Fish", "Lamb", "Vegetables"],
  };

  return (
    <aside className="hidden md:block col-span-1 space-y-6">
      {/* Filters */}
      <div className="border rounded-lg p-4">
        <h3 className="font-bold mb-4">Filters</h3>

        {Object.keys(filterOptions).map((section) => (
          <div key={section} className="mb-4">
            {/* Header with chevron */}
            <button
              onClick={() => toggleSection(section)}
              className="w-full flex justify-between items-center font-semibold text-left"
            >
              <span className="capitalize">{section.replace("_", " ")}</span>
              {openSections[section] ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {/* Options */}
            {openSections[section] && (
              <div className="mt-2 space-y-1 ml-2">
                {filterOptions[section].map((option) => (
                  <label key={option} className="block text-sm">
                    <input
                      type="checkbox"
                      checked={filters[section]?.includes(option)}
                      onChange={() => {
                        const alreadySelected =
                          filters[section]?.includes(option);
                        const updated = alreadySelected
                          ? filters[section].filter((o) => o !== option)
                          : [...filters[section], option];
                        setFilters({
                          ...filters,
                          [section]: updated,
                        });
                      }}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Promo Images */}
      <div className="space-y-4">
        {promos.map((promo, idx) => (
          <div
            key={idx}
            className="rounded-lg overflow-hidden shadow border hover:shadow-lg transition"
          >
            <img
              src={promo.img}
              alt={promo.title}
              className="w-full h-28 object-cover"
            />
            <p className="p-2 text-sm font-semibold">{promo.title}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
