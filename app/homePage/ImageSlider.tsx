"use client"; // This ensures only this component runs on the client side

import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/imageSlider/sloth_model.png",
  "/imageSlider/sloth_bag.png",
  "/imageSlider/sloth_mug.png",
  "/imageSlider/sloth_mobile.png",
  "/imageSlider/sloth_bottle.png",
  "/imageSlider/sloth_paddle.png",
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      <Image
        src={images[currentIndex]}
        alt="Rotating Mascot"
        fill
        className="object-cover rounded-lg shadow-md"
        priority
      />
    </div>
  );
}
