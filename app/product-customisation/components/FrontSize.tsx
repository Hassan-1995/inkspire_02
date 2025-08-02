import { setUploadedImagePrimarySize } from "@/app/store/slices/productSlice";
import { RootState } from "@/app/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const designSizes = [
  { name: "S", value: "Small" },
  { name: "M", value: "Medium" },
  { name: "L", value: "Large" },
];


const FrontSize = () => {
  const dispatch = useDispatch();

  const selectedImageSizePrimary = useSelector(
    (state: RootState) => state.product.uploadedImageSizePrimary
  );
  const handleSize = (size: string) => {
    
    dispatch(setUploadedImagePrimarySize(size));
  };

  return (
    <>
      <p className="text-gray-500 mb-1 text-xs">IMAGE SIZE</p>
      <div className="flex gap-2">
        {designSizes.map((size) => (
          <button
            key={size.name}
            onClick={() => handleSize(size.name)}
            className={`cursor-pointer px-6 py-2 border font-bold rounded-full transition-colors ${
              selectedImageSizePrimary === size.name
                ? "bg-purple-900 text-white"
                : "bg-white text-purple-900"
            }`}
          >
            {size.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default FrontSize;
