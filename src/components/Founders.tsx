import { founders } from "../constants";
import { styles } from "../styles";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { motion } from "framer-motion";
import { slideIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const Founders = () => {
  const designations = [
    "Full Stack & Web3",
    "Frontend & UI/UX", 
    "Backend & DevOps"
  ];

  return (
    <div
      className={`${styles.padding} w-full min-h-[500px] sm:min-h-[600px] flex flex-col items-center gap-6`}
    >
      <motion.div
        variants={textVariant(0.2)}
        className="h-[15%] flex items-center gap-2 mb-4"
      >
        <p className="font-serif text-[18px] sm:text-[22px] italic ">Sajilo</p>
        <div className="font-serif  text-[18px] sm:text-[22px] italic bg-[#0766FF] flex items-center justify-center p-1 sm:p-2 rounded-[50%] text-white">
          Dev's
        </div>
        <p className="font-serif  text-[18px] sm:text-[22px] italic ">
          Founders
        </p>
      </motion.div>
      <div className="w-full h-[85%] flex items-center justify-center gap-6 px-4">
        {founders?.map((founder, index) => (
          <motion.div
            variants={slideIn(
              index === 0 ? "left" : index === 1 ? "up" : "right",
              "spring",
              0.5,
              0.9
            )}
            key={index}
            className="w-[28%] min-h-[400px] shadow-xl rounded-xl shadow-slate-300 flex flex-col items-center justify-between p-6 bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] overflow-hidden rounded-full border-4 border-white/20">
              <img
                src={founder?.img}
                alt="founder image"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="text-center">
              <p className="text-sm sm:text-base font-semibold text-gray-800 mb-1">
                {index === 0 ? "Dipendra Bhatta" : index === 1 ? "Avash Neupane" : "Sidd"}
              </p>
              <p className="text-xs sm:text-sm text-blue-600 font-medium">
                {designations[index]}
              </p>
            </div>
            
            <div className="flex-1 flex items-center justify-center px-2 py-4">
              <p
                dangerouslySetInnerHTML={{ __html: founder?.vanai }}
                className="font-serif text-[12px] sm:text-[14px] text-center leading-relaxed"
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
                className="text-xl sm:text-2xl cursor-pointer hover:text-gray-600 transition-colors duration-300"
              />

              <FaLinkedin
                onClick={() =>
                  window.open(
                    founder?.linkedin,
                    "_blank",
                    "rel=noopener noreferrer"
                  )
                }
                className="text-xl sm:text-2xl cursor-pointer text-blue-800 hover:text-blue-600 transition-colors duration-300"
              />

              <FaInstagram
                onClick={() =>
                  window.open(
                    founder?.instagram,
                    "_blank",
                    "rel=noopener noreferrer"
                  )
                }
                className="text-xl sm:text-2xl cursor-pointer text-red-600 hover:text-red-500 transition-colors duration-300"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Founders);
