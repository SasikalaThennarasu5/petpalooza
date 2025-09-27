import React from "react";
import { Link } from "react-router-dom";

const PetServices = () => {
  return (
    <section className="font-montserrat bg-white min-h-screen">
      {/* Hero */}
      <div className="relative">
        <img
          src="/images/pet-banner.png" // <-- place your hero banner here
          alt="Pet Services"
          className="w-full h-[250px] md:h-[350px] object-cover"
        />
        
      </div>

      {/* Service Icons */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6 px-6 md:px-20 -mt-12 relative z-10">
        {[
          { name: "Grooming", icon: "/images/img1.png" },
          { name: "PetsHotel", icon: "/images/img2.png" },
          { name: "Doggie Day Camp", icon: "/images/img3.png" },
          { name: "Training", icon: "/images/img4.png" },
          { name: "Veterinary Care", icon: "/images/img5.png" },
          { name: "Adoption", icon: "/images/img6.png" },
        ].map((service, idx) => (
          <div
            key={idx}
            className="bg-paleGreen shadow-lg p-5 rounded-xl text-center font-medium hover:scale-105 transition-transform cursor-pointer flex flex-col items-center"
          >
            <img
              src={service.icon}
              alt={service.name}
              className="w-10 h-10 mb-2"
            />
            {service.name}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="px-6 md:px-20 py-10 flex justify-between items-start">
        <p className="text-gray-600 max-w-3xl">
          Whether it’s a pamper day, playdate, sleepover, training class, or
          veterinary visit, we provide the best in pet services with highly
          trained, passionate associates. From our pet hotel & doggie day camp
          as an alternative to pet sitting, to our dog training and grooming as
          an alternative to DIY, our services are conveniently located inside
          most of our PetSmart stores.
        </p>

        {/* customer service link */}
        <a href="tel:+911234567890" className="text-strongBlue font-medium text-sm">
          customer service <br /> +91-1234567890
        </a>
      </div>

      {/* Offers Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-20 pb-12">
        {/* Summer Special */}
        <div className="bg-strongBlue text-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center">
          <div className="flex-1">
            <h3 className="font-bold text-xl mb-3">Summer Special</h3>
            <p>
              Upgrade a salon visit or overnight stay with a strawberry ice
              cream split, ₹350+ in coupon savings & more.
            </p>
            <button className="mt-5 bg-white text-strongBlue font-semibold px-6 py-2 rounded-xl">
              Book Now
            </button>
          </div>
          <img
            src="/images/summer-special.png"
            alt="Summer Special"
            className="w-160 h-40 object-cover rounded-xl mt-4 md:mt-0 md:ml-6"
          />
        </div>

        {/* Monthly Specials */}
        <div className="bg-paleGreen p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center">
          <div className="flex-1">
            <h3 className="font-bold text-xl mb-3">Monthly Specials</h3>
            <p>
              Check out deals, offers & events in grooming, boarding, day camp &
              training.
            </p>
            <button className="mt-5 bg-strongBlue text-white px-6 py-2 rounded-xl">
              Get Details
            </button>
          </div>
          <img
            src="/images/monthly-special.png"
            alt="Monthly Specials"
            className="w-40 h-40 object-cover rounded-xl mt-4 md:mt-0 md:ml-6"
          />
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20 pb-16">
        <div className="bg-gray-100 p-6 rounded-2xl shadow-lg text-center">
          <h3 className="font-bold text-xl mb-3">Yappy Hour</h3>
          <p>₹5 OFF on salon walk-in services Monday–Friday</p>
          <button className="mt-5 bg-persianBlue text-white px-6 py-2 rounded-xl">
            Learn More
          </button>
        </div>

        <div className="bg-gray-100 p-6 rounded-2xl shadow-lg text-center">
          <h3 className="font-bold text-xl mb-3">Training Classes</h3>
          <p>Only ₹129 any 6-week Training Class (₹21.50 a class) valid thru 7/6</p>
          <button className="mt-5 bg-persianBlue text-white px-6 py-2 rounded-xl">
            Enroll Now
          </button>
        </div>

        <div className="bg-gray-100 p-6 rounded-2xl shadow-lg text-center">
          <h3 className="font-bold text-xl mb-3">Traveling?</h3>
          <p>
            Traveling without your pet this summer? Suite upgrades and fun add-ons
            make their stay even more special.
          </p>
          <button className="mt-5 bg-persianBlue text-white px-6 py-2 rounded-xl">
            Book Stay
          </button>
        </div>
      </div>
    </section>
  );
};

export default PetServices;
