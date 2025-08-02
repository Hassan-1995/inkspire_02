import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaAnglesRight, FaArrowRight } from "react-icons/fa6";
import ImageSlider from "./ImageSlider";

const CallToActionSection = () => {
  return (
    <div className="flex flex-col justify-center items-center my-10 space-y-2 md:space-y-4">
      <div className="flex items-end gap-3">
        {/* Text Section */}
        <h1 className="text-lg md:text-3xl lg:text-4xl font-bold text-stone-900 leading-tight">
          Still Confused about How to Do it?
        </h1>

        {/* Mascot Image */}
        <div className="relative w-10 md:w-16 lg:w-20 aspect-square">
          <Image
            src="/mascots/mascot_confused.png"
            alt="Inkspire Mascot"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div className="flex">
        <p className="text-sm md:text-lg lg:text-xl text-stone-600 mb-6 md:mb-10">
          Upload your
          <span className="bg-gradient-to-r from-indigo-600 via-pink-600 to-orange-600 bg-clip-text text-transparent font-semibold">
            {" "}
            image
          </span>
          ,
          <span className="bg-gradient-to-r from-indigo-600 via-pink-600 to-orange-600 bg-clip-text text-transparent font-semibold">
            {" "}
            artwork
          </span>{" "}
          or
          <span className="bg-gradient-to-r from-indigo-600 via-pink-600 to-orange-600 bg-clip-text text-transparent font-semibold">
            {" "}
            logo
          </span>{" "}
          we&apos;ll print it on.
        </p>
      </div>
      <div className="flex w-full justify-center my-3 px-5 lg:px-10">
        <div className="relative w-1/3 md:w-1/4 lg:w-1/5 aspect-square">
          <Image
            src="/sloth.jpg"
            alt="Inkspire Mascot"
            fill
            className="object-contain rounded"
          />
        </div>
        <div className="w-1/5 lg:w-1/5 h-52 md:h-96 lg:aspect-[3/4] flex justify-center items-center">
          <FaAnglesRight className="text-3xl md:text-5xl lg:text-7xl text-orange-400/50 animate-none delay-1000" />
        </div>
        <div className="relative w-2/5 md:w-1/3 lg:w-1/5 aspect-[3/4]">
          <ImageSlider />
        </div>
      </div>
      <div className="flex min-w-full px-3 justify-center mt-5">
        <Link
          href={"/"}
          className="flex items-center justify-center py-3 px-6 rounded-lg font-semibold transition-transform duration-200 ease-out hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl bg-pink-600 hover:bg-purple-600 hover:text-white hover:border-purple-700 active:bg-purple-800 border border-pink-600 text-white w-3/5 md:w-1/2 lg:w-1/3 md:py-3"
          // className="flex items-center justify-center py-3 px-6 rounded-lg font-semibold transition-transform duration-200 ease-out hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl bg-purple-600 hover:bg-pink-600 hover:text-white hover:border-pink-700 active:bg-purple-800 border border-purple-600 text-white w-3/5 md:w-1/2 lg:w-1/3 md:py-3"
        >
          Start Designing
          <FaArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default CallToActionSection;
