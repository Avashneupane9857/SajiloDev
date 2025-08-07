import { styles } from "../styles";
import Loading from "./Loading";
import { workItems } from "../constants";
import { motion } from "framer-motion";
import { fadeIn, slideIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const Works = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={textVariant(0.2)}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our latest projects and see how we've helped businesses achieve their digital goals.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workItems?.length > 0 ? (
            workItems?.map((item, index) => {
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
                  className="group cursor-pointer"
                  key={index}
                  onClick={() =>
                    window.open(item?.link, "_blank", "rel=noopener noreferrer")
                  }
                >
                  <div className="card overflow-hidden">
                    {/* Project Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={item?.img}
                        alt={item?.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <h3 className="text-xl font-bold mb-2">{item?.title}</h3>
                          <div className="flex items-center text-sm text-gray-300">
                            <span>View Project</span>
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {item?.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Web Development • UI/UX Design
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <Loading />
          )}
        </div>

        {/* CTA Section */}
        <motion.div
          variants={fadeIn("up", "spring", 0.8, 1.5)}
          className="text-center mt-16"
        >
          <div className="bg-gray-50 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Want to See More?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We have many more projects to showcase. Let's discuss how we can help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="btn btn-primary"
                onClick={() => window.open("/contactus", "_self")}
              >
                Start Your Project
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => window.open("/afterservice/0", "_self")}
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

export default SectionWrapper(Works);
