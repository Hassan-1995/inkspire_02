"use client";
import Image from "next/image";
import { useState } from "react";
import { useCheckoutStore } from "../store/checkoutStore";
import { initiateCheckout } from "@/lib/auth";

const CheckoutPage = () => {
  // const totalAmount = Number(searchParams.amount) || 0;
  const { amount } = useCheckoutStore();
  const [paymentMethod, setPaymentMethod] = useState<"Card" | "COD">("Card");

  const handleConfirm = async (pm: string) => {
    switch (pm) {
      case "Card":
        try {
          const data = await initiateCheckout(amount!);
          window.location.href = data.url;
        } catch (error: any) {
          alert(`Error: ${error.error}`);
        }
        break;

      case "COD":
        alert("Order placed with Cash on Delivery!");
        break;

      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4">
      {/* Mascot + Brand Name */}
      <div className="mb-8 flex flex-col items-center relative">
        {/* Mascot with halo */}
        <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-xl animate-pulse">
          <Image
            src="/mascots/mascot_paintBrush.png"
            alt="Mascot"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 rounded-full border-4 border-transparent animate-spin border-t-purple-400 border-b-pink-400" />
        </div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mt-4">
          InkSpire
        </h1>
      </div>

      {/* Checkout Card */}
      <div className="bg-white rounded-xl shadow-2xl shadow-pink-950 max-w-md w-full p-8 space-y-8 transition-transform transform hover:scale-[1.02]">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Checkout
        </h2>

        {/* Total Amount */}
        <div className="text-center">
          <p className="text-gray-500">You are about to pay</p>
          <p className="text-4xl text-purple-800 mt-2">
            Rs{" "}
            <span className="font-extrabold">{amount?.toLocaleString()}</span>
          </p>
        </div>

        {/* Payment Method Selection */}
        <div className="space-y-4">
          <p className="text-center text-sm text-gray-600">
            Select Payment Method
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setPaymentMethod("Card")}
              className={`cursor-pointer px-5 py-2 rounded-lg font-semibold transition shadow ${
                paymentMethod === "Card"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              💳 Card
            </button>
            <button
              onClick={() => setPaymentMethod("COD")}
              className={`cursor-pointer px-5 py-2 rounded-lg font-semibold transition shadow ${
                paymentMethod === "COD"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              🪙 CoD
            </button>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={() => handleConfirm(paymentMethod)}
          className={`w-full cursor-pointer flex items-center justify-center py-3 px-6 rounded-lg font-semibold transition-transform duration-200 ease-out bg-white border border-pink-600 text-pink-700 shadow-md hover:scale-105 hover:bg-pink-600 hover:text-white hover:border-pink-700 hover:shadow-xl active:scale-95 active:bg-purple-800 active:text-white`}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
