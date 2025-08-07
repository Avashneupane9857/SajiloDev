import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import GettingSite from "../components/GettingSite";
import Navbar from "../components/Navbar";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { TiTick } from "react-icons/ti";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currUser, loginErr } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup";
import { motion } from "framer-motion";
import { fadeIn, slideIn } from "../utils/motion";

interface OrderItem {
  orderId: String;
  details: string;
  email: string;
  location: string;
  meeting: string;
  meetingLink: string;
  orderStatus: string;
  orderType: string;
  serviceType: string;
  orderTime: string;
  meetingTime: string;
}

const Orders = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const currentUser = useRecoilValue(currUser);
  const navigate = useNavigate();
  const setLoginError = useSetRecoilState(loginErr);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchOrderItems = async () => {
          try {
            const q = query(
              collection(db, "orders"),
              where("email", "==", currentUser?.email)
            );
            const querySnapshot = await getDocs(q);
            const ordersData: OrderItem[] = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              const orderItem: OrderItem = {
                orderId: data.orderId,
                details: data.details,
                email: data.email,
                location: data.location,
                meeting: data.meeting,
                meetingLink: data.meetingLink,
                orderStatus: data.orderStatus,
                orderType: data.orderType,
                serviceType: data.serviceType,
                orderTime: data.orderTime,
                meetingTime: data.meetingTime,
              };
              ordersData.push(orderItem);
            });
            setOrderItems(ordersData);
          } catch (error) {
            console.error("Error fetching work items:", error);
          }
        };
        fetchOrderItems();
      } else {
        navigate("/signin");
        setLoginError(true);
      }
    });
    return () => unsubscribe();
  }, [currentUser, navigate]);

  const handleCancelMeeting = async (orderId: string) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      console.log(orderRef);
      await updateDoc(orderRef, {
        meeting: "Cancelled",
        orderStatus: "Cancelled",
      });

      const updatedOrderItems = orderItems.map((order) => {
        if (order.orderId === orderId) {
          return { ...order, meeting: "Cancelled", orderStatus: "Cancelled" };
        }
        return order;
      });
      setOrderItems(updatedOrderItems);
      console.log("Meeting cancelled successfully");
    } catch (error) {
      console.error("Error cancelling meeting:", error);
    }
  };

  return (
    <>
      <Navbar
        logo=""
        bgColor="bg-black"
        textColor="text-white"
        borderColor=""
      />
      
      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-br from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeIn("up", "spring", 0.6, 1)}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Recent <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Orders</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Track your orders and stay updated with the progress of your projects.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Orders Table Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={slideIn("up", "spring", 0.6, 1.4)}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
          >
            {orderItems?.length < 1 ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h3>
                  <p className="text-gray-600">You haven't placed any orders yet. Start your first project!</p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">
                        Service Type
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">
                        Location
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">
                        Order Details
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">
                        Order Type
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">
                        Meeting
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">
                        Status
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orderItems?.map((order, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="py-4 px-6 text-gray-900 font-medium">
                          {order?.serviceType}
                        </td>
                        <td className="py-4 px-6 text-gray-700">
                          {order?.location}
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-900">
                              {order?.orderId}
                            </p>
                            <p className="text-sm text-gray-600">
                              {order?.details}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-700">
                          {order?.orderType}
                        </td>
                        <td className="py-4 px-6">
                          {order?.meeting === "Cancel" ? (
                            <Popup
                              deco="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 hover:bg-orange-200 transition-colors duration-200"
                              text="Cancel"
                              onpressed={() => {
                                order?.orderId &&
                                  handleCancelMeeting(
                                    order.orderId.slice(1).toString().trim()
                                  );
                              }}
                            >
                              Cancel
                            </Popup>
                          ) : order?.meeting === "Join" ? (
                            <button
                              onClick={() =>
                                window.open(
                                  order?.meetingLink,
                                  "_blank",
                                  "rel=noopener noreferrer"
                                )
                              }
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-200"
                            >
                              Join
                            </button>
                          ) : order?.meeting === "Cancelled" ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                              Cancelled
                            </span>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500">#orderId</span>
                              <TiTick className="w-5 h-5 bg-green-500 text-white rounded-full" />
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          {order?.orderStatus === "Confirmed" ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                              Confirmed
                            </span>
                          ) : order?.orderStatus === "Pending" ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                              Pending
                            </span>
                          ) : order?.orderStatus === "Completed" ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              Completed
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                              Cancelled
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-600">
                          {order?.meetingTime === "" ? order?.orderTime : order?.meetingTime}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <GettingSite />
      <Footer />
    </>
  );
};

export default Orders;
