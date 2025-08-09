import React from "react";
import Link from "next/link";
import { FaBoxOpen } from "react-icons/fa";
import Image from "next/image";

const EmptyOrder = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="relative w-[15%] aspect-square">
        <Image
          src="/mascots/mascot_confused.png"
          alt="Inkspire Mascot"
          fill
          className="object-contain"
        />
      </div>
      <FaBoxOpen className="text-purple-500 text-9xl mb-4" />
      <h1 className="text-2xl font-semibold mb-2">You have no orders</h1>
      <p className="text-gray-600 mb-4">
        It looks like you haven&apos;t placed any orders yet.
      </p>
      <Link
        href="/"
        className="text-white font-semibold bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors py-2 px-3.5"
      >
        Start Shopping
      </Link>
    </div>
  );
};

export default EmptyOrder;
