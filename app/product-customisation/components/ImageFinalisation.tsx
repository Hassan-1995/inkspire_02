import AddToCart from "@/components/AddToCart";
import { RootState } from "@/app/store/store";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

type ImageFinalisationProps = {
  catalog: string;
  catalogItem: string;
};

const ImageFinalisation = ({
  catalog,
  catalogItem,
}: ImageFinalisationProps) => {
  const {
    productType,
    productFrontPath,
    productBackPath,
    uploadedImageSizePrimary,
    uploadedImageSizeSecondary,
    productColor,
    productSize,
    productPrice,
    designPriceFront,
    designPriceBack,
  } = useSelector((state: RootState) => state.product);

  const { uploadedImagePrimary, uploadedImageSecondary } = useSelector(
    (state: RootState) => state.uploadedImage
  );
  let hasBack = true;
  const handleSize = () => {
    const isStandardSize = ["drinkwares", "home"];
    const hasFront = isStandardSize.includes(catalog);
    if (hasFront) {
      hasBack = false;
      return "Standard";
    } else {
      hasBack = true;
      return null;
    }
  };

  const details = [
    ["Name", productType || catalogItem],
    ["Size", handleSize() || productSize || "N/A"],
    ["Color", productColor],
    // ["Design Size Front", handleSize() || uploadedImageSizePrimary],
    [
      "Design Size Front",
      handleSize() || uploadedImagePrimary !== ""
        ? uploadedImageSizePrimary
        : "N/A",
    ],
  ];

  const catalogsWithBackDesign = ["apparels", "bags"]; // add

  if (catalogsWithBackDesign.includes(catalog)) {
    // details.push(["Design Size Back", uploadedImageSizeSecondary!]);
    details.push([
      "Design Size Back",
      uploadedImageSecondary !== "" ? uploadedImageSizeSecondary! : "N/A",
    ]);
  }

  return (
    <>
      <div className="flex flex-col md:flex-row w-full aspect-[7/4] border-2 border-dashed border-gray-400 rounded-md p-2 gap-2">
        {/* Left Preview Section */}
        <div className="w-full md:w-2/5 h-auto md:h-full bg-pink-200 rounded-md p-2 space-y-2">
          <h1 className="text-center text-sm font-semibold">Product Preview</h1>
          <div className="grid grid-cols-2 gap-2">
            {[
              productFrontPath,
              uploadedImagePrimary,
              productBackPath,
              uploadedImageSecondary,
            ]
              .filter(Boolean)
              .map((src, idx) => (
                <div
                  key={idx}
                  className="aspect-[3/4] bg-white border rounded-md flex items-center justify-center text-xs text-gray-500 relative"
                >
                  <Image
                    src={src!}
                    alt={`Product Preview ${idx + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Right Details Section */}
        <div className="md:w-3/5 w-full flex flex-col gap-2">
          {/* Product Details */}
          <div className="w-full bg-purple-100 rounded-md p-2 flex flex-col gap-1 flex-grow">
            <h1 className="text-sm font-semibold mb-1">Product Details</h1>
            {details.map(([label, value]) => (
              <div key={label} className="flex justify-between text-xs">
                <span className="font-medium text-gray-700">{label}</span>
                <span className="text-gray-800">{value}</span>
              </div>
            ))}
            <div className="flex justify-between items-center text-xs mt-1">
              <span className="font-medium text-gray-700">Placement</span>
              <div className="flex space-x-2">
                <div className="bg-green-300 rounded-full px-2 py-0.5 text-white text-xs">
                  Front
                </div>
                {hasBack && (
                  <div className="bg-purple-300 rounded-full px-2 py-0.5 text-white text-xs">
                    Back
                  </div>
                )}
              </div>
            </div>
            <p className="text-[5px] italic text-gray-600 flex-1 flex items-end md:text-xs pl-1">
              Please note: Actual product color may vary slightly due to
              lighting and screen settings.
            </p>
          </div>

          {/* Price Breakdown */}
          <div className="w-full bg-green-100 rounded-md p-2 flex flex-col gap-1">
            <h1 className="text-sm font-semibold mb-1">Price Breakdown</h1>
            {[
              ["Base Price of Product", `Rs: ${productPrice}`],
              ["Design Front", `Rs: ${designPriceFront}`],
              ["Design Back", `Rs: ${designPriceBack}`],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-xs">
                <span className="font-medium text-gray-700">{label}</span>
                <span className="text-gray-800">{value}</span>
              </div>
            ))}
            <div className="flex justify-between text-xs">
              <span className="font-medium text-gray-700">Total</span>
              <span className="text-gray-800">
                Rs:{" "}
                {(
                  productPrice +
                  designPriceFront +
                  (designPriceBack || 0)
                ).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end my-2">
        <AddToCart
          productID={`${(productType || catalogItem).replace(
            /\s+/g,
            "-"
          )}_${productColor}_${productSize}_${Date.now()}`}
          productName={productType || catalogItem}
          productFrontPath={productFrontPath}
          productBackPath={productBackPath ?? null}
          uploadedImagePrimary={uploadedImagePrimary}
          uploadedImageSecondary={uploadedImageSecondary ?? null}
          productColor={productColor}
          productSize={handleSize() || productSize || "N/A"}
          primaryImageSize={handleSize() || uploadedImageSizePrimary}
          secondaryImageSize={
            (handleSize() || uploadedImageSizeSecondary) ?? null
          }
          productPrice={
            productPrice + designPriceFront + (designPriceBack || 0)
          }
          quantity={1}
        />
      </div>
    </>
  );
};

export default ImageFinalisation;
