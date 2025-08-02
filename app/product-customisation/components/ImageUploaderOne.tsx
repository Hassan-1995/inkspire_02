"use client";
import { useDispatch } from "react-redux";
import SingleImageUploader from "@/components/SingleImageUploader";
import {
  setPrimaryImage,
  setSecondaryImage,
} from "@/app/store/slices/uploadedImageSlice";

const ImageUploaderOne = () => {
  const dispatch = useDispatch();
  const handleUpload = (url: string) => {
    console.log(url);
    dispatch(setPrimaryImage(url));
    dispatch(setSecondaryImage(null));
  };
  const handleDeleteFront = () => {
    localStorage.removeItem("uploadedImageFront");
    dispatch(setPrimaryImage(null)); // clear Redux
    window.location.reload();
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full aspect-[7/4] bg-pink-700/20 hover:bg-purple-900/20 sm:mx-2 md:mx-0">
        <SingleImageUploader
          localStorageKey="uploadedImageFront"
          onUpload={(url) => handleUpload(url)}
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
  );
};

export default ImageUploaderOne;
