import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import Works from "../components/Works";
import { afterClickItems } from "../constants";
import { useRecoilValue } from "recoil";
import { currUser, isLoggedIn } from "../store";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

interface User {
  email: string | null;
  name: string | null;
}

const AfterService = ({
  currentServiceIncoming,
}: {
  currentServiceIncoming: number;
}) => {
  const [currentService, setCurrentService] = useState(currentServiceIncoming);
  const [currentOrder, setCurrentOrder] = useState(0);
  const collectionRef = collection(db, "orders");
  const currentUser: User = useRecoilValue(currUser);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    contact: "",
    additionalInfo: "",
    location: "",
    orderType: "",
    selectedService: 0,
  });
  const isLogIn = useRecoilValue<boolean>(isLoggedIn);
  const navigate = useNavigate();

  const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentService(parseInt(event.target.value, 10));
    setFormData((prevData) => ({
      ...prevData,
      selectedService: parseInt(event.target.value, 10),
    }));
  };

  const handleOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentOrder(parseInt(event.target.value, 10));
    setFormData((prevData) => ({
      ...prevData,
      orderType: event.target.value,
    }));
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProceed = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLogIn) {
      navigate("/signin");
    } else {
      try {
        const docRef = await addDoc(collectionRef, {
          orderId: "",
          details: formData.additionalInfo,
          email: currentUser?.email,
          location: formData.location,
          meeting: "Cancel",
          meetingLink: "",
          orderStatus: "Pending",
          orderType: formData.orderType,
          serviceType: afterClickItems[currentService]?.title,
          orderTime: new Date().toLocaleString(),
          meetingTime: "",
        });

        await updateDoc(doc(collectionRef, docRef.id), {
          orderId: `#${docRef.id} `,
        });

        setFormSubmitted(true);
        setTimeout(() => {
          setFormSubmitted(false);
        }, 5000);

        setFormData({
          contact: "",
          additionalInfo: "",
          location: "",
          orderType: "",
          selectedService: 0,
        });
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Failed to add data. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-x-hidden w-full">
      <Navbar />
      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-br from-black to-gray-900 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 w-full overflow-x-hidden">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {afterClickItems[currentService]?.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {afterClickItems[currentService]?.desc}
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
              <span className="text-green-800 font-semibold text-lg">Order Submitted Successfully!</span>
            </div>
            <p className="text-green-600">Thank you for choosing us! We'll contact you soon.</p>
          </div>
        </div>
      )}

      {/* Order Form Section */}
      {!formSubmitted && (
        <div className="py-20 bg-gray-50 w-full overflow-x-hidden">
          <div className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-8 w-full overflow-x-hidden">
            <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-lg border border-gray-200 w-full overflow-x-hidden">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-black mb-2">Place Your Order</h2>
                <p className="text-gray-600">Fill out the form below to get started with your project.</p>
              </div>

              <form onSubmit={handleProceed} className="space-y-6 w-full overflow-x-hidden">
                <div className="grid md:grid-cols-2 gap-6 w-full overflow-x-hidden">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Type *
                      </label>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        onChange={handleServiceChange}
                        value={currentService}
                      >
                        <option value={0}>Select service</option>
                        <option value={1}>Static Website</option>
                        <option value={2}>Dynamic Website</option>
                        <option value={3}>UI/UX</option>
                        <option value={4}>Hosting</option>
                        <option value={5}>Domain Registration</option>
                        <option value={6}>Upgrade Your Website</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Number *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Write your contact number"
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Write your location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Order Type *
                      </label>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        onChange={handleOrderChange}
                        value={currentOrder}
                      >
                        <option value="">Select order type</option>
                        <option value="Personal">Personal</option>
                        <option value="Organization">Organization</option>
                        <option value="Government">Government</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Information
                      </label>
                      <textarea
                        rows={8}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                        placeholder="Please tell us about the product you desire"
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center pt-6">
                  <p className="text-sm text-gray-500 mb-4">* Mandatory fields</p>
                  <button
                    type="submit"
                    className="btn bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg"
                  >
                    Proceed with Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Services />
      <Works />
      <Footer />
    </div>
  );
};

export default AfterService;
