import { useNavigate } from "react-router-dom";
import { serviceItems } from "../constants";
import { styles } from "../styles";
import { motion } from "framer-motion";
import { fadeIn, slideIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const Services = () => {
  const navigate = useNavigate();
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={textVariant(0.2)}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive web development solutions to help your business thrive in the digital world.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceItems?.map((item, index) => {
            return (
              <motion.div
                variants={
                  index === 1 || index === 4
                    ? fadeIn(index === 1 ? "down" : "up", "spring", 0.5, 1.5)
                    : slideIn(
                        index === 0 || index === 3
                          ? "left"
                          : index === 2 || index === 5
                          ? "right"
                          : "",
                        "spring",
                        0.5,
                        1.5
                      )
                }
                className="card group cursor-pointer"
                key={index}
                onClick={() => navigate(`/afterservice/${index + 1}`)}
              >
                {/* Service Icon */}
                <div className="p-8 pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={item?.img}
                      alt={item?.title}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  
                  {/* Service Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {item?.title}
                  </h3>
                  
                  {/* Service Description */}
                  <p className="text-gray-600 leading-relaxed line-clamp-3">
                    {item?.desc}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="px-8 pb-6">
                  <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                    <span>Learn More</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          variants={fadeIn("up", "spring", 0.8, 1.5)}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your requirements and create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="btn bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => navigate("/contactus")}
              >
                Get Free Consultation
              </button>
              <button
                className="btn btn-outline border-white text-white hover:bg-white hover:text-blue-600"
                onClick={() => navigate("/afterservice/0")}
              >
                View All Services
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Services);
