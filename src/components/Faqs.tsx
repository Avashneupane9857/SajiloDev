import { useState } from "react";
import { motion } from "framer-motion";
import { slideIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { faqs } from "../constants";
import { IoMdArrowDown } from "react-icons/io";

const FAQs = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - FAQs */}
          <motion.div
            variants={slideIn("left", "spring", 0.6, 1.4)}
            className="space-y-8"
          >
            {/* Section Header */}
            <motion.div
              variants={textVariant(0.2)}
              className="space-y-4"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Frequently Asked <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Questions</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl">
                Find answers to common questions about our services and processes.
              </p>
            </motion.div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden"
                >
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors duration-300"
                    onClick={() => toggleAnswer(index)}
                  >
                    <h3 className="text-lg font-semibold text-white pr-4">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <IoMdArrowDown className="text-2xl text-white" />
                    </motion.div>
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedIndex === index ? "auto" : 0,
                      opacity: expandedIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <motion.div
              variants={slideIn("up", "spring", 0.8, 1.2)}
              className="bg-gradient-to-r from-gray-800 to-black rounded-2xl p-6 text-white border border-gray-700"
            >
              <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
              <p className="text-gray-300 mb-4">
                Can't find what you're looking for? We're here to help!
              </p>
              <button className="btn bg-white text-black hover:bg-gray-100">
                Contact Us
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Element */}
          <motion.div
            variants={slideIn("right", "spring", 0.6, 1.4)}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-black/20 rounded-3xl"></div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
              />
              <motion.div
                animate={{ 
                  y: [0, 20, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-10 right-10 w-16 h-16 bg-gray-400/10 rounded-full blur-xl"
              />
              
              {/* Main Content */}
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-12 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Need Help?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Our team is always ready to answer your questions and provide the support you need for your project.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(FAQs);
