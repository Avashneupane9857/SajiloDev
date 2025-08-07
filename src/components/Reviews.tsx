import { useEffect, useState } from "react";
import { def } from "../assets";
import { reviewItems } from "../constants";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";
import LeaveReview from "./LeaveReview";
import { FaStar } from "react-icons/fa6";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const Reviews = () => {
  const [isReviewOpen, setReviewOpen] = useState(false);
  const [totalReviewItems, setTotalReviewItems] = useState(reviewItems);
  const [currentReviews, setCurrentReviews] = useState<any>(
    totalReviewItems.slice(0, 3)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  let arr = ["", "", "", "", ""];
  const [totalReview, setTotalReview] = useState(5 * reviewItems.length);

  useEffect(() => {
    const readingReviews = async () => {
      try {
        const q = query(collection(db, "reviews"));
        const querySnapshot = await getDocs(q);
        const newReviews: any[] = [];
        let newTotalReview = totalReview;

        querySnapshot.forEach((doc) => {
          const reviewData = doc.data();
          const review = {
            name: reviewData.name,
            img: reviewData.img,
            review: reviewData.review,
            rating: reviewData.rating,
            time: reviewData.time,
          };
          newReviews.push(review);
        });

        const newOne = totalReviewItems;
        newReviews.forEach((n) => {
          const s = newOne?.filter((a) => n?.name === a?.name);
          if (s.length > 0) {
          } else {
            newTotalReview = newTotalReview + n?.rating;
            setTotalReview(newTotalReview);
            newOne.push(n);
          }
        });

        setTotalReviewItems(newOne);
      } catch (error) {
        console.log("Error is ", error);
      }
    };

    readingReviews();
  }, []);

  const updateCurrentReviews = () => {
    const startIndex = currentIndex;
    const endIndex = window?.innerWidth > 640 ? startIndex + 3 : startIndex + 1;
    const nextIndex = endIndex % totalReviewItems?.length;
    if (endIndex !== totalReviewItems?.length - 1 && window?.innerWidth > 640) {
      setCurrentReviews(
        totalReviewItems
          ?.slice(startIndex, endIndex)
          ?.concat(reviewItems.slice(0, nextIndex))
      );
    } else {
      setCurrentReviews(totalReviewItems?.slice(startIndex, endIndex));
    }
  };

  const handleLeftButtonClick = () => {
    setCurrentIndex((prevIndex: number) => {
      const newIndex =
        (prevIndex - 1 + totalReviewItems.length) % totalReviewItems.length;
      return newIndex;
    });
  };

  useEffect(() => {
    updateCurrentReviews();
  }, [currentIndex, window.innerWidth]);

  const handleRightButtonClick = () => {
    setCurrentIndex((prevIndex: number) => {
      const newIndex = (prevIndex + 1) % totalReviewItems?.length;
      return newIndex;
    });
  };

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={textVariant(0.2)}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            What Our <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience.
          </p>
        </motion.div>

        {/* Rating Summary */}
        <motion.div
          variants={fadeIn("up", "spring", 0.4, 0.8)}
          className="flex flex-col sm:flex-row items-center justify-between mb-12 bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6 sm:mb-0">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {arr.map((_, i) => {
                  return i + 1 <= totalReview ? (
                    <FaStar
                      key={i}
                      className="text-yellow-400 text-xl"
                    />
                  ) : (
                    <FaStar key={i} className="text-gray-300 text-xl" />
                  );
                })}
              </div>
              <span className="text-2xl font-bold text-black ml-2">
                {(totalReview / totalReviewItems.length).toPrecision(2)}
              </span>
            </div>
            <p className="text-gray-600 font-medium">
              Average Rating from {totalReviewItems.length} Reviews
            </p>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => setReviewOpen(true)}
          >
            Leave a Review
          </button>
        </motion.div>

        {/* Success Message */}
        {formSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full text-center py-4 bg-green-50 border border-green-200 rounded-xl mb-8"
          >
            <p className="text-green-600 font-semibold">
              Thank you for your review! 🎉
            </p>
          </motion.div>
        )}

        {/* Reviews Carousel */}
        <motion.div
          variants={fadeIn("up", "spring", 0.6, 1)}
          className="relative"
        >
          <div className="flex items-center justify-between">
            <button
              onClick={handleLeftButtonClick}
              className={`p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 ${
                isReviewOpen ? "hidden" : ""
              }`}
            >
              <IoMdArrowDropleft className="text-3xl text-gray-600 hover:text-black" />
            </button>

            <div className="grid md:grid-cols-3 gap-8 flex-1 mx-8">
              {currentReviews?.slice(0, 3)?.map((item: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card group"
                >
                  <div className="p-6">
                    {/* User Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={item?.img || def}
                        alt="user"
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                      />
                      <div>
                        <h3 className="font-semibold text-black">{item?.name}</h3>
                        <p className="text-sm text-gray-500">{item?.time}</p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {arr.map((_, i) => {
                        return i + 1 <= item?.rating ? (
                          <FaStar
                            key={i}
                            className="text-yellow-400"
                          />
                        ) : (
                          <FaStar key={i} className="text-gray-300" />
                        );
                      })}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-600 leading-relaxed line-clamp-4">
                      {item?.review}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              onClick={handleRightButtonClick}
              className={`p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 ${
                isReviewOpen ? "hidden" : ""
              }`}
            >
              <IoMdArrowDropright className="text-3xl text-gray-600 hover:text-black" />
            </button>
          </div>
        </motion.div>

        {/* Review Modal */}
        {isReviewOpen && (
          <LeaveReview
            setFormSubmitted={setFormSubmitted}
            onClose={() => setReviewOpen(false)}
            setIsOpen={setReviewOpen}
          />
        )}
      </div>
    </div>
  );
};

export default SectionWrapper(Reviews);
