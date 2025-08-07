import { useEffect, useState } from "react";
import { def } from "../assets";
import { reviewItems } from "../constants";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";
import LeaveReview from "./LeaveReview";
import { FaStar } from "react-icons/fa6";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
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
    <div className="py-10 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black mb-2 sm:mb-4">
            What Our <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">Clients Say</span>
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience.
          </p>
        </div>
        {/* Rating Summary */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-12 bg-white rounded-2xl p-4 sm:p-8 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-4 sm:mb-0">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {arr.map((_, i) => {
                  return i + 1 <= totalReview ? (
                    <FaStar
                      key={i}
                      className="text-yellow-400 text-lg sm:text-xl"
                    />
                  ) : (
                    <FaStar key={i} className="text-gray-300 text-lg sm:text-xl" />
                  );
                })}
              </div>
              <span className="text-lg sm:text-2xl font-bold text-black ml-2">
                {(totalReview / totalReviewItems.length).toPrecision(2)}
              </span>
            </div>
            <p className="text-gray-600 font-medium text-xs sm:text-base">
              Average Rating from {totalReviewItems.length} Reviews
            </p>
          </div>
          <button
            className="btn btn-primary text-xs sm:text-base px-4 py-2 sm:px-6 sm:py-3"
            onClick={() => setReviewOpen(true)}
          >
            Leave a Review
          </button>
        </div>
        {/* Success Message */}
        {formSubmitted && (
          <div className="w-full text-center py-2 sm:py-4 bg-green-50 border border-green-200 rounded-xl mb-4 sm:mb-8">
            <p className="text-green-600 font-semibold text-sm sm:text-base">
              Thank you for your review! 🎉
            </p>
          </div>
        )}
        {/* Reviews Carousel */}
        <div className="relative">
          <div className="flex items-center justify-between">
            <button
              onClick={handleLeftButtonClick}
              className={`p-2 sm:p-3 rounded-full bg-white shadow-lg hover:shadow-xl ${isReviewOpen ? "hidden" : ""}`}
            >
              <IoMdArrowDropleft className="text-2xl sm:text-3xl text-gray-600 hover:text-black" />
            </button>
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex gap-4 sm:grid sm:grid-cols-3 sm:gap-8 mx-2 sm:mx-8 min-w-[260px]">
                {currentReviews?.slice(0, window.innerWidth > 640 ? 3 : 1)?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="card group min-w-[260px] max-w-xs sm:max-w-none"
                  >
                    <div className="p-4 sm:p-6">
                      {/* User Info */}
                      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <img
                          src={item?.img || def}
                          alt="user"
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-200"
                        />
                        <div>
                          <h3 className="font-semibold text-black text-sm sm:text-base">{item?.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-500">{item?.time}</p>
                        </div>
                      </div>
                      {/* Rating */}
                      <div className="flex gap-1 mb-2 sm:mb-4">
                        {arr.map((_, i) => {
                          return i + 1 <= item?.rating ? (
                            <FaStar
                              key={i}
                              className="text-yellow-400 text-sm sm:text-base"
                            />
                          ) : (
                            <FaStar key={i} className="text-gray-300 text-sm sm:text-base" />
                          );
                        })}
                      </div>
                      {/* Review Text */}
                      <p className="text-gray-600 leading-relaxed line-clamp-4 text-xs sm:text-base">
                        {item?.review}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handleRightButtonClick}
              className={`p-2 sm:p-3 rounded-full bg-white shadow-lg hover:shadow-xl ${isReviewOpen ? "hidden" : ""}`}
            >
              <IoMdArrowDropright className="text-2xl sm:text-3xl text-gray-600 hover:text-black" />
            </button>
          </div>
        </div>
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
