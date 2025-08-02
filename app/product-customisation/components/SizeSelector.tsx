"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSize } from "@/app/store/slices/productSlice";

const SizeSelector = () => {
  const sizes = ["S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedSize = localStorage.getItem("shirtSize");
    if (savedSize) {
      setSelectedSize(savedSize);
      dispatch(setSize(savedSize));
    }
  }, [dispatch]);

  const handleClick = (size: string) => {
    setSelectedSize(size);
    localStorage.setItem("shirtSize", size); // fixed key name
    dispatch(setSize(size));
  };

  return (
    <>
      <p className="text-gray-500 mb-1 text-xs">SIZES</p>
      <div className="flex gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => handleClick(size)}
            className={`px-6 py-2 border font-bold rounded-full transition-colors ${
              selectedSize === size
                ? "bg-purple-900 text-white"
                : "bg-white text-purple-900"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </>
  );
};

export default SizeSelector;
