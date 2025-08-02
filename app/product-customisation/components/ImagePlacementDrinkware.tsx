"use client";
import { setProductPath } from "@/app/store/slices/productSlice";
import { RootState } from "@/app/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ColorSelector from "./ColorSelector";
import DrinkwareWithImage from "./DrinkwareWithImage";
import SizeChartModal from "./SizeChartModal";

type ImagePlacementDrinkwareProps = {
  catalogItem: string;
};

const ImagePlacementDrinkware = ({
  catalogItem,
}: ImagePlacementDrinkwareProps) => {
  const dispatch = useDispatch();
  //get all the values from productSlice
  const { productFrontPath } = useSelector((state: RootState) => state.product);
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

  const getProductPrice = (catalogItem: string) => {
    let price = 0;
    const basePrice01Items = ["Jars"];
    const basePrice02Items = ["Mugs"];
    const basePrice03Items = ["Flasks", "Bottles"];
    if (basePrice01Items.includes(catalogItem)) {
      price = 600;
    } else if (basePrice02Items.includes(catalogItem)) {
      price = 500;
    } else if (basePrice03Items.includes(catalogItem)) {
      price = 2000;
    } else {
      price = 0; // default price for unmatched items
    }
    return price;
  };

  return (
    <>
      <div className="w-full aspect-[7/4] bg-white">
        <DrinkwareWithImage
          productImage={productFrontPath!}
          uploadedImage={uploadedImagePrimary}
          drinkware={catalogItem}
        />
      </div>
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
    </>
  );
};

export default ImagePlacementDrinkware;
