import { useNavigate } from "react-router-dom";
import { serviceItems } from "../constants";
import { motion } from "framer-motion";
import { fadeIn, slideIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const Services = () => {
  const navigate = useNavigate();
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Our <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive web development solutions to help your business thrive in the digital world.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceItems?.map((item, index) => {
            return (
              <div
                className="card group cursor-pointer"
                key={index}
                onClick={() => navigate(`/afterservice/${index + 1}`)}
              >
                {/* Service Icon */}
                <div className="p-8 pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-black to-gray-600 rounded-2xl flex items-center justify-center mb-6">
                    <img
                      src={item?.img}
                      alt={item?.title}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  
                  {/* Service Title */}
                  <h3 className="text-xl font-bold text-black mb-4">
                    {item?.title}
                  </h3>
                  
                  {/* Service Description */}
                  <p className="text-gray-600 leading-relaxed line-clamp-3">
                    {item?.desc}
                  </p>
                </div>

                {/* Learn More Link */}
                <div className="px-8 pb-6">
                  <div className="flex items-center text-black font-medium">
                    <span>Learn More</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-black to-gray-800 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your requirements and create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="btn bg-white text-black hover:bg-gray-100"
                onClick={() => navigate("/contactus")}
              >
                Get Free Consultation
              </button>
              <button
                className="btn border-white text-white hover:bg-white hover:text-black"
                onClick={() => navigate("/afterservice/0")}
              >
                View All Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Services);
