"use client";
import { useDispatch } from "react-redux";
import { useState } from "react";
import SingleImageUploader from "@/components/SingleImageUploader";
import {
  setPrimaryImage,
  setSecondaryImage,
} from "@/app/store/slices/uploadedImageSlice";

const ImageUploaderTwo = () => {
  const dispatch = useDispatch();

  const [frontKey] = useState("uploadedImageFront");
  const [backKey] = useState("uploadedImageBack");

  const handleDeleteFront = () => {
    localStorage.removeItem(frontKey);
    dispatch(setPrimaryImage(null)); // clear Redux
    window.location.reload();
  };

  const handleDeleteBack = () => {
    localStorage.removeItem(backKey);
    dispatch(setSecondaryImage(null)); // clear Redux
    window.location.reload();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col gap-2">
        <div className="aspect-[6/7] w-full bg-pink-700/20 hover:bg-purple-900/20 sm:mx-2 md:mx-0">
          <SingleImageUploader
            localStorageKey={frontKey}
            onUpload={(url) => dispatch(setPrimaryImage(url))}
            label="Front Design"
          />
        </div>
        <button
          onClick={handleDeleteFront}
          className="cursor-pointer text-sm bg-red-500 text-white py-1 rounded hover:bg-red-600 transition-colors"
        >
          Delete Front Image
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <div className="aspect-[6/7] w-full bg-pink-800/20 hover:bg-purple-900/20">
          <SingleImageUploader
            localStorageKey={backKey}
            onUpload={(url) => dispatch(setSecondaryImage(url))}
            label="Back Design"
          />
        </div>
        <button
          onClick={handleDeleteBack}
          className="cursor-pointer text-sm bg-red-500 text-white py-1 rounded hover:bg-red-600 transition-colors"
        >
          Delete Back Image
        </button>
      </div>
    </div>
  );
};

export default ImageUploaderTwo;
