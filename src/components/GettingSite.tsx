import { useNavigate } from "react-router-dom";
import { getSite1, getSite2 } from "../assets";
import { motion } from "framer-motion";
import { slideIn, fadeIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
const GettingSite = () => {
  const navigate = useNavigate();
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            variants={slideIn("left", "spring", 0.6, 1.4)}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}            
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-black">
                From Your Imagination to <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">Reality</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Let's craft your digital domain together. We transform your ideas into stunning, 
                functional websites that drive results and exceed expectations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <span className="text-gray-700 font-medium">Custom Design & Development</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <span className="text-gray-700 font-medium">Responsive & Mobile-First</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <span className="text-gray-700 font-medium">SEO Optimized</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <span className="text-gray-700 font-medium">24/7 Support</span>
                </div>
              </div>

              <button
                className="btn btn-primary text-lg px-8 py-4 bg-black text-white hover:bg-gray-800"
                onClick={() => navigate("/afterservice/1")}
              >
                Get Your Own Site
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column - Images */}
          <motion.div
            variants={slideIn("right", "spring", 0.6, 1.4)}
            className="relative"
          >
            <div className="relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white rounded-3xl"></div>
              
              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="relative z-10"
              >
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
                  <img
                    src={getSite1}
                    alt="Website Design Preview"
                    className="w-full h-auto object-contain rounded-xl"
                  />
                </div>
              </motion.div>

              {/* Floating Image */}
              <motion.div
                initial={{ opacity: 0, x: 50, y: 50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-8 -right-8 z-20"
              >
                <div className="bg-white rounded-2xl p-4 shadow-2xl border border-gray-200">
                  <img
                    src={getSite2}
                    alt="Mobile Design Preview"
                    className="w-32 h-auto object-contain rounded-xl"
                  />
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-4 left-4 w-16 h-16 bg-black/10 rounded-full blur-xl"
              />
              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-4 right-4 w-12 h-12 bg-gray-400/20 rounded-full blur-xl"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeIn("up", "spring", 0.8, 1.2)}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-black to-gray-800 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who have transformed their digital presence with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="btn bg-white text-black hover:bg-gray-100"
                onClick={() => navigate("/contactus")}
              >
                Get Free Quote
              </button>
              <button
                className="btn btn-outline border-white text-white hover:bg-white hover:text-black"
                onClick={() => navigate("/afterservice/0")}
              >
                View Our Services
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(GettingSite);
