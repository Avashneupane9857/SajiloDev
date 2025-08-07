import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Reviews from "../components/Reviews";
import Works from "../components/Works";
import { useNavigate } from "react-router-dom";
import { signOut, updateEmail, updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRecoilValue } from "recoil";
import { currUser } from "../store";
import Popup from "../components/Popup";
import { motion } from "framer-motion";
import { fadeIn, slideIn } from "../utils/motion";

interface UserData {
  name: string;
  email: string;
  phoneNo: string;
  additionalEmail: string;
}

const User = () => {
  const [editable, setEditable] = useState(false);
  const navigate = useNavigate();
  const currentUser = useRecoilValue(currUser);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<UserData>({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phoneNo: currentUser?.phoneNo || "",
    additionalEmail: "",
  });

  const handleEditClick = () => {
    setEditable(true);
  };

  const handleSaveClick = () => {
    console.log("form data is ", formData);
    setEditable(false);
    setLoading(true);
    const user = auth.currentUser;
    if (user) {
      updateEmail(user, formData.email)
        .then(() => {
          setLoading(false);
          console.log("Email updated successfully");
          // Update other profile information if needed
          updateProfile(user, {
            displayName: formData.name,
          })
            .then(() => {
              console.log("Profile updated successfully");
            })
            .catch((error) => {
              console.error("Error updating profile:", error);
            });
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error updating email:", error);
        });
    }
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const handleChangePassword = () => {};
  useEffect(() => console.log(auth.currentUser), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-br from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeIn("up", "spring", 0.6, 1)}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              User <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Profile</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Manage your account settings and personal information.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Profile Form Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={slideIn("up", "spring", 0.6, 1.4)}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-black mb-2">Profile Information</h2>
                <p className="text-gray-600">Update your personal details and account settings.</p>
              </div>
              <button
                className="btn bg-black text-white hover:bg-gray-800"
                onClick={editable ? handleSaveClick : handleEditClick}
                disabled={loading}
              >
                {editable ? (loading ? "Saving..." : "Save Changes") : "Edit Profile"}
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData?.name}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 ${
                      currentUser?.provider !== "firebase" ? "bg-gray-100 text-gray-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your name"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    readOnly={!editable || currentUser?.provider !== "password"}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData?.email}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 ${
                      currentUser?.provider !== "firebase" ? "bg-gray-100 text-gray-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your email"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    readOnly={!editable || currentUser?.provider !== "password"}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    value={formData?.phoneNo}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                    readOnly={!editable}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNo: e.target.value })
                    }
                    placeholder="Enter your contact number"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                    readOnly={!editable}
                    onChange={(e) =>
                      setFormData({ ...formData, additionalEmail: e.target.value })
                    }
                    placeholder="Enter your additional email"
                  />
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Account Actions</h3>
                    <div className="space-y-3">
                      <Popup
                        deco="w-full btn bg-black text-white hover:bg-gray-800"
                        text="Logout"
                        onpressed={handleLogOut}
                      >
                        Logout
                      </Popup>
                      
                      <button
                        className="w-full btn bg-red-500 text-white hover:bg-red-600"
                        onClick={
                          currentUser?.provider === "password"
                            ? handleChangePassword
                            : () =>
                                alert(
                                  `Can't perform this action for ${currentUser?.provider} user`
                                )
                        }
                      >
                        Change Password
                      </button>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Account Info</h3>
                    <p className="text-sm text-blue-700">
                      Provider: {currentUser?.provider || "Unknown"}
                    </p>
                    <p className="text-sm text-blue-700">
                      Account Type: {currentUser?.provider === "password" ? "Email/Password" : "Social Login"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Works />
      <Reviews />
      <Footer />
    </div>
  );
};

export default User;
