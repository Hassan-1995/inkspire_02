"use client";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/app/store/slices/cartSlice";
import { RootState } from "@/app/store/store";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "./EmptyCart";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { checkUserDeliveryInfo } from "@/lib/auth";
import { useCheckoutStore } from "../store/checkoutStore";

const CartItem = () => {
  const dispatch = useDispatch();
  const { status, data: session } = useSession();
  const router = useRouter();

  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const getTotalPrice = () =>
    cartItems.reduce(
      (total, item) => total + item.productPrice * item.quantity,
      0
    );

  const handleCheckOut = async () => {
    setLoading(true);
    try {
      if (status !== "authenticated") {
        setWarning(true);
        window.alert("You need to log in before continuing.");

        router.push("/login");
        return;
      }

      setWarning(false);

      const hasDeliveryInfo = await fetchUserAddress();
      if (!hasDeliveryInfo) {
        alert("Please complete your delivery information before checking out.");
        router.push("/delivery-information");
        return;
      }
      useCheckoutStore.getState().setAmount(getTotalPrice());
      router.push("/check-out");
      // router.push(`/check-out?amount=${getTotalPrice()}`);
      // tempporary solution
      // try {
      //   const res = await fetch("/api/checkout", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ amount: getTotalPrice() }),
      //   });

      //   if (!res.ok) {
      //     const error = await res.json();
      //     console.error("Stripe Error:", error);
      //     alert(`Error: ${error.error}`);
      //     return;
      //   }

      //   const data = await res.json();
      //   window.location.href = data.url;
      // } catch (err) {
      //   console.error("Unexpected error:", err);
      //   alert("Something went wrong");
      // }
    } finally {
      setLoading(false);
    }
  };

  const fetchUserAddress = async () => {
    try {
      const token = session?.user.accessToken;
      if (!token) {
        console.error("No access token found.");
        return false;
      }

      const hasInfo = await checkUserDeliveryInfo(token);
      return hasInfo;
    } catch (error) {
      console.error("Error fetching user info:", error);
      return false;
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-4">
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <div className="mb-10">
            <Header title="Your Cart" />
          </div>
          {cartItems.map((item) => (
            <div
              key={item.productID}
              className="flex w-full h-auto border-b border-zinc-300 pb-4 mb-4"
            >
              {/* Left: Images */}
              <div className="relative w-1/3 h-full">
                <div className="grid grid-cols-2 auto-rows-fr gap-2 w-full h-full">
                  {/* Front View */}
                  <div className="relative w-full aspect-square">
                    <Image
                      src={item.productFrontPath}
                      alt="Front View"
                      fill
                      className="object-contain rounded border border-zinc-300 shadow-sm"
                    />
                  </div>

                  {/* Front Design (conditional) */}
                  {item.uploadedImagePrimary && (
                    <div className="relative w-full aspect-square flex justify-center items-center">
                      <Image
                        src={item.uploadedImagePrimary}
                        alt="Front Design"
                        fill
                        className="object-contain rounded border border-zinc-300 shadow-sm"
                      />
                    </div>
                  )}

                  {/* Back View (conditional) */}
                  {item.productBackPath && (
                    <div className="relative w-full aspect-square">
                      <Image
                        src={item.productBackPath}
                        alt="Back View"
                        fill
                        className="object-contain rounded border border-zinc-300 shadow-sm"
                      />
                    </div>
                  )}

                  {/* Back Design (conditional) */}
                  {item.uploadedImageSecondary && (
                    <div className="relative w-full aspect-square flex justify-center items-center">
                      <Image
                        src={item.uploadedImageSecondary}
                        alt="Back Design"
                        fill
                        className="object-contain rounded border border-zinc-300 shadow-sm"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Details */}
              <div className="w-2/3 pl-4 flex flex-col justify-between">
                <div>
                  <p className="font-semibold text-base">{item.productName}</p>
                  <p className="text-sm">
                    Price: Rs {item.productPrice.toLocaleString()}
                  </p>
                  <p className="text-sm">
                    Color:{" "}
                    {item.productColor.charAt(0).toUpperCase() +
                      item.productColor.slice(1)}
                  </p>
                  <p className="text-sm">Size: {item.productSize}</p>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="border w-2/3 px-2 py-1 flex justify-between items-center rounded">
                    <button
                      onClick={() =>
                        dispatch(decrementQuantity(item.productID))
                      }
                      disabled={item.quantity === 1}
                      className={`${
                        item.quantity === 1 ? "text-gray-400" : ""
                      }`}
                    >
                      <FaMinus />
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      onClick={() =>
                        dispatch(incrementQuantity(item.productID))
                      }
                    >
                      <FaPlus />
                    </button>
                  </div>

                  <button
                    className="text-red-500"
                    onClick={() => dispatch(removeFromCart(item.productID))}
                  >
                    <FaRegTrashCan />
                  </button>
                </div>

                <p className="text-sm font-semibold mt-1">
                  Total: Rs{" "}
                  {(item.productPrice * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}

          {/* Grand Total */}
          <div className="text-right font-semibold text-lg mt-4">
            Grand Total: Rs {getTotalPrice().toLocaleString()}
          </div>
          <button
            onClick={() => handleCheckOut()}
            disabled={loading}
            // className="my-2 cursor-pointer flex w-full items-center justify-center text-white font-semibold bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors py-1 px-2.5 md:py-2 md:px-3.5"
            className="cursor-pointer flex w-full text-xl my-3 items-center justify-center py-3 px-6 rounded-lg font-semibold transition transform hover:scale-105 active:scale-95 shadow-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white"
          >
            {loading ? "Please Wait" : "Proceed to Checkout"}
          </button>
          <p
            className={`my-4 text-2xl items-center ${
              warning ? "flex" : "hidden"
            }`}
          >
            ⚠️{" "}
            <span className="italic text-sm">
              Please log in to place your order.
            </span>
          </p>
          <p className="my-4 text-2xl items-center">
            🚚{" "}
            <span className="italic text-sm">
              Free delivery applies on orders above Rs 2,500 for Karachi
              addresses only.
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default CartItem;
