import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import logo from "../assets/images/logo.png"; // adjust path to your logo

const Footer = () => {
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/pages/footer/") // backend API
      .then((res) => res.json())
      .then((data) => setFooter(data))
      .catch((err) => console.error("Error loading footer:", err));
  }, []);

  if (!footer) return null;

  return (
    <footer className="bg-persianBlue text-white py-10 px-6 md:px-20 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        
        {/* Logo + About */}
        <div className="flex flex-col items-start">
          <img src={logo} alt="PetPalooza Logo" className="w-32 mb-4" />
          <h2 className="text-white font-bold text-lg">{footer.about_title}</h2>
          <ul className="mt-2 space-y-2">
            {footer.about_links?.map((link, i) => (
              <li key={i}>
                <a href={link.url} className="text-white hover:text-paleGreen">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-white font-bold text-lg">{footer.categories_title}</h2>
          <ul className="mt-2 space-y-2">
            {footer.categories?.map((cat, i) => (
              <li key={i}>
                <a href={cat.url} className="text-white hover:text-paleGreen">
                  {cat.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-white font-bold text-lg">{footer.support_title}</h2>
          <ul className="mt-2 space-y-2">
            {footer.support_links?.map((link, i) => (
              <li key={i}>
                <a href={link.url} className="text-white hover:text-paleGreen">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social + Contact */}
        <div>
          <h2 className="text-white font-bold text-lg mb-3">Follow</h2>
          <div className="flex space-x-4 text-white text-xl">
            {footer.facebook_url && (
              <a href={footer.facebook_url} target="_blank" rel="noreferrer">
                <FaFacebookF className="hover:text-paleGreen" />
              </a>
            )}
            {footer.instagram_url && (
              <a href={footer.instagram_url} target="_blank" rel="noreferrer">
                <FaInstagram className="hover:text-paleGreen" />
              </a>
            )}
            {footer.youtube_url && (
              <a href={footer.youtube_url} target="_blank" rel="noreferrer">
                <FaYoutube className="hover:text-paleGreen" />
              </a>
            )}
            {footer.whatsapp_url && (
              <a href={footer.whatsapp_url} target="_blank" rel="noreferrer">
                <FaWhatsapp className="hover:text-paleGreen" />
              </a>
            )}
          </div>

          <div className="mt-6">
            <h2 className="text-white font-bold text-lg">Get in Touch</h2>
            <p className="mt-2">Call: {footer.contact_phone}</p>
            <p>Email: {footer.contact_email}</p>
          </div>
        </div>

        {/* Subscribe */}
        <div>
          <h2 className="text-white font-bold text-lg mb-3">{footer.subscribe_text}</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-3 rounded text-black"
          />
          <button className="w-full bg-oceanBlue hover:bg-paleGreen text-white py-2 rounded font-semibold">
            Subscribe Now
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
