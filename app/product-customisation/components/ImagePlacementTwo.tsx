"use client";
import {
  setDesignPriceBack,
  setDesignPriceFront,
  setProductPath,
  setProductPrice,
} from "@/app/store/slices/productSlice";
import { RootState } from "@/app/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackSize from "./BackSize";
import ColorSelector from "./ColorSelector";
import FrontSize from "./FrontSize";
import ProductWithImage from "./ProductWithImage";
import SizeChartModal from "./SizeChartModal";
import SizeSelector from "./SizeSelector";

type SizeOptions = "S" | "M" | "L";

type SizeClassMap = {
  S: string;
  M: string;
  L: string;
};

type SizeMapProps = {
  default: SizeClassMap;
  front: SizeClassMap;
  back: SizeClassMap;
  "T-Shirts_front"?: SizeClassMap;
  Polos_front?: SizeClassMap;
  "Full-Sleeves_front"?: SizeClassMap;
  "Varsity-Jackets_front"?: SizeClassMap;
  Hoodies_front?: SizeClassMap;
  Hoodies_back?: SizeClassMap;
  "Laptop-Sleeves_front"?: SizeClassMap;
  Laptop_back?: SizeClassMap;
  [key: string]: SizeClassMap | undefined; // Allow additional catalog-specific keys
};

const sharedFrontStyle01: SizeClassMap = {
  S: "w-[40%] h-[25%]",
  M: "w-[40%] h-[30%]",
  L: "w-[40%] h-[40%]",
};
const sharedFrontStyle02: SizeClassMap = {
  S: "w-[12%] h-[8%]",
  M: "w-[12%] h-[10%]",
  L: "w-[12%] h-[12%]",
};
const hoodieStyle: SizeClassMap = {
  S: "w-[35%] h-[25%]",
  M: "w-[35%] h-[30%]",
  L: "w-[35%] h-[35%]",
};
const laptopStyle: SizeClassMap = {
  S: "w-[60%] h-[25%]",
  M: "w-[60%] h-[30%]",
  L: "w-[60%] h-[35%]",
};
const getImageSizeClass = (
  catalogItem: string,
  side: "front" | "back",
  size: SizeOptions
): string => {
  const sizeMap: SizeMapProps = {
    default: {
      S: "w-20 h-20",
      M: "w-24 h-24",
      L: "w-28 h-28",
    },
    front: {
      S: "w-[25%] h-[25%]",
      M: "w-[30%] h-[30%]",
      L: "w-[40%] h-[40%]",
    },
    back: {
      S: "w-[40%] h-[25%]",
      M: "w-[40%] h-[30%]",
      L: "w-[40%] h-[40%]",
    },
    "Full-Sleeves_front": sharedFrontStyle01,
    "T-Shirts_front": sharedFrontStyle01,
    "Varsity-Jackets_front": sharedFrontStyle02,
    Polos_front: sharedFrontStyle02,
    Hoodies_front: hoodieStyle,
    Hoodies_back: hoodieStyle,
    "Laptop-Sleeves_front": laptopStyle,
    "Laptop-Sleeves_back": laptopStyle,
  };

  const key = `${catalogItem}_${side}`;
  if (sizeMap[key]?.[size]) return sizeMap[key]![size];

  return sizeMap[side]?.[size] || sizeMap.default[size];
};

const getImagePositionClass = (catalogItem: string, side: "front" | "back") => {
  const chestItems = ["Polos", "Varsity-Jackets"];
  const noChestItems = ["Hoodies", "Full-Sleeves"];
  const bagItems = ["Tote-Bags", "Grocery-Bags"];
  const t_shirts = ["T-Shirts"];

  const isChest = chestItems.includes(catalogItem);
  const isNoChest = noChestItems.includes(catalogItem);
  const isBag = bagItems.includes(catalogItem);
  const isTShirt = t_shirts.includes(catalogItem);

  // Bag logic (applies to both sides)
  if (isBag) {
    return "top-[64%] left-1/2 -translate-x-1/2 -translate-y-1/2";
  }
  if (isTShirt) {
    return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
  }

  // Chest logic on front
  if (isChest && side === "front") {
    return "top-[35%] left-[60%] -translate-x-[60%] -translate-y-[35%]";
  }

  // No-chest items on front
  if (isNoChest && side === "front") {
    return "top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2";
  }

  // All back-side logic for noChest or chest items
  if (side === "back" && (isNoChest || isChest)) {
    return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
  }

  // Fallback (for unknown items)
  return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
};

type ImagePlacementTwoProps = {
  catalog: string;
  catalogItem: string;
};

