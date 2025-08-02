// import { Badge } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaCircle } from "react-icons/fa6";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-indigo-50 via-orange-50 to-emerald-50 w-full min-h-screen py-10 md:py-20 lg:py-32 overflow-hidden">
      {/*Floating Element*/}
      <div className="absolute top-20 left-10">
        <FaCircle className="text-9xl text-orange-300/50 animate-pulse " />
      </div>
      <div className="absolute bottom-20 right-10">
        <FaCircle className="text-7xl text-emerald-400/20 animate-pulse delay-1000" />
      </div>
      <div className="absolute top-1/2 left-1/4">
        <FaCircle className="text-5xl text-purple-400/20 animate-pulse delay-500" />
      </div>

      <div className="hidden lg:block absolute h-100 w-100 right-1">
        <Image
          src="/mascots/mascot_waving.png"
          alt="Inkspire Mascot"
          fill
          className="object-contain"
        />
      </div>
      <div className="relative mb-5 flex min-w-full justify-center items-center lg:hidden h-52 w-52 md:h-72 md:w-72 ">
        <Image
          src="/mascots/mascot_thumbsUp.png"
          alt="Inkspire Mascot"
          fill
          className="object-contain"
        />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="px-5">
          <h1 className="text-5xl md:text-7xl font-bold text-stone-900 mb-6 leading-tight">
            Wear Your
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              {" "}
              Imagination
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 mb-10 max-w-2xl mx-auto">
            Create custom apparel that speaks your language. Design, print and
            wear your unique style with
            <span className="font-semibold bg-gradient-to-r from-indigo-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              {" "}
              InkSpire
            </span>
            .
          </p>
        </div>

        <div className="relative flex flex-col sm:flex-row justify-center">
          <div className="md:flex items-center md:space-x-4 space-y-4 md:space-y-0 px-5">
            <Link
              href={"/"}
              className="flex items-center justify-center py-3 px-6 rounded-lg font-semibold transition transform hover:scale-105 active:scale-95 shadow-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white"
            >
              Start Designing
              <FaArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href={"/"}
              className="flex items-center justify-center py-3 px-6 rounded-lg font-semibold transition-transform duration-200 ease-out hover:scale-105 hover:bg-pink-600 hover:text-white hover:border-pink-700 active:scale-95 active:bg-purple-800 active:text-white shadow-md hover:shadow-xl bg-white border border-pink-600 text-pink-700"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
