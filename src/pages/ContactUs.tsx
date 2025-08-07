import React, { useState, ChangeEvent, FormEvent } from "react";
import Footer from "../components/Footer";
import GettingSite from "../components/GettingSite";
import Navbar from "../components/Navbar";
import { IoCall } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import emailjs from "emailjs-com";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          to_name: "Sajilo Dev",
          from_email: formData.email,
          to_email: "sajilodev557@gmail.com",
          message: formData.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setFormSubmitted(true);
          setLoading(false);

          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
          setTimeout(() => setFormSubmitted(false), 5000);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Something went wrong");
        }
      );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-x-hidden w-full">
      <Navbar />
      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-br from-black to-gray-900 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 w-full overflow-x-hidden">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Get in <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Ready to start your project? Let's discuss your requirements and create something amazing together.
            </p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {formSubmitted && (
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 -mt-10 mb-8 w-full overflow-x-hidden">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-green-800 font-semibold text-lg">Message Sent Successfully!</span>
            </div>
            <p className="text-green-600">Thank you for contacting us. We'll get back to you soon!</p>
          </div>
        </div>
      )}

      {/* Contact Form Section */}
      {!formSubmitted && (
        <div className="py-20 bg-gray-50 w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 w-full overflow-x-hidden">
            <div className="grid lg:grid-cols-2 gap-12 w-full overflow-x-hidden">
              {/* Contact Information */}
              <div className="space-y-8 w-full">
                <div>
                  <h2 className="text-3xl font-bold text-black mb-4">
                    Contact Information
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Get in touch with us for any questions about our services or to start your next project.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                      <IoCall className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">Phone</h3>
                      <p className="text-gray-600">+91-8545866043</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                      <IoIosMail className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">Email</h3>
                      <p className="text-gray-600">sajilodev557@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                      <FaInstagram className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">Instagram</h3>
                      <p className="text-gray-600">@sajilodev</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                      <FaFacebook className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">Facebook</h3>
                      <p className="text-gray-600">Sajilo Dev</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                      <FaLinkedin className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">LinkedIn</h3>
                      <p className="text-gray-600">sajilo-dev</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-lg border border-gray-200 w-full overflow-x-hidden">
                <h2 className="text-2xl font-bold text-black mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6 w-full overflow-x-hidden">
                  <div className="grid sm:grid-cols-2 gap-6 w-full overflow-x-hidden">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending Message...
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <GettingSite />
      <Footer />
    </div>
  );
};

export default ContactUs;
