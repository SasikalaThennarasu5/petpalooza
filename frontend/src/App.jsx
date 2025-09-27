import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import About from "./pages/About";   // 🔑 Capitalized filename for consistency
import Contact from "./pages/Contact";

import OrderHistory from "./pages/OrderHistory";
import StaticPage from "./pages/StaticPage";
import ProtectedRoute from "./components/ProtectedRoute";

import Footer from "./components/Footer";
import CategoryPage from "./components/CategoryPage";
import ProductDescription from "./pages/ProductDescription";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderCompletion from "./pages/OrderCompletion";
import PetServices from "./pages/PetServices";
import ConsultVet from "./pages/ConsultVet";
import ConsultNow from "./pages/ConsultNow";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        {/* Categories (by ID) */}
        <Route path="/category/:id" element={<CategoryPage />} />

        {/* Product detail (by ID) */}
        <Route path="/product/:id" element={<ProductDescription />} />

        {/* Services / Other Pages */}
        
        
        <Route path="/petservices" element={<PetServices />} />
        <Route path="/consult-vet" element={<ConsultVet />} />
        <Route path="/consult-now" element={<ConsultNow />} />

        {/* Protected Routes */}
        <Route
  path="/cart"
  element={
    <ProtectedRoute>
      <CartPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <CheckoutPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/order-completion/:id"
  element={
    <ProtectedRoute>
      <OrderCompletion />
    </ProtectedRoute>
  }
/>

        {/* Orders */}
        <Route path="/orders" element={<OrderHistory />} />

        {/* Static Pages */}
        <Route path="/page/:slug" element={<StaticPage />} />

        {/* Catch-all route for 404s */}
        <Route path="*" element={<h1 className="p-6">404 - Page Not Found</h1>} />
      </Routes>
      <Footer />
    </Router>
  );
}
