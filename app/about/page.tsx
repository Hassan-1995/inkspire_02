import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  LuCoffee,
  LuHeart,
  LuPalette,
  LuShirt,
  LuShoppingBag,
  LuUsers,
  LuZap,
} from "react-icons/lu";
import Header from "@/components/Header";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-orange-50 to-emerald-50">
      <section className="relative overflow-hidden py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-pink-500 to-pink-700 text-white px-4 py-2 text-sm font-medium rounded-full w-max h-max">
                    ✨ Creative Print Solutions
                  </div>
                  <Image
                    src="/mascots/mascot_waving.png"
                    alt="Inkspire Mascot"
                    width={100}
                    height={100}
                  />
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  About{" "}
                  <span className="bg-gradient-to-r from-indigo-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                    InkSpire
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  We transform your creative ideas into beautiful, high-quality
                  custom products that inspire and delight.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={"/"}
                  className="flex items-center justify-center py-3 px-6 rounded-lg font-semibold transition transform hover:scale-105 active:scale-95 shadow-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                >
                  Start Creating
                </Link>
                <Link
                  href={"/"}
                  className="flex items-center justify-center py-3 px-6 rounded-lg font-semibold transition-transform duration-200 ease-out hover:scale-105 hover:bg-pink-600 hover:text-white hover:border-pink-700 active:scale-95 active:bg-purple-800 active:text-white shadow-md hover:shadow-xl bg-white border border-pink-600 text-pink-700"
                >
                  View Products
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-3xl p-8 shadow-2xl">
                <Image
                  src="/team_working_together.jpg"
                  alt="Creative team working together"
                  width={500}
                  height={300}
                  className="rounded-2xl shadow-lg"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                <div className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 md:px-6 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-pink-800">
              Our Creative Journey
            </h2>
            <p className="text-xl text-purple-600 leading-relaxed">
              Founded with a passion for creativity and quality, InkSpire began
              as a small dream to make custom printing accessible to everyone.
              Today, we&apos;re proud to help thousands of creators, businesses,
              and individuals bring their visions to life through our premium
              print-on-demand services.
            </p>
          </div>
        </div>
      </section>

      <section className=" pt-10 pb-20 px-4 md:px-6 bg-gradient-to-br from-blue-50 via-blue-100 to-emerald-100">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Header title="What We Create" />
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From apparel to accessories, we bring your designs to life on
              premium products
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group hover:shadow-2xl bg-white/30 transition-all duration-300 border-0 shadow-lg rounded-3xl overflow-hidden">
              <div className="p-8 text-center space-y-6">
                <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <LuShirt className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Apparel</h3>
                <p className="text-gray-600">
                  Premium t-shirts, hoodies, and clothing with your custom
                  designs
                </p>
                <div className="bg-gray-100 rounded-2xl p-4">
                  <div className="w-[250px] h-[200px] mx-auto rounded-xl overflow-hidden">
                    <Image
                      src="/imageSlider/sloth_model.png"
                      alt="Custom apparel"
                      width={250}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="group hover:shadow-2xl bg-white/30 transition-all duration-300 border-0 shadow-lg rounded-3xl overflow-hidden">
              <div className="p-8 text-center space-y-6">
                <div className="bg-indigo-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <LuShoppingBag className="w-10 h-10 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Bags & Accessories
                </h3>
                <p className="text-gray-600">
                  Stylish tote bags, backpacks, and accessories for everyday use
                </p>
                <div className="bg-gray-100 rounded-2xl p-4">
                  <div className="w-[250px] h-[200px] mx-auto rounded-xl overflow-hidden relative">
                    <Image
                      src="/imageSlider/sloth_bag.png"
                      alt="Custom bags"
                      fill
                      className="rounded-xl mx-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="group hover:shadow-2xl bg-white/30 transition-all duration-300 border-0 shadow-lg rounded-3xl overflow-hidden">
              <div className="p-8 text-center space-y-6">
                <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <LuCoffee className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Drinkware</h3>
                <p className="text-gray-600">
                  Custom mugs, water bottles, and tumblers for your daily
                  hydration
                </p>
                <div className="bg-gray-100 rounded-2xl p-4">
                  <div className="w-[250px] h-[200px] mx-auto rounded-xl overflow-hidden relative">
                    <Image
                      src="/imageSlider/sloth_bottle.png"
                      alt="Custom drinkware"
                      //   width={250}
                      //   height={200}
                      fill
                      className="rounded-xl mx-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 md:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-800 mb-6">
              Why Choose InkSpire?
            </h2>
            <p className="text-xl text-pink-600 max-w-2xl mx-auto">
              We&apos;re committed to delivering exceptional quality and service
              in everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4 group">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <LuPalette className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Creative Freedom
              </h3>
              <p className="text-gray-600">
                Unlimited design possibilities with just drag-n-drop
              </p>
            </div>

            <div className="text-center space-y-4 group">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <LuHeart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                High-quality materials and printing for lasting results
              </p>
            </div>

            <div className="text-center space-y-4 group">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <LuZap className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick turnaround times without compromising quality
              </p>
            </div>

            <div className="text-center space-y-4 group">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <LuUsers className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Expert Support
              </h3>
              <p className="text-gray-600">
                Dedicated customer service team ready to help
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
