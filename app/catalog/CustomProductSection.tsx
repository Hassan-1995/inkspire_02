import Image from "next/image";
import React from "react";

const CustomProductSection = () => {
  return (
    <div className="space-y-4 my-5">
      <div className="flex justify-center items-end gap-3">
        {/* Text Section */}
        <h1 className="text-base md:text-2xl lg:text-3xl font-bold text-stone-900 leading-tight">
          Couldn&apos;t find what you are looking for?
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
      <div className="flex justify-center items-center gap-3">
        <div className="relative w-10 md:w-16 lg:w-20 aspect-square">
          <Image
            src="/mascots/mascot_thumbsUp.png"
            alt="Inkspire Mascot"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex-col text-sm md:text-base lg:text-xl">
          <h1>
            Drop a WhatsApp Message:{" "}
            <span className="font-mono">+92-324-2886139</span>
          </h1>
          <h1>
            Send an Email: <span className="font-mono">info@sunny.com.pk</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CustomProductSection;
