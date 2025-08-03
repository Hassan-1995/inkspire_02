import Image from "next/image";
import Link from "next/link";
import React from "react";

const FailedPaymentPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-gray-50 px-5">
      <div className="w-[30%] md:w-[20%] aspect-square relative mb-2">
        <Image
          src={"/mascots/mascot_confused.png"}
          alt="failure"
          fill
          className="object-contain"
        />
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
        <svg
          className="w-16 h-16 text-red-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <h1 className="text-2xl font-bold text-red-600 mb-2">Payment Failed</h1>
        <p className="text-pink-700 mb-4 text-center">
          Unfortunately, your payment could not be processed. Please check your
          payment details and try again.
        </p>
        <Link
          className="px-6 py-2 font-semibold bg-gradient-to-r from-red-700 to-red-900 text-white rounded hover:bg-red-600 transition"
          href={"/cart"}
        >
          Try Again
        </Link>
      </div>
    </div>
  );
};

export default FailedPaymentPage;
