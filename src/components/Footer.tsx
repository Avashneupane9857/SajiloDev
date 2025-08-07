import { useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { currUser, isLoggedIn, loginErr } from "../store";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const Footer = () => {
  const navigate = useNavigate();
  const isLogIn = useRecoilValue(isLoggedIn);
  const setLoginError = useSetRecoilState(loginErr);
  const collectionRef = collection(db, "subscriptions");
  const [currentUser, setCurrentUser] = useRecoilState(currUser);

  const handleSubscribe = async () => {
    if (!isLogIn) {
      setLoginError(true);
      navigate("/signin");
    } else {
      try {
        await addDoc(collectionRef, {
          email: currentUser?.email,
          name: currentUser?.name,
          time: new Date().toLocaleString(),
        });
        setCurrentUser({ ...currentUser, subscribed: true });
        console.log("subscribed");
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Failed to add data. Please try again.");
      }
    }
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.5, 0.5)}
      className="bg-black text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4 cursor-pointer" onClick={() => navigate("/")}>
                <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-black font-bold text-xl">S</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-2xl text-white">Sajilo</span>
                  <span className="font-semibold text-sm text-gray-300">Dev</span>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                We are a professional web development agency dedicated to creating stunning, 
                functional websites that help businesses grow and succeed in the digital world.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/sajilo-dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-300"
              >
                <FaLinkedin className="text-lg" />
              </a>
              <a
                href="https://www.instagram.com/sajilodev/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-all duration-300"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61558938183182"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-300"
              >
                <FaFacebook className="text-lg" />
              </a>
              <a
                href="https://github.com/sajilodev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-300"
              >
                <FaGithub className="text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/contactus"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/afterservice/0"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/orders"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Orders
                </a>
              </li>
              <li>
                <a
                  href="/contactus"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Customer Support
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          {!currentUser?.subscribed && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Stay Updated</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for the latest updates and insights.
              </p>
              <button
                onClick={handleSubscribe}
                className="btn bg-white text-black hover:bg-gray-100 w-full"
              >
                Subscribe Now
              </button>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 SajiloDev. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SectionWrapper(Footer);
