import { useState } from "react";
import { workItems } from "../constants";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { useNavigate } from "react-router-dom";
import SectionWrapper from "../hoc/SectionWrapper";

interface Work {
  img: string;
  title: string;
  link: string;
}

const Hero = () => {
  const navigate = useNavigate();
  const [hovering, setHovering] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full py-20">
          {/* Left Column - Text Content */}
          <motion.div
            variants={fadeIn("left", "spring", 0.5, 1)}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium"
            >
              <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
              Professional Web Development Agency
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                <span className="block">You Dream It,</span>
                <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  We Build It.
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                Transform your ideas into stunning digital experiences. We specialize in creating modern, 
                responsive websites that drive results for your business.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                className="btn btn-primary text-lg px-8 py-4 bg-white text-black hover:bg-gray-100"
                onClick={() => navigate("/afterservice/1")}
              >
                Start Your Project
              </button>
              <button
                className="btn btn-outline text-lg px-8 py-4 bg-white/5 border-2 border-white/50 text-white hover:bg-white hover:text-black transition-all duration-300"
                onClick={() => navigate("/contactus")}
              >
                Get Free Quote
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex items-center space-x-8 pt-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-sm text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-sm text-gray-400">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-400">Support Available</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Portfolio Showcase */}
          <motion.div
            variants={fadeIn("right", "spring", 0.5, 1.2)}
            className="relative"
          >
            <div
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className="relative"
            >
              {/* Portfolio Grid */}
              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                {workItems?.slice(0, 4).map((work: Work, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 * i, duration: 0.6 }}
                    className="group cursor-pointer"
                    onClick={() =>
                      window.open(work?.link, "_blank", "rel=noopener noreferrer")
                    }
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl w-full h-48 border border-white/10">
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        src={work?.img}
                        alt={work?.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="font-semibold text-sm">{work?.title}</h3>
                          <p className="text-xs text-gray-300">View Project</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

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
                className="absolute -top-4 -right-4 w-20 h-20 bg-white/20 rounded-full blur-xl pointer-events-none"
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
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-gray-400/20 rounded-full blur-xl pointer-events-none"
              />
            </div>

            {/* Hover Text */}
            {hovering && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="glass rounded-2xl px-6 py-4 text-white text-center">
                  <h3 className="text-xl font-bold mb-2">Our Portfolio</h3>
                  <p className="text-sm text-gray-300">Click to explore our latest work</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-white/60">
          <span className="text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Hero);
