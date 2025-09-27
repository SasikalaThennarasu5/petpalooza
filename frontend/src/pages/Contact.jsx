import { Link } from "react-router-dom";
import { Phone, Mail, Truck, RotateCcw, MessageCircle, ArrowRight, CreditCard, HelpCircle } from "lucide-react";

export default function Contact() {
  return (
    <div className="font-montserrat bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="px-6 py-4 text-sm text-gray-600">
        Home / <span className="text-black font-medium">Contact</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 space-y-10">
        {/* Page Title */}
        <h1 className="text-2xl font-bold">Contact Us</h1>

        {/* Sign-in help banner */}
        <div className="flex items-center justify-between border rounded-lg p-4 shadow-sm">
          <div>
            <p className="font-medium">Getting help is easy</p>
            <p className="text-sm text-gray-600">
              Sign in to get help with recent orders
            </p>
          </div>
          <Link
            to="/login"
            className="bg-persianBlue text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Sign in
          </Link>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-semibold mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 flex justify-between items-center shadow-sm hover:shadow-md">
              <div>
                <Truck className="mb-2" />
                <h3 className="font-medium">Track order</h3>
                <p className="text-sm text-gray-600">View the status of your order</p>
              </div>
              <ArrowRight />
            </div>
            <div className="border rounded-lg p-4 flex justify-between items-center shadow-sm hover:shadow-md">
              <div>
                <RotateCcw className="mb-2" />
                <h3 className="font-medium">Return order</h3>
                <p className="text-sm text-gray-600">
                  Return and view the items in your order
                </p>
              </div>
              <ArrowRight />
            </div>
            <div className="border rounded-lg p-4 flex justify-between items-center shadow-sm hover:shadow-md">
              <div>
                <MessageCircle className="mb-2" />
                <h3 className="font-medium">Chat with vet</h3>
                <p className="text-sm text-gray-600">Get advice for your pet</p>
              </div>
              <ArrowRight />
            </div>
          </div>
        </div>

        {/* Browse Topics */}
        <div>
          <h2 className="font-semibold mb-4">Browse Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="border rounded-lg p-4 flex justify-between items-center shadow-sm hover:shadow-md">
              <span>Order related</span>
              <ArrowRight />
            </div>
            <div className="border rounded-lg p-4 flex justify-between items-center shadow-sm hover:shadow-md">
              <span>Return & cancellations</span>
              <ArrowRight />
            </div>
            <div className="border rounded-lg p-4 flex justify-between items-center shadow-sm hover:shadow-md">
              <span>Payments & refund</span>
              <ArrowRight />
            </div>
            <div className="border rounded-lg p-4 flex justify-between items-center shadow-sm hover:shadow-md">
              <span>General enquiry</span>
              <ArrowRight />
            </div>
          </div>
        </div>

        {/* Get in touch */}
        <div className="space-y-2">
          <h2 className="font-semibold">Get in touch</h2>
          <p className="text-sm text-gray-600">
            If you have any inquiries, feel free to contact us
          </p>
          <div className="flex items-center gap-2">
            <Phone size={18} /> <span>Call to 1234567890</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={18} /> <span>support@petpalooza.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
