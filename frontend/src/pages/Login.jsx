import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/");
    } catch {
      alert("Invalid username or password!");
    }
  };

  return (
    <div className="font-montserrat bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3 px-6 text-sm text-gray-600">
        <Link to="/" className="hover:underline">
          Home
        </Link>{" "}
        / <span className="text-persianBlue font-medium">Login</span>
      </div>

      <div className="max-w-5xl mx-auto bg-white p-8 mt-6 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-2">
          Login or Create an Account
        </h1>
        {/* Green underline */}
        <div className="h-1 w-20 bg-paleGreen mb-8"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Returning Customers */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Returning Customers</h2>
            <div className="h-0.5 w-12 bg-paleGreen mb-4"></div>

            <p className="text-sm text-gray-600 mb-6">
              If you have an account, please log in.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="border rounded w-full p-2"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  className="border rounded w-full p-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-persianBlue text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Login
              </button>
            </form>
          </div>

          {/* New Customers */}
          <div>
            <h2 className="text-lg font-semibold mb-2">New Customers</h2>
            <div className="h-0.5 w-12 bg-paleGreen mb-4"></div>

            <p className="text-sm text-gray-600 mb-6">
              By creating an account with our store, you will be able to move
              through the checkout process faster, store multiple shipping
              addresses, view and track your orders, and more.
            </p>
            <Link
              to="/register"
              className="bg-persianBlue text-white px-6 py-2 rounded hover:bg-blue-700 inline-block"
            >
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
