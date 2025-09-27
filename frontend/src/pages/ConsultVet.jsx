import React from "react";
import { Link } from "react-router-dom";

const ConsultVet = () => {
  return (
    <section className="font-montserrat bg-white min-h-screen">
      {/* Hero */}
      <div className="relative">
        <img  
          src="/images/consult1.png"
          alt="Consult Vet"
          className="w-full h-[400px] md:h-[550px] object-cover"
        />
        <div className="absolute inset-0  flex items-center justify-center">
          
        </div>
      </div>

      {/* Services Categories */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 px-6 md:px-20 py-10">
  {[
    { name: "General Checkup", image: "/images/image 1.png" },
    { name: "Skin Issues", image: "/images/image 2.png" },
    { name: "Digestive", image: "/images/image 3.png" },
    { name: "Paws & Limbs", image: "/images/image 4.png" },
    { name: "Dental", image: "/images/image 5.png" },
    { name: "Ear", image: "/images/image 6.png" },
    { name: "Eye", image: "/images/image 7.png" },
    { name: "Nutrition", image: "/images/image 8.png" },
  ].map((s, i) => (
    <div
      key={i}
      className="flex flex-col items-center bg-paleGreen px-6 py-4 rounded-xl text-sm md:text-base font-medium shadow-md cursor-pointer hover:scale-105 transition w-28 md:w-32"
    >
      <img
        src={s.image}
        alt={s.name}
        className="w-12 h-12 mb-2 object-contain"
      />
      <span>{s.name}</span>
    </div>
  ))}
</div>
      {/* Featured Vet (second section) */}
      <div className="text-center px-6 md:px-20">
        <img
          src="/images/consult2.png"
          alt="Vet Consult"
          className="mx-auto rounded-xl shadow-md"
        />
        <p className="mt-6 text-gray-600">
          Get stress-free pet care from the comfort of your home.
        </p>
        <Link to="/consult-now">
          <button className="mt-6 bg-persianBlue text-white px-8 py-3 rounded-xl font-semibold">
            Consult Now
          </button>
        </Link>
      </div>

      {/* Doctors List */}
      <div className="px-6 md:px-20 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((doc) => (
          <div
            key={doc}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={`/images/doctor${doc}.png`} // doctor1.png, doctor2.png, doctor3.png
              alt={`Doctor ${doc}`}
              className="w-40 h-40 object-contain mx-auto mt-4"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-strongBlue">
                Dr. Example {doc}
              </h3>
              <p className="text-gray-500 text-sm">Veterinarian, 6+ years exp.</p>
              <Link to="/consult-now">
                <button className="mt-4 w-full py-2 px-4 bg-persianBlue text-white font-medium rounded-xl hover:bg-strongBlue transition">
                  Consult Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ConsultVet;
