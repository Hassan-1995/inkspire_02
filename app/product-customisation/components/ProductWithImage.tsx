import Image from "next/image";

type ProductWithImageProps = {
  productImage: string;
  uploadedImage: string;
  uploadedImagePosition?: string;
  sizeClass: string;
  overlayUploadedOnProduct?: boolean; // only for wall-clock
};
const ProductWithImage = ({
  productImage,
  uploadedImage,
  uploadedImagePosition,
  sizeClass,
  overlayUploadedOnProduct = true, // for default behaviour
}: ProductWithImageProps) => {
  return (
    <div className="relative w-full h-full border-2 border-dashed rounded-md p-4 flex justify-center items-center">
      {/* base layer */}
      {overlayUploadedOnProduct
        ? productImage && (
            <Image
              src={productImage}
              alt="Product View"
              fill
              className="object-contain"
              priority
            />
          )
        : uploadedImage && (
            <div
              className={`absolute border-2 border-dashed border-pink-700 ${sizeClass} ${
                uploadedImagePosition || ""
              }`}
              style={{
                opacity: 0.9,
                filter: "blur(0px)",
              }}
            >
              <Image
                src={uploadedImage}
                alt="Uploaded Base"
                fill
                className="object-contain"
              />
            </div>
          )}

      {/* Overlay Layer */}
      {overlayUploadedOnProduct
        ? uploadedImage && (
            <div
              className={`absolute border-2 border-dashed border-white ${sizeClass} ${
                uploadedImagePosition || ""
              }`}
              style={{
                opacity: 0.9,
                filter: "blur(0px)",
              }}
            >
              <Image
                src={uploadedImage}
                alt="Overlay"
                fill
                className="object-contain"
              />
            </div>
          )
        : productImage && (
            <div
            // className={`absolute border-2 border-dashed ${sizeClass} ${
            //   uploadedImagePosition || ""
            // }`}
            // style={{
            //   opacity: 0.9,
            //   filter: "blur(0px)",
            // }}
            >
              <Image
                src={productImage}
                alt="Overlay Product"
                fill
                className="object-contain"
              />
            </div>
          )}

      {/*  */}
    </div>
  );
};

export default ProductWithImage;
