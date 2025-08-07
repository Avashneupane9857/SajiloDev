import { useRecoilValue } from "recoil";
import { def } from "../assets";
import { navLinks, serviceDropdowns } from "../constants";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { currUser, isLoggedIn } from "../store";
import { useState, useEffect } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { ImCross } from "react-icons/im";

const Navbar = ({
  bgColor,
  textColor,
  borderColor,
  logo,
}: {
  bgColor: string;
  textColor: string;
  borderColor: string;
  logo: string;
}) => {
  const navigate = useNavigate();
  const isLogIn = useRecoilValue(isLoggedIn);
  const [showDropdown, setShowDropdown] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const currentUser = useRecoilValue(currUser);
  let timeoutId: NodeJS.Timeout;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setShowDropdown(false);
    }, 300);
  };

  const handleMouseOverDropdown = () => {
    setShowDropdown(true);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-black to-gray-800 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div className="flex flex-col">
                <span className={`font-bold text-2xl ${scrolled ? 'text-black' : 'text-white'}`}>
                  Sajilo
                </span>
                <span className={`font-semibold text-sm ${scrolled ? 'text-gray-600' : 'text-gray-300'}`}>
                  Dev
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks?.map((nav, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => {
                  if (nav.title === "Services") {
                    setShowDropdown(true);
                  }
                }}
                onMouseLeave={() => {
                  if (nav.title === "Services") {
                    handleMouseLeave();
                  }
                }}
              >
                <button
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    scrolled 
                      ? 'text-gray-700 hover:text-black hover:bg-gray-100' 
                      : 'text-white hover:text-gray-200'
                  }`}
                  onClick={() => {
                    if (nav.title !== "Services") {
                      navigate(nav.link);
                    }
                  }}
                >
                  <span>{nav.title}</span>
                  {nav.title === "Services" && (
                    <IoMdArrowDropdown className="text-sm" />
                  )}
                </button>

                {/* Services Dropdown */}
                {nav.title === "Services" && showDropdown && (
                  <div
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                    onMouseLeave={() => setShowDropdown(false)}
                    onMouseOver={() => handleMouseOverDropdown()}
                  >
                    {serviceDropdowns?.map((service, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-4 py-3 hover:bg-gray-100 hover:text-black transition-colors duration-200 text-sm font-medium text-gray-700"
                        onClick={() => {
                          navigate(`/afterservice/${index + 1}`);
                          setShowDropdown(false);
                        }}
                      >
                        {service?.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {!isLogIn ? (
              <>
                <button
                  className={`font-medium transition-all duration-300 ${
                    scrolled ? 'text-gray-700 hover:text-black' : 'text-white hover:text-gray-200'
                  }`}
                  onClick={() => navigate("/signin")}
                >
                  Sign In
                </button>
                <button
                  className={`btn ${
                    scrolled ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-100'
                  }`}
                  onClick={() => navigate("/signup")}
                >
                  Get Started
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  className={`font-medium transition-all duration-300 ${
                    scrolled ? 'text-gray-700 hover:text-black' : 'text-white hover:text-gray-200'
                  }`}
                  onClick={() => navigate("/orders")}
                >
                  Orders
                </button>
                <div
                  className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-2 border-white shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => navigate("/user")}
                >
                  <img
                    src={currentUser?.photo || def}
                    className="w-full h-full object-cover"
                    alt="Profile"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg transition-all duration-300"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? (
              <AiOutlineMenuUnfold className={`text-2xl ${scrolled ? 'text-gray-700' : 'text-white'}`} />
            ) : (
              <AiOutlineMenuFold className={`text-2xl ${scrolled ? 'text-gray-700' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {toggle && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-200 z-50">
            <div className="px-6 py-4 space-y-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {navLinks.map((link, index) => (
                  <button
                    key={index}
                    className="w-full text-left py-3 px-4 rounded-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-black transition-all duration-300"
                    onClick={() => {
                      if (link.title === "Services") {
                        // Handle services dropdown in mobile
                        navigate("/afterservice/0");
                      } else {
                        navigate(link.link);
                      }
                      setToggle(false);
                    }}
                  >
                    {link.title}
                  </button>
                ))}
              </div>

              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-gray-200">
                {!isLogIn ? (
                  <div className="space-y-3">
                    <button
                      className="w-full py-3 px-4 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-all duration-300"
                      onClick={() => {
                        navigate("/signin");
                        setToggle(false);
                      }}
                    >
                      Sign In
                    </button>
                    <button
                      className="w-full btn bg-black text-white hover:bg-gray-800"
                      onClick={() => {
                        navigate("/signup");
                        setToggle(false);
                      }}
                    >
                      Get Started
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <button
                      className="py-3 px-4 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-all duration-300"
                      onClick={() => {
                        navigate("/orders");
                        setToggle(false);
                      }}
                    >
                      Orders
                    </button>
                    <div
                      className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-2 border-gray-200"
                      onClick={() => {
                        navigate("/user");
                        setToggle(false);
                      }}
                    >
                      <img
                        src={currentUser?.photo || def}
                        className="w-full h-full object-cover"
                        alt="Profile"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
