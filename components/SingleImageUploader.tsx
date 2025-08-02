"use client";
import Image from "next/image";
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import { FaRegImage } from "react-icons/fa6";

type Props = {
  localStorageKey: string;
  onUpload: (url: string) => void;
  label?: string;
};

const SingleImageUploader = ({ localStorageKey, onUpload, label }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cloudinaryID = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  useEffect(() => {
    const storedImage = localStorage.getItem(localStorageKey);
    if (storedImage) {
      setPreviewUrl(storedImage);
      onUpload(storedImage);
    }
  }, [localStorageKey, onUpload]);

  const handleFile = async (file: File) => {
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);

    const extension = file.name.split(".").pop();
    const customName = `image_design.${extension}`;
    // const renamedFile = new File([file], customName, { type: file.type });
    setFileName(customName);
    console.log(fileName);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "inkspire_unsigned");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryID}/image/upload`,
      { method: "POST", body: formData }
    );

    const data = await res.json();
    const secureUrl = data.secure_url;
    localStorage.setItem(localStorageKey, secureUrl);
    onUpload(secureUrl);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleBrowse = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => fileInputRef.current?.click()}
      // className="border-2 border-dashed w-full aspect-[7/4] md:aspect-[7/8] border-gray-400 rounded-md p-4 text-center cursor-pointer flex justify-center items-center"
      className="border-2 border-dashed border-gray-400 rounded-md p-4 text-center cursor-pointer flex justify-center items-center w-full h-full"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleBrowse}
        hidden
      />
      {previewUrl ? (
        // <div className="w-full aspect-[7/4] relative">
        <div className="w-full h-full relative">
          <Image
            src={previewUrl}
            alt="Uploaded"
            fill
            className="object-contain"
          />
          {/* <p className="text-sm text-gray-500">Saved as: {fileName}</p> */}
        </div>
      ) : (
        <div className="flex flex-col w-full h-full items-center justify-center space-y-3 p-5">
          <FaRegImage className="text-3xl text-purple-600" />
          <p className="text-sm text-stone-600">
            <span className="font-semibold text-purple-600">Drag & Drop</span>{" "}
            or{" "}
            <span className="font-semibold text-purple-600">
              Click to Browse
            </span>{" "}
            an image
          </p>
          <p className="text-sm text-stone-600">Supported: JPG & PNG</p>
          {label && <p className="text-xs text-purple-600">{label}</p>}
        </div>
      )}
    </div>
  );
};

export default SingleImageUploader;
