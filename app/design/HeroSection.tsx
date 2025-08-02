import Image from "next/image";
import { FaArrowRight, FaHeart } from "react-icons/fa6";
import { HiOutlineShare } from "react-icons/hi";
import { LuZap } from "react-icons/lu";
import { PiPaletteDuotone, PiStarFourDuotone } from "react-icons/pi";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50 py-10">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200&text=Creative+Background')] bg-cover bg-center opacity-10" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center text-white px-4 py-2 text-sm font-medium rounded-full w-max h-max">
                  <PiStarFourDuotone className="w-4 h-4 mr-2 font-extrabold" />
                  <h1>New Designs Added Daily</h1>
                </div>
              </div>

              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Unleash Your Creative Vision
              </h1>

              <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover thousands of stunning designs across every category.
                From minimalist elegance to bold statements, find the perfect
                design to bring your ideas to life on any printable product.
              </p>
            </div>

            {/* <div className="flex flex-col gap-3 sm:flex-row"> */}
            <div className="relative flex flex-col gap-4 sm:flex-row justify-center">
              <button className="cursor-pointer flex items-center justify-center py-3 px-6 rounded-lg font-semibold transition transform hover:scale-105 active:scale-95 shadow-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <PiPaletteDuotone className="mr-2 w-5 h-5" />
                Explore Designs
                <FaArrowRight className="ml-2 w-5 h-5" />
              </button>

              <button
                // href={"/"}
                className="cursor-pointer flex items-center justify-center py-3 px-6 rounded-lg font-semibold transition-transform duration-200 ease-out hover:scale-105 hover:bg-pink-600 hover:text-white hover:border-pink-700 active:scale-95 active:bg-purple-800 active:text-white shadow-md hover:shadow-xl bg-white border border-pink-600 text-pink-700"
              >
                <LuZap className="w-4 h-4 mr-2" />
                Create Custom
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/ideas.png"
                width={500}
                height={600}
                alt="Design Showcase"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating design elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg animate-ping">
              <FaHeart className="w-6 h-6 text-pink-500" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full overflow-hidden shadow-xl flex justify-center items-center">
              <div className="top-1 left-1 bg-white w-10 h-10 rounded-full flex items-center justify-center animate-none">
                <HiOutlineShare className="w-6 h-6 text-purple-500" />
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent animate-spin border-t-purple-400 border-b-pink-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
