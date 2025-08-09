"use client";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

type CartItem = {
  productID: string;
  productName: string;
  productPrice: number;
  productColor: string;
  productSize: string;
  quantity: number;
  primaryImageSize?: string;
  secondaryImageSize?: string;
  productFrontPath?: string;
  productBackPath?: string;
};

const SuccessPaymentPage = () => {
  const { status, data: session } = useSession();

  const hasRun = useRef(false);
  const handleOrder = async () => {
    try {
      // ✅ 1️⃣ Fetch userId from your API route
      const res = await fetch("/api/user");
      if (!res.ok) {
        throw new Error(`Failed to fetch user ID: ${res.statusText}`);
      }

      const data = await res.json();
      const userId = data.userId;

      console.log("✅ Retrieved userId:", userId);

      // ✅ 2️⃣ Use userId to prepare order data
      const cartDataString = localStorage.getItem("cartData");
      if (!cartDataString) {
        console.error("No cart data found in localStorage.");
        return;
      }

      const cartItems: CartItem[] = JSON.parse(cartDataString);

      const formatedCartItems = cartItems.map((c, idx) => ({
        ...c,
        orderID: `${idx}_${userId}_${c.productName}`,
        userID: userId, // ✅ using Prisma userId instead of email
      }));

      console.log("📦 Formatted Order Data: ", formatedCartItems);

      // ✅ 3️⃣ Post the formatted orders to your order API
      const postRes = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formatedCartItems),
      });

      if (!postRes.ok) {
        throw new Error(`Error posting orders: ${postRes.statusText}`);
      }

      const result = await postRes.json();
      console.log("✅ Orders successfully posted:", result);

      // Optionally clear the cart
      localStorage.removeItem("cartData");
    } catch (error) {
      console.error("❌ handleOrder error:", error);
    }
  };

  useEffect(() => {
    if (!hasRun.current && status === "authenticated" && session?.user) {
      hasRun.current = true; // mark as run before calling to prevent race re-calls
      handleOrder();
    }
  }, [status, session]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-orange-50 to-emerald-50 px-5">
      <div className="w-[30%] md:w-[20%] aspect-square relative mb-2">
        <Image
          src={"/mascots/mascot_paintBrush.png"}
          alt="success"
          fill
          className="object-contain"
        />
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
        <svg
          className="w-16 h-16 text-green-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h1 className="text-2xl text-center font-bold text-green-600 mb-2">
          Order has been placed successfully!
        </h1>
        <p className="text-pink-700 mb-4 text-center">
          Thank you for your purchase.
        </p>
        <Link
          className="px-6 py-2 font-semibold bg-gradient-to-r from-green-700 to-green-900 text-white rounded hover:bg-green-600 transition"
          href={"/"}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPaymentPage;
