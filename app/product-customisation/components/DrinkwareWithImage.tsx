import Image from "next/image";
import WrapperCanvasMug from "./WrapperCanvasMug";
import WrapperCanvasBottle from "./WrapperCanvasBottle";
import WrapperCanvasJar from "./WrapperCanvasJar";
import WrapperCanvasFlask from "./WrapperCanvasFlask";

type DrinkwareWithImageProps = {
  productImage: string;
  uploadedImage: string;
  drinkware: string;
};
const DrinkwareWithImage = ({
  productImage,
  uploadedImage,
  drinkware,
}: DrinkwareWithImageProps) => {
  return (
    <div className="relative w-full h-full border-2 border-dashed border-gray-400 rounded-md p-4 flex justify-center items-center">
      {productImage && (
        <Image
          src={productImage}
          alt="Product View"
          fill
          className="object-contain"
          priority
        />
      )}
      {uploadedImage && (
        <>
          {drinkware === "Mugs" && (
            <div className="absolute -top-[2.5%] left-[4%] w-full h-full">
              <WrapperCanvasMug imageUrl={uploadedImage} />
            </div>
          )}
          {drinkware === "Bottles" && (
            <div className="absolute top-[2.5%] -left-[13%] w-full h-full">
              <WrapperCanvasBottle imageUrl={uploadedImage} />
            </div>
          )}
          {drinkware === "Jars" && (
            <div className="absolute top-[2.5%] -left-[0%] w-full h-full">
              <WrapperCanvasJar imageUrl={uploadedImage} />
            </div>
          )}
          {drinkware === "Flasks" && (
            <div className="absolute top-[0%] left-[2%] w-full h-full">
              <WrapperCanvasFlask imageUrl={uploadedImage} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DrinkwareWithImage;
