"use client";
import { setColor, setProductPath } from "@/app/store/slices/productSlice";
import { RootState } from "@/app/store/store";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type ColorSelectorProps = {
  catalogItem: string;
};

const colorNames = [
  { name: "Black", style: "bg-black" },
  { name: "Green", style: "bg-green-600" },
  { name: "Blue", style: "bg-blue-950" },
  { name: "Red", style: "bg-red-900" },
];
const ColorSelector = ({ catalogItem }: ColorSelectorProps) => {
  const dispatch = useDispatch();

  const { productFrontPath, productBackPath, productColor } = useSelector(
    (state: RootState) => state.product
  );

  const handleInitialValues = useCallback(() => {
    // Extract catalog from the current productFrontPath
    const existingCatalog = productFrontPath
      ? productFrontPath.split("/")[1]
      : null;

    let frontPath: string;
    let backPath: string | null;

    const catalogsWithBack = [
      "T-Shirts",
      "Polos",
      "Full-Sleeves",
      "Varsity-Jackets",
      "Hoodies",
      "Tote-Bags",
      "Grocery-Bags",
      "Laptop-Sleeves",
      "Pouches",
    ];
    const hasBack = catalogsWithBack.includes(catalogItem);

    if (existingCatalog === catalogItem) {
      // Same catalog ➔ keep current images
      frontPath = productFrontPath!;
      backPath = hasBack ? productBackPath! : null;
    } else {
      // Different catalog ➔ reset to black images
      frontPath = `/${catalogItem}/black_front.png`;
      backPath = hasBack ? `/${catalogItem}/black_back.png` : null;
      dispatch(setColor("Black"));

      // Update localStorage only if resetting
      localStorage.setItem("FrontView", frontPath);
      localStorage.setItem("BackView", backPath ?? "");
    }

    // Dispatch to Redux
    dispatch(
      setProductPath({
        front: frontPath,
        back: backPath,
      })
    );
  }, [catalogItem, dispatch, productBackPath, productFrontPath]);

  // called handleInitialValues function to set the initial values
  useEffect(() => {
    handleInitialValues();
  }, [handleInitialValues]);

  const handleColor = (color: string) => {
    dispatch(setColor(color));
    const newFront = `/${catalogItem}/${color.toLowerCase()}_front.png`;
    const newBack = `/${catalogItem}/${color.toLowerCase()}_back.png`;

    localStorage.setItem("FrontView", newFront);
    localStorage.setItem("BackView", newBack);

    const isBack = [
      "T-Shirts",
      "Polos",
      "Full-Sleeves",
      "Varsity-Jackets",
      "Hoodies",
      "Tote-Bags",
      "Grocery-Bags",
      "Laptop-Sleeves",
      "Pouches",
    ];
    const hasBack = isBack.includes(catalogItem);

    dispatch(
      setProductPath({
        front: newFront,
        back: hasBack ? newBack : null,
      })
    );
  };

  return (
    <>
      <p className="text-gray-500 mb-1 text-xs">COLOR:</p>
      <div className="flex gap-2">
        {colorNames.map((colorName) => (
          <button
            key={colorName.name}
            onClick={() => handleColor(colorName.name)}
            className={`cursor-pointer hover:border-purple-500 transition-colors border-2 w-8 h-8 rounded-full flex items-center justify-center ${
              colorName.name === productColor && "border-purple-600"
            }`}
          >
            <div className={`${colorName.style} w-6 h-6 rounded-full`} />
          </button>
        ))}
      </div>
    </>
  );
};

export default ColorSelector;
