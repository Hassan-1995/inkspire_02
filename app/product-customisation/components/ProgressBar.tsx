"use client";
import { setProgressBarValue } from "@/app/store/slices/progressBarSlice";
import { RootState } from "@/app/store/store";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

const ProgressBar = () => {
  const dispatch = useDispatch();
  const progress = useSelector(
    (state: RootState) => state.progressBar.progressBarValue
  );
  const progressBar = [
    {
      id: 1,
      image: "/mascots/mascot_leftIndex.png",
      title: "Step 1: Add Image",
      subTitle: "Choose an image to upload",
    },
    {
      id: 2,
      image: "/mascots/mascot_paintBrush.png",
      title: "Step 2: Adjust Image",
      subTitle: "Customize design and color",
    },
    {
      id: 3,
      image: "/mascots/mascot_thumbsUp.png",
      title: "Step 3: Summary",
      subTitle: "Review your design",
    },
  ];

  const handleProgress = (progressID: number) => {
    dispatch(setProgressBarValue(progressID));
  };

  return (
    <>
      <div className="flex w-full h-auto lg:w-2/3 md:4/5 space-x-0.5">
        {progressBar.map((step) => (
          <button
            key={step.id}
            onClick={() => handleProgress(step.id)}
            className={`cursor-pointer flex w-full border border-purple-300 ${
              progress === step.id && "bg-stone-300"
            }`}
          >
            <div className="relative w-1/3 aspect-square">
              <Image
                src={step.image}
                alt="Mascot"
                fill
                className="object-contain"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-center">
              <h1 className="font-semibold text-[8px] md:text-xs  text-purple-600">
                {step.title}
              </h1>
              <h1 className="text-stone-600 text-xs hidden md:block">
                {step.subTitle}
              </h1>
            </div>
          </button>
        ))}
      </div>
      <div className="w-full md:4/5 lg:w-2/3 bg-pink-800/20 py-0.5">
        <div
          className={`rounded-full bg-purple-800 h-2 transition-all duration-500
            ${progress <= 1 && "w-0"} 
            ${progress === 2 && "w-1/3"} 
            ${progress === 3 && "w-2/3"}`}
        />
      </div>
    </>
  );
};

export default ProgressBar;
