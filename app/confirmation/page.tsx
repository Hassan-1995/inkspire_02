"use client";
import { getUserContact } from "@/lib/auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LuDollarSign, LuMapPin, LuPhone, LuUser } from "react-icons/lu";
import { useCheckoutStore } from "../store/checkoutStore";

const ConfirmationPage = () => {
  const { amount } = useCheckoutStore();
  const { status, data: session } = useSession();
  const token = useMemo(() => session?.user?.accessToken, [session]);

  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUserInfo = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await getUserContact(token);
      setAddress(data?.physicalAddress ?? "");
      setContactNumber(data?.contactNumber ?? "");
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchUserInfo();
    }
  }, [status, fetchUserInfo]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-orange-50 to-emerald-50 p-4 gap-10">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Confirmation
          </h1>
          <p className="text-gray-600">
            Please review your order details before placing your order
          </p>
        </div>
      </div>
      {/*  */}
      <div className="bg-white rounded-xl shadow-2xl shadow-pink-950 max-w-lg w-full p-8 space-y-8 transition-transform transform hover:scale-[1.02]">
        <div className="flex items-center gap-2 font-bold">
          <LuDollarSign className="w-5 h-5" />
          Order Summary
        </div>
        <div>
          <div className="flex justify-between items-center text-lg">
            <span className="font-medium">Total Amount:</span>
            <span className="font-bold text-2xl text-green-600">
              {amount ? amount?.toLocaleString() : "Fetching amount..."}
            </span>
          </div>
        </div>
      </div>

      {/*  */}
      <div className="bg-white rounded-xl shadow-2xl shadow-pink-950 max-w-lg w-full p-8 space-y-8  transition-transform transform hover:scale-[1.02]">
        <div className="flex items-center gap-2 font-bold">
          <LuUser className="w-5 h-5" />
          Customer Information
        </div>
        <div className="flex items-start gap-3">
          <LuUser className="w-5 h-5 text-gray-500 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700">Name</p>
            {loading ? (
              <p className="text-gray-900 animate-pulse">Loading...</p>
            ) : session?.user.name ? (
              <p className="text-gray-900">{session.user.name}</p>
            ) : (
              <p className="text-gray-500 italic">Not provided</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-3">
          <LuMapPin className="w-5 h-5 text-gray-500 mt-0.5" />
          <div className="flex-1">
            <div className="flex flex-row justify-between">
              <p className="text-sm font-medium text-gray-700">
                Delivery Address
              </p>
              <Link
                href={"/delivery-information"}
                className="cursor-pointer text-sm font-medium text-gray-700 hover:text-pink-700"
              >
                Change
              </Link>
            </div>
            {loading ? (
              <div className="space-y-2">
                <p className="text-gray-900 animate-pulse">Loading...</p>
              </div>
            ) : address ? (
              <p className="text-gray-900">{address}</p>
            ) : (
              <p className="text-gray-500 italic">Address not available</p>
            )}
          </div>
        </div>

        {/* Contact Number */}
        <div className="flex items-start gap-3">
          <LuPhone className="w-5 h-5 text-gray-500 mt-0.5" />
          <div className="flex-1">
            <div className="flex flex-row justify-between">
              <p className="text-sm font-medium text-gray-700">
                Contact Number
              </p>
              <Link
                href={"/delivery-information"}
                // onProgress={() => router.push("/delivery-information")}
                className="cursor-pointer text-sm font-medium text-gray-700 hover:text-pink-700"
              >
                Change
              </Link>
            </div>
            {loading ? (
              <p className="text-gray-900 animate-pulse">Loading...</p>
            ) : contactNumber ? (
              <p className="text-gray-900">{contactNumber}</p>
            ) : (
              <p className="text-gray-500 italic">
                Contact number not available
              </p>
            )}
          </div>
        </div>
      </div>
      <Link
        href={"/check-out"}
        //   onClick={() => handleConfirm(paymentMethod)}
        className={`max-w-lg w-full cursor-pointer flex items-center justify-center py-3 px-6 rounded-lg font-semibold transition-transform duration-200 ease-out bg-white border border-pink-600 text-pink-700 shadow-md hover:scale-105 hover:bg-pink-600 hover:text-white hover:border-pink-700 hover:shadow-xl active:scale-95 active:bg-purple-800 active:text-white`}
      >
        Confirm Details
      </Link>
    </div>
  );
};

export default ConfirmationPage;
