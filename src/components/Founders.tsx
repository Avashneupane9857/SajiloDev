import { founders } from "../constants";
import { styles } from "../styles";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { useState } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { SectionWrapper } from "../hoc";

const Founders = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const designations = [
    "Full Stack & Web3",
    "Frontend & UI/UX", 
    "Backend & DevOps"
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + founders.length) % founders.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % founders.length);
  };

  return (
    <div
      className={`${styles.padding} w-full min-h-[500px] sm:min-h-[600px] flex flex-col items-center gap-6`}
    >
      <div className="h-[15%] flex items-center gap-2 mb-4">
        <p className="font-serif text-[18px] sm:text-[22px] italic ">Sajilo</p>
        <div className="font-serif  text-[18px] sm:text-[22px] italic bg-[#0766FF] flex items-center justify-center p-1 sm:p-2 rounded-[50%] text-white">
          Dev's
        </div>
        <p className="font-serif  text-[18px] sm:text-[22px] italic ">
          Founders
        </p>
      </div>

      {/* Mobile/Tablet View - Single Card Carousel */}
      <div className="w-full h-[85%] flex items-center justify-center gap-6 px-2 sm:px-4 lg:hidden">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl z-10"
        >
          <IoMdArrowDropleft className="text-2xl text-gray-700" />
        </button>

        <div
          key={currentIndex}
          className="w-full max-w-sm min-h-[400px] shadow-xl rounded-xl shadow-slate-300 flex flex-col items-center justify-between p-4 sm:p-6 bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <div className="w-20 h-20 sm:w-[100px] sm:h-[100px] overflow-hidden rounded-full border-4 border-white/20 mx-auto">
            <img
              src={founders[currentIndex]?.img}
              alt="founder image"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="text-center mt-2">
            <p className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
              {currentIndex === 0 ? "Dipendra Bhatta" : currentIndex === 1 ? "Avash Neupane" : "Sidd"}
            </p>
            <p className="text-xs sm:text-sm text-blue-600 font-medium">
              {designations[currentIndex]}
            </p>
          </div>
          
          <div className="flex-1 flex items-center justify-center px-1 py-3 sm:px-2 sm:py-4">
            <p
              dangerouslySetInnerHTML={{ __html: founders[currentIndex]?.vanai }}
              className="font-serif text-[13px] sm:text-[14px] text-center leading-relaxed"
            ></p>
          </div>
          
          <div className="w-full flex justify-center items-center gap-6 py-3 sm:py-4">
            <FaGithub
              onClick={() =>
                window.open(
                  founders[currentIndex]?.github,
                  "_blank",
                  "rel=noopener noreferrer"
                )
              }
              className="text-lg sm:text-2xl cursor-pointer hover:text-gray-600"
            />
            <FaLinkedin
              onClick={() =>
                window.open(
                  founders[currentIndex]?.linkedin,
                  "_blank",
                  "rel=noopener noreferrer"
                )
              }
              className="text-lg sm:text-2xl cursor-pointer text-blue-800 hover:text-blue-600"
            />
            <FaInstagram
              onClick={() =>
                window.open(
                  founders[currentIndex]?.instagram,
                  "_blank",
                  "rel=noopener noreferrer"
                )
              }
              className="text-lg sm:text-2xl cursor-pointer text-red-600 hover:text-red-500"
            />
          </div>
        </div>

        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl z-10"
        >
          <IoMdArrowDropright className="text-2xl text-gray-700" />
        </button>
      </div>

      {/* Desktop View - All Three Cards */}
      <div className="w-full h-[85%] hidden lg:flex items-center justify-center gap-6 px-4">
        {founders?.map((founder, index) => (
          <div
            key={index}
            className="w-[28%] min-h-[400px] shadow-xl rounded-xl shadow-slate-300 flex flex-col items-center justify-between p-6 bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <div className="w-[100px] h-[100px] overflow-hidden rounded-full border-4 border-white/20">
              <img
                src={founder?.img}
                alt="founder image"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800 mb-1">
                {index === 0 ? "Dipendra Bhatta" : index === 1 ? "Avash Neupane" : "Sidd"}
              </p>
              <p className="text-sm text-blue-600 font-medium">
                {designations[index]}
              </p>
            </div>
            
            <div className="flex-1 flex items-center justify-center px-2 py-4">
              <p
                dangerouslySetInnerHTML={{ __html: founder?.vanai }}
                className="font-serif text-[14px] text-center leading-relaxed"
              ></p>
            </div>
            
            <div className="w-full flex justify-center items-center gap-6 py-4">
              <FaGithub
                onClick={() =>
                  window.open(
                    founder?.github,
                    "_blank",
                    "rel=noopener noreferrer"
                  )
                }
                className="text-2xl cursor-pointer hover:text-gray-600"
              />
              <FaLinkedin
                onClick={() =>
                  window.open(
                    founder?.linkedin,
                    "_blank",
                    "rel=noopener noreferrer"
                  )
                }
                className="text-2xl cursor-pointer text-blue-800 hover:text-blue-600"
              />
              <FaInstagram
                onClick={() =>
                  window.open(
                    founder?.instagram,
                    "_blank",
                    "rel=noopener noreferrer"
                  )
                }
                className="text-2xl cursor-pointer text-red-600 hover:text-red-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Founders);
