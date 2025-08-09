import React from "react";
// import CartItem from "./CartItem";
import Image from "next/image";
import OrderItem from "./OrderItem";

const OrderPage = () => {
  return (
    <div>
      <section className=" text-white py-5 text-center">
        <div className="flex justify-center items-end">
          <h1 className="text-4xl md:text-5xl  font-semibold bg-gradient-to-r from-indigo-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            InkSpire
          </h1>
          <Image
            src="/mascots/mascot_waving.png"
            alt="Inkspire Mascot"
            width={100}
            height={100}
          />
        </div>
        <p className="text-lg md:text-2xl text-pink-600">
          Almost there, let&apos;s complete your order.
        </p>
      </section>
      <OrderItem />
      {/* <CartItem /> */}
    </div>
  );
};

export default OrderPage;
