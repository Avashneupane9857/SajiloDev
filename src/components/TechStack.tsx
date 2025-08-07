import { useState } from "react";
import { techStack } from "../constants";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const TechStack = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={textVariant(0.2)}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Our <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">Tech Stack</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At SajiloDev, our tech framework is designed for efficient and scalable development. 
            We use a comprehensive stack of cutting-edge tools chosen to meet modern software engineering demands.
          </p>
        </motion.div>

        <motion.div
          variants={fadeIn("up", "spring", 0.6, 1)}
          className="grid lg:grid-cols-2 gap-12 items-start"
        >
          {/* Left Column - Category Tabs */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-black mb-6">
              Technology Categories
            </h3>
            <div className="space-y-3">
              {techStack?.map((item, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                    currentIndex === index
                      ? 'bg-gradient-to-r from-black to-gray-800 text-white shadow-lg'
                      : 'bg-gray-50 text-black hover:bg-gray-100'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg">{item?.title}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      currentIndex === index ? 'bg-white' : 'bg-black'
                    }`} />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right Column - Tech Icons */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 rounded-2xl p-8 border border-gray-200"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-black mb-2">
                {techStack[currentIndex]?.title}
              </h3>
              <p className="text-gray-600">
                {currentIndex === 0 && "Modern frontend frameworks and tools for creating responsive, interactive user interfaces."}
                {currentIndex === 1 && "Robust backend technologies and frameworks for building scalable server-side applications."}
                {currentIndex === 2 && "Professional design tools and platforms for creating stunning user experiences."}
                {currentIndex === 3 && "DevOps and deployment tools for efficient development workflows and infrastructure management."}
                {currentIndex === 4 && "Database technologies and ORM tools for efficient data management and storage solutions."}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {techStack[currentIndex]?.stack?.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:scale-105 border border-gray-200">
                    <img
                      src={item}
                      alt="tech stack"
                      className="w-full h-16 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeIn("up", "spring", 0.8, 1.2)}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-black to-gray-800 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Our expertise with these technologies ensures we deliver high-quality, 
              scalable solutions that meet your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn bg-white text-black hover:bg-gray-100">
                Start Your Project
              </button>
              <button className="btn border-white text-white hover:bg-white hover:text-black">
                View Our Work
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(TechStack);
