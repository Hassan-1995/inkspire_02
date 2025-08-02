import Image from "next/image";
import React from "react";
import { FaCheck } from "react-icons/fa6";

const MainSection = () => {
  const qualities = [
    { label: "High-quality, long-lasting fabric material" },
    { label: "Vibrant, long-lasting print clarity" },
    { label: "No peeling, cracking or fading" },
    { label: "Soft-touch fabric for all-day comfort" },
    { label: "Perfect for logos, art, and text" },
  ];

  return (
    <div className="flex flex-col lg:flex-row px-6 md:px-10 py-10 gap-10">
      {/* Left Content */}
      <div className="w-full lg:w-2/3">
        {/* Heading */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-4 md:mb-6 leading-tight">
          Design It. Wear It. Share It.
        </h1>

        {/* Description */}
        <p className="text-sm md:text-lg lg:text-xl text-stone-600 mb-6 md:mb-10">
          Upload your image, artwork or logo, and we&apos;ll print it on
          high-quality apparel — crafted to match your unique style, purpose and
          personality.
        </p>

        {/* Mascot + Features + (Model image on md) */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          {/* Mascot Image */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-44 lg:h-44">
            <Image
              src="/mascots/mascot_leftIndex.png"
              alt="Inkspire Mascot"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Feature List */}
          <ul className="flex-1 space-y-2">
            {qualities.map((quality) => (
              <li key={quality.label} className="flex gap-2 items-center">
                <FaCheck className="text-green-500" />
                <p className="text-sm md:text-base lg:text-lg text-stone-600">
                  {quality.label}
                </p>
              </li>
            ))}
          </ul>

          {/* Model image on medium screens (hidden on sm, shown on md) */}
          <div className="hidden md:block lg:hidden w-1/4 relative aspect-[3/4]">
            <Image
              src="/model_wearing_mascot.png"
              alt="Model Wearing T-shirt"
              fill
              className="object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Model Image on lg screens (hidden on md and sm) */}
      <div className="hidden lg:block w-full lg:w-1/4 relative aspect-[3/4]">
        <Image
          src="/model_wearing_mascot.png"
          alt="Model Wearing T-shirt"
          fill
          className="object-cover rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default MainSection;
