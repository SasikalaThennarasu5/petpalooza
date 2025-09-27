import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  FaUser,
  FaShoppingCart,
  FaPhone,
  FaEnvelope,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import logo from "../assets/images/logo.png";
import api from "../api/axios";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [categories, setCategories] = useState([]);

  // ✅ Fetch categories from backend
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await api.get("/categories/");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }
    fetchCategories();
  }, []);

  return (
    <header className="font-montserrat">
      {/* Top info bar */}
      <div className="bg-gray-100 text-black text-sm flex justify-start items-center px-4 md:px-20 py-2 space-x-6">
        <span className="flex items-center gap-1">
          <FaPhone /> +91-1234567890
        </span>
        <span className="flex items-center gap-1">
          <FaEnvelope /> Support@petpalooza.com
        </span>
      </div>

      {/* Main navbar */}
      <nav className="bg-persianBlue text-white">
        <div className="flex items-center justify-between px-4 md:px-20 py-4">
          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="PetPalooza Logo" className="w-32" />
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 px-6">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Search for products"
                className="w-full p-2 pl-10 rounded-full text-black"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-500" />
            </div>
          </div>

          {/* Nav links desktop */}
          <div className="hidden md:flex items-center space-x-6 font-semibold">
            <Link to="/" className="hover:text-paleGreen">
              Home
            </Link>
            <Link to="/about" className="hover:text-paleGreen">
              About
            </Link>
            <Link to="/contact" className="hover:text-paleGreen">
              Contact
            </Link>

            {user ? (
              <>
                <span className="font-semibold">Hi, {user.username}</span>
                <button
                  onClick={logout}
                  className="bg-paleGreen text-black px-3 py-1 rounded hover:bg-white hover:text-persianBlue transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1 hover:text-paleGreen"
              >
                <FaUser /> Log In
              </Link>
            )}

            <Link
              to="/cart"
              className="flex items-center gap-1 hover:text-paleGreen relative"
            >
              <FaShoppingCart /> Cart
              <span className="absolute -top-2 -right-3 bg-paleGreen text-black text-xs font-bold px-2 py-0.5 rounded-full">
                1
              </span>
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Row 2: Categories & Menu */}
        <div className="hidden md:flex justify-center space-x-8 font-semibold text-white bg-oceanBlue px-4 md:px-20 py-2">
          {/* ✅ Dynamic Categories */}
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="flex items-center hover:text-paleGreen"
            >
              {cat.name}
            </Link>
          ))}

          {/* Static Dropdown Menus */}
          <div className="relative group">
            
            
            <Link to="/petservices" className="flex items-center hover:text-paleGreen">
              Pet Service <FiChevronDown />
            </Link>
            <div className="absolute hidden group-hover:block bg-white text-black shadow-lg rounded mt-2 min-w-[180px] z-50">
              <Link to="/petservices" className="block px-4 py-2 hover:bg-gray-100">
                Grooming
              </Link>
              <Link to="/petservices" className="block px-4 py-2 hover:bg-gray-100">
                Training
              </Link>
              <Link to="/petservices" className="block px-4 py-2 hover:bg-gray-100">
                Boarding
              </Link>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center hover:text-paleGreen">
              Shop by Brand <FiChevronDown />
            </button>
            <div className="absolute hidden group-hover:block bg-white text-black shadow-lg rounded mt-2 min-w-[180px] z-50">
              <Link to="/brand/royalcanin" className="block px-4 py-2 hover:bg-gray-100">
                Royal Canin
              </Link>
              <Link to="/brand/pedigree" className="block px-4 py-2 hover:bg-gray-100">
                Pedigree
              </Link>
              <Link to="/brand/whiskas" className="block px-4 py-2 hover:bg-gray-100">
                Whiskas
              </Link>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center hover:text-paleGreen">
              Shop by Breed <FiChevronDown />
            </button>
            <div className="absolute hidden group-hover:block bg-white text-black shadow-lg rounded mt-2 min-w-[180px] z-50">
              <Link to="/breed/labrador" className="block px-4 py-2 hover:bg-gray-100">
                Labrador
              </Link>
              <Link to="/breed/beagle" className="block px-4 py-2 hover:bg-gray-100">
                Beagle
              </Link>
              <Link to="/breed/persian" className="block px-4 py-2 hover:bg-gray-100">
                Persian Cat
              </Link>
            </div>
          </div>

          <Link to="/consult-vet" className="hover:text-paleGreen">
            Consult a Vet
          </Link>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-oceanBlue text-white px-4 py-4 space-y-3">
            <Link to="/" className="block hover:text-paleGreen">
              Home
            </Link>
            <Link to="/about" className="block hover:text-paleGreen">
              About
            </Link>
            <Link to="/contact" className="block hover:text-paleGreen">
              Contact
            </Link>

            {/* ✅ Mobile categories */}
            {categories.map((cat) => (
              <div key={cat.id}>
                <Link
                  to={`/category/${cat.id}`}
                  className="block hover:text-paleGreen"
                >
                  {cat.name}
                </Link>
              </div>
            ))}

            {/* Static Mobile Menus */}
            <Link to="/petservices" className="block hover:text-paleGreen">
              Pet Service
            </Link>
            <Link to="/brand/royalcanin" className="block hover:text-paleGreen">
              Shop by Brand
            </Link>
            <Link to="/breed/labrador" className="block hover:text-paleGreen">
              Shop by Breed
            </Link>
            <Link to="/consult" className="block hover:text-paleGreen">
              Consult a Vet
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