const ImagePlacementTwo = ({
  catalog,
  catalogItem,
}: ImagePlacementTwoProps) => {
  const dispatch = useDispatch();
  //get all the values from productSlice
  const {
    productFrontPath,
    productBackPath,
    uploadedImageSizePrimary,
    uploadedImageSizeSecondary,
  } = useSelector((state: RootState) => state.product);
  // get uploadedImages
  const { uploadedImagePrimary, uploadedImageSecondary } = useSelector(
    (state: RootState) => state.uploadedImage
  );
  // initialised the values (default values)
  useEffect(() => {
    if (!productFrontPath) {
      dispatch(
        setProductPath({
          front: `/${catalogItem}/black_front.png`, // default front value
          back: `/${catalogItem}/black_back.png`, // default back value
        })
      );
    }
  }, [catalogItem, dispatch, productFrontPath]);

  useEffect(() => {
    const price = getProductPrice(catalogItem);
    dispatch(setProductPrice(price));
  }, [catalogItem, dispatch]);
  useEffect(() => {
    const designFrontPrice = getDesignPriceFront(
      catalogItem,
      uploadedImageSizePrimary
    );
    // dispatch(setDesignPriceFront(designFrontPrice));
    dispatch(
      setDesignPriceFront(uploadedImagePrimary !== "" ? designFrontPrice : 0)
    );
  }, [catalogItem, uploadedImageSizePrimary, dispatch, uploadedImagePrimary]);
  useEffect(() => {
    const designBackPrice = getDesignPriceBack(
      catalogItem,
      uploadedImageSizeSecondary!
    );
    // dispatch(setDesignPriceBack(designBackPrice));
    dispatch(
      setDesignPriceBack(uploadedImageSecondary !== "" ? designBackPrice : 0)
    );
  }, [
    catalogItem,
    uploadedImageSizeSecondary,
    dispatch,
    uploadedImageSecondary,
  ]);

  const getProductPrice = (catalogItem: string) => {
    const basePrice01Items = ["T-Shirts", "Laptop-Sleeves"];
    const basePrice02Items = [
      "Polos",
      "Full-Sleeves",
      "Hoodies",
      "Varsity-Jackets",
    ];
    const basePrice03Items = ["Tote-Bags", "Grocery-Bags"];

    if (basePrice01Items.includes(catalogItem)) return 450;
    if (basePrice02Items.includes(catalogItem)) return 550;
    if (basePrice03Items.includes(catalogItem)) return 200;
    return 0;
  };

  const getDesignPriceFront = (item: string, size: string): number => {
    const Items01 = ["T-Shirts", "Full-Sleeves", "Hoodies"];
    const Items02 = ["Varsity-Jackets", "Polos"];
    const Items03 = ["Tote-Bags", "Grocery-Bags", "Laptop-Sleeves"];

    if (Items01.includes(item)) {
      if (size === "S") return 250;
      if (size === "M") return 300;
      if (size === "L") return 350;
    }

    if (Items02.includes(item)) {
      if (size === "S") return 100;
      if (size === "M") return 150;
      if (size === "L") return 200;
    }

    if (Items03.includes(item)) {
      if (size === "S") return 150;
      if (size === "M") return 200;
      if (size === "L") return 250;
    }

    return 0;
  };
  const getDesignPriceBack = (item: string, size: string): number => {
    const Items01 = [
      "T-Shirts",
      "Polos",
      "Full-Sleeves",
      "Varsity-Jackets",
      "Hoodies",
    ];
    const Items02 = [""];
    const Items03 = ["Tote-Bags", "Grocery-Bags", "Laptop-Sleeves"];

    if (Items01.includes(item)) {
      if (size === "S") return 250;
      if (size === "M") return 300;
      if (size === "L") return 350;
    }

    if (Items02.includes(item)) {
      if (size === "S") return 100;
      if (size === "M") return 150;
      if (size === "L") return 200;
    }

    if (Items03.includes(item)) {
      if (size === "S") return 150;
      if (size === "M") return 200;
      if (size === "L") return 250;
    }

    return 0;
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full aspect-[7/8] md:aspect-[7/8] bg-white">
          <ProductWithImage
            productImage={productFrontPath!}
            uploadedImage={uploadedImagePrimary}
            uploadedImagePosition={getImagePositionClass(catalogItem, "front")}
            sizeClass={getImageSizeClass(
              catalogItem,
              "front",
              uploadedImageSizePrimary as SizeOptions
            )}
          />
        </div>

        <div className="w-full aspect-[7/8] md:aspect-[7/8] bg-white">
          <ProductWithImage
            productImage={productBackPath!}
            uploadedImage={uploadedImageSecondary}
            uploadedImagePosition={getImagePositionClass(catalogItem, "back")}
            sizeClass={getImageSizeClass(
              catalogItem,
              "back",
              uploadedImageSizeSecondary as SizeOptions
            )}
          />
        </div>
      </div>
      <div className="flex justify-between items-center my-2">
        <div>
          <ColorSelector catalogItem={catalogItem} />
        </div>
        <h1 className="text-gray-500 mb-1 text-sm">
          Rs: {getProductPrice(catalogItem)}
        </h1>
      </div>

      {catalog === "apparels" ? (
        <div className="flex justify-between items-center mb-2">
          <div>
            <SizeSelector />
          </div>
          <div>
            <SizeChartModal catalogItem={catalogItem} />
          </div>
        </div>
      ) : (
        <div className="mb-2">
          <p className="text-gray-500 mb-1 text-xs">SIZE:</p>
          <SizeChartModal catalogItem={catalogItem} />
        </div>
      )}

      {uploadedImagePrimary !== "" && (
        <div className="flex justify-between items-center mb-2">
          <div>
            <FrontSize />
          </div>
          <h1 className="text-gray-500 mb-1 text-sm">
            Rs: {getDesignPriceFront(catalogItem, uploadedImageSizePrimary)}
          </h1>
        </div>
      )}
      {uploadedImageSecondary !== "" && (
        <div className="flex justify-between items-center  mb-2">
          <div>
            <BackSize />
          </div>
          <h1 className="text-gray-500 mb-1 text-sm">
            Rs: {getDesignPriceBack(catalogItem, uploadedImageSizeSecondary!)}
          </h1>
        </div>
      )}
    </>
  );
};

export default ImagePlacementTwo;
