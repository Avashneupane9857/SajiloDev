import React, { Dispatch, SetStateAction, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currUser, isLoggedIn, loginErr } from "../store";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface LeaveReviewProps {
  onClose: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setFormSubmitted: Dispatch<SetStateAction<boolean>>;
}

interface Review {
  review: string;
}

const LeaveReview: React.FC<LeaveReviewProps> = ({
  onClose,
  setIsOpen,
  setFormSubmitted,
}) => {
  let arr = ["", "", "", "", ""];
  const [currentRate, setCurrentRate] = useState(0);
  const [formData, setFormData] = useState<Review>({
    review: "",
  });
  const isLogIn = useRecoilValue(isLoggedIn);
  const navigate = useNavigate();
  const collectionRef = collection(db, "reviews");
  const currentUser = useRecoilValue(currUser);
  const setLoginError = useSetRecoilState(loginErr);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!isLogIn) {
      setLoginError(true);
      navigate("/signin");
    } else {
      setLoading(true);
      try {
        await addDoc(collectionRef, {
          rating: currentRate,
          review: formData.review,
          name: currentUser?.name,
          time: new Date().toLocaleString(),
          img: "",
        });

        setFormSubmitted(true);
        setLoading(false);
        setIsOpen(false);
        setTimeout(() => {
          setFormSubmitted(false);
        }, 3000);

        setFormData({
          review: "",
        });
        setCurrentRate(0);
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Failed to add data. Please try again.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-lg p-4 sm:p-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Share Your Experience</h2>
          <p className="text-gray-600 text-sm sm:text-base">Help others by leaving a review about your experience with SajiloDev</p>
        </div>
        <div className="space-y-4 sm:space-y-6">
          {/* Rating Section */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
              Rate your experience
            </label>
            <div className="flex gap-1 sm:gap-2 justify-center">
              {arr.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentRate(i + 1)}
                  className="p-1 sm:p-2 hover:scale-110"
                >
                  {i < currentRate ? (
                    <FaStar className="text-2xl sm:text-3xl text-yellow-400" />
                  ) : (
                    <FaRegStar className="text-2xl sm:text-3xl text-gray-300 hover:text-yellow-400" />
                  )}
                </button>
              ))}
            </div>
            {currentRate > 0 && (
              <p className="text-center text-xs sm:text-sm text-gray-500 mt-1">
                {currentRate === 1 && "Poor"}
                {currentRate === 2 && "Fair"}
                {currentRate === 3 && "Good"}
                {currentRate === 4 && "Very Good"}
                {currentRate === 5 && "Excellent"}
              </p>
            )}
          </div>
          {/* Review Text */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
              Your Review
            </label>
            <textarea
              className="input resize-none w-full text-xs sm:text-base"
              rows={4}
              value={formData.review}
              onChange={(e) =>
                setFormData({ ...formData, review: e.target.value })
              }
              placeholder="Tell us about your experience with our services..."
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.review.length}/500 characters
            </p>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
            <button
              type="button"
              className="btn btn-secondary flex-1 text-xs sm:text-base"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={currentRate === 0 || formData.review.trim() === "" || loading}
              className="btn btn-primary flex-1 text-xs sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </div>
              ) : (
                "Submit Review"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveReview;
