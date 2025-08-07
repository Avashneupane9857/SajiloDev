import { useEffect, useState } from "react";
import { google, login } from "../assets";
import Navbar from "../components/Navbar";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currUser, loginErr } from "../store";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { collection, getDocs, query, where } from "firebase/firestore";
import { motion } from "framer-motion";
import { fadeIn, slideIn } from "../utils/motion";

interface FormData {
  email: string;
  password: string;
}

const Signin = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const setCurrentUser = useSetRecoilState(currUser);
  const navigate = useNavigate();
  let googleProvider = new GoogleAuthProvider();
  let githubProvider = new GithubAuthProvider();
  let facebookProvider = new FacebookAuthProvider();
  const [loginError, setLoginError] = useRecoilState(loginErr);
  const subscriptionRef = collection(db, "subscriptions");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((res) => {
        if (res?.user?.email) {
          const q = query(
            subscriptionRef,
            where("email", "==", res?.user?.email)
          );
          getDocs(q)
            .then((r) => {
              const ans = r.docs.filter(
                (d) => d.data().email === res?.user?.email
              );
              console.log("it is empty ", ans.length <= 0);
              setCurrentUser({
                email: res.user.email,
                name: res?.user?.displayName,
                photo: res?.user?.photoURL,
                subscribed: ans.length > 0,
                provider: res?.user?.providerData?.[0]?.providerId,
                phoneNo: res?.user?.phoneNumber,
              });
              navigate("/");
              console.log(res.user);
            })
            .catch((err) => console.log(err));
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        if (res?.user?.email) {
          const q = query(
            subscriptionRef,
            where("email", "==", res?.user?.email)
          );
          getDocs(q)
            .then((r) => {
              const ans = r.docs.filter(
                (d) => d.data().email === res?.user?.email
              );
              console.log("it is empty ", ans.length <= 0);
              setCurrentUser({
                email: res.user.email,
                name: res?.user?.displayName,
                photo: res?.user?.photoURL,
                subscribed: ans.length > 0,
                provider: res?.user?.providerData?.[0]?.providerId,
                phoneNo: res?.user?.phoneNumber,
              });
              navigate("/");
              console.log(res.user);
            })
            .catch((err) => console.log(err));
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  };

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((res) => {
        if (res?.user?.email) {
          const q = query(
            subscriptionRef,
            where("email", "==", res?.user?.email)
          );
          getDocs(q)
            .then((r) => {
              const ans = r.docs.filter(
                (d) => d.data().email === res?.user?.email
              );
              console.log("it is empty ", ans.length <= 0);
              setCurrentUser({
                email: res.user.email,
                name: res?.user?.displayName,
                photo: res?.user?.photoURL,
                subscribed: ans.length > 0,
                provider: res?.user?.providerData?.[0]?.providerId,
                phoneNo: res?.user?.phoneNumber,
              });
              navigate("/");
              console.log(res.user);
            })
            .catch((err) => console.log(err));
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  };

  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then((res) => {
        if (res?.user?.email) {
          const q = query(
            subscriptionRef,
            where("email", "==", res?.user?.email)
          );
          getDocs(q)
            .then((r) => {
              const ans = r.docs.filter(
                (d) => d.data().email === res?.user?.email
              );
              console.log("it is empty ", ans.length <= 0);
              setCurrentUser({
                email: res.user.email,
                name: res?.user?.displayName,
                photo: res?.user?.photoURL,
                subscribed: ans.length > 0,
                provider: res?.user?.providerData?.[0]?.providerId,
                phoneNo: res?.user?.phoneNumber,
              });
              navigate("/");
              console.log(res.user);
            })
            .catch((err) => console.log(err));
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  };

  useEffect(() => {
    setTimeout(() => setLoginError(false), 3000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Navbar
        logo=""
        bgColor="bg-transparent"
        textColor="text-white"
        borderColor=""
      />
      
      {loginError && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-red-500/10 border-b border-red-500/20 text-red-400 font-semibold text-center p-4 backdrop-blur-sm"
        >
          Please Login before performing this action!
        </motion.div>
      )}
      
      <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Welcome Section */}
            <motion.div
              variants={slideIn("left", "spring", 0.6, 1.4)}
              className="hidden lg:block space-y-8"
            >
              <div className="space-y-8">
                <div>
                  <h1 className="text-5xl font-bold text-white mb-4">Welcome to</h1>
                  <h1 className="text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    SajiloDev
                  </h1>
                </div>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Here, we believe that building a strong professional network begins with your participation. 
                  We are delighted to offer a modern and user-friendly service to ensure you have the best experience.
                </p>
                <button
                  className="btn bg-white text-black hover:bg-gray-100 text-lg px-8 py-4"
                  onClick={() => navigate("/afterservice/1")}
                >
                  Get Your Own Site
                </button>
              </div>
              
              <div className="relative">
                <img
                  src={login}
                  alt="Login illustration"
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>

            {/* Right Column - Login Form */}
            <motion.div
              variants={slideIn("right", "spring", 0.6, 1.4)}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20"
            >
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-white mb-3">Sign In</h2>
                  <p className="text-gray-300 text-lg">Welcome back! Please sign in to your account.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                      <p className="text-red-400 text-sm">Invalid email or password. Please try again.</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      onChange={handleChange}
                      value={formData.email}
                      required
                      className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 bg-white/10 text-white placeholder-gray-400 ${
                        error ? 'border-red-500/50' : 'border-white/20'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        onChange={handleChange}
                        value={formData.password}
                        required
                        className={`w-full px-4 py-4 pr-12 border rounded-xl focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 bg-white/10 text-white placeholder-gray-400 ${
                          error ? 'border-red-500/50' : 'border-white/20'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        {showPassword ? "🙈" : "👁"}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full btn bg-white text-black hover:bg-gray-100 text-lg py-4 rounded-xl"
                  >
                    Sign In
                  </button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-transparent text-gray-400">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={handleGoogleSignIn}
                    className="flex items-center justify-center p-4 border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    <img src={google} alt="Google" className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleGithubSignIn}
                    className="flex items-center justify-center p-4 border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    <FaGithub className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={handleFacebookSignIn}
                    className="flex items-center justify-center p-4 border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    <FaFacebook className="w-6 h-6 text-blue-400" />
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-gray-300 text-lg">
                    Don't have an account?{" "}
                    <button
                      onClick={() => navigate("/signup")}
                      className="text-white font-semibold hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
