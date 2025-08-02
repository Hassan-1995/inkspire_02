"use client";
import {
  setProductPath,
  setProductPrice,
} from "@/app/store/slices/productSlice";
import { RootState } from "@/app/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ColorSelector from "./ColorSelector";
import FrontSize from "./FrontSize";
import ProductWithImage from "./ProductWithImage";
import SizeChartModal from "./SizeChartModal";

type SizeOptions = "S" | "M" | "L";

type SizeClassMap = {
  S: string;
  M: string;
  L: string;
};

type SizeMapProps = {
  default: SizeClassMap;
  front: SizeClassMap;
  Blankets_front?: SizeClassMap;
  Towels_front?: SizeClassMap;
  Curtains_front?: SizeClassMap;
  "Wall-Clock_front"?: SizeClassMap;
  Aprons_front?: SizeClassMap;
  "Yoga-Mats_front"?: SizeClassMap;
  [key: string]: SizeClassMap | undefined; // Allow additional catalog-specific keys
};
const sharedFrontStyle01: SizeClassMap = {
  S: "w-[20%] h-[35%]",
  M: "w-[20%] h-[50%]",
  L: "w-[20%] h-[70%]",
};
const getImageSizeClass = (
  catalogItem: string,
  side: "front" | "back",
  size: SizeOptions
): string => {
  const key = `${catalogItem}_${side}`;

  const sizeMap: SizeMapProps = {
    default: { S: "w-20 h-20", M: "w-24 h-24", L: "w-28 h-28" },
    front: { S: "w-[20%] h-[45%]", M: "w-[25%] h-[60%]", L: "w-[30%] h-[70%]" },
    Blankets_front: {
      S: "w-[35%] h-[55%]",
      M: "w-[35%] h-[65%]",
      L: "w-[35%] h-[75%]",
    },
    Aprons_front: {
      S: "w-[30%] h-[30%]",
      M: "w-[30%] h-[35%]",
      L: "w-[30%] h-[40%]",
    },
    Towels_front: sharedFrontStyle01,
    Curtains_front: sharedFrontStyle01,
    "Wall-Clocks_front": {
      S: "w-[18%] h-[30%]",
      M: "w-[24%] h-[40%]",
      L: "w-[30%] h-[50%]",
    },
    "Yoga-Mats_front": {
      S: "w-[18%] h-[50%]",
      M: "w-[18%] h-[65%]",
      L: "w-[18%] h-[80%]",
    },
  };

  return sizeMap[key]?.[size] || sizeMap[side]?.[size] || sizeMap.default[size];
};

const getImagePositionClass = (catalogItem: string, side: "front" | "back") => {
  const isBlanket = catalogItem === "Blankets";
  const isApron = catalogItem === "Aprons";
  if (isBlanket && side === "front") {
    return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
  }
  if (isApron && side === "front") {
    return "top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2";
  }
  return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
};

type ImagePlacementOneProps = {
  catalogItem: string;
};

const ImagePlacementOne = ({ catalogItem }: ImagePlacementOneProps) => {
  const dispatch = useDispatch();
  //get all the values from productSlice
  const { productFrontPath, uploadedImageSizePrimary } = useSelector(
    (state: RootState) => state.product
  );
  // get uploadedImages
  const { uploadedImagePrimary } = useSelector(
    (state: RootState) => state.uploadedImage
  );
  // initialised the values (default values)
  useEffect(() => {
    if (!productFrontPath) {
      dispatch(
        setProductPath({
          front: `/${catalogItem}/black_front.png`, // default front value
          // back: `/${catalogItem}/black_back.png`, // default back value
          back: null, // default back value
        })
      );
    }
  }, [catalogItem, dispatch, productFrontPath]);

  useEffect(() => {
    const price = getProductPrice(catalogItem);
    dispatch(setProductPrice(price));
  }, [catalogItem, dispatch]);

  const getProductPrice = (catalogItem: string) => {
    const basePrice01Items = ["Blankets", "Curtains"];
    const basePrice02Items = ["Towels", "Wall-Clocks", "Aprons"];
    if (basePrice01Items.includes(catalogItem)) return 2500;
    if (basePrice02Items.includes(catalogItem)) return 800;
    return 0;
  };

  const getDesignPriceFront = (item: string, size: string): number => {
    const Items01 = ["Blankets"];
    const Items02 = ["Towels", "Curtains", "Aprons"];
    const Items03 = ["Wall-Clocks"];

    if (Items01.includes(item)) {
      if (size === "S") return 550;
      if (size === "M") return 650;
      if (size === "L") return 700;
    }

    if (Items02.includes(item)) {
      if (size === "S") return 450;
      if (size === "M") return 550;
      if (size === "L") return 600;
    }

    if (Items03.includes(item)) {
      if (size === "S") return 200;
      if (size === "M") return 200;
      if (size === "L") return 200;
    }

    return 0;
  };

  return (
    <>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
      <h1>Catalog item{catalogItem}</h1>
      <div className="w-full aspect-[7/4]">
        <ProductWithImage
          productImage={productFrontPath!}
          uploadedImage={uploadedImagePrimary}
          uploadedImagePosition={getImagePositionClass(catalogItem, "front")}
          sizeClass={getImageSizeClass(
            catalogItem,
            "front",
            uploadedImageSizePrimary as SizeOptions
          )}
          overlayUploadedOnProduct={
            catalogItem === "Wall-Clocks" ? false : true
          }
        />
      </div>
      {/* </div> */}
      <div className="flex justify-between items-center my-2">
        <div>
          <ColorSelector catalogItem={catalogItem} />
        </div>
        <h1 className="text-gray-500 mb-1 text-sm">
          Rs: {getProductPrice(catalogItem)}
        </h1>
      </div>
      <div className="mb-2">
        <p className="text-gray-500 mb-1 text-xs">SIZE:</p>
        <SizeChartModal catalogItem={catalogItem} />
      </div>
      <div className="flex justify-between items-center mb-2">
        <div>
          <FrontSize />
        </div>
        <h1 className="text-gray-500 mb-1 text-sm">
          Rs: {getDesignPriceFront(catalogItem, uploadedImageSizePrimary)}
        </h1>
      </div>
    </>
  );
};

export default ImagePlacementOne;
