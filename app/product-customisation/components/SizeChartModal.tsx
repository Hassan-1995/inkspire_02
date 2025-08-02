"use client";
import { RootState } from "@/app/store/store";
import React from "react";
import { useSelector } from "react-redux";

type SizeChartModalProps = {
  catalogItem: string;
};

const SizeChartModal = ({ catalogItem }: SizeChartModalProps) => {
  const { productSize } = useSelector((state: RootState) => state.product);

  const apparelSizes = [
    ["Size", "S", "M", "L", "XL"],
    ["Length (in)", "38", "41", "44", "47.5"],
    ["Shoulder (in)", "18", "19", "20", "21"],
    ["Chest (in)", "19.5", "20.5", "21.5", "22.5"],
  ];
  const bagSizes = [
    ["Type", "Tote-Bags", "Grocery-Bags", "Laptop-Sleeves", "Pouches"],
    ["Height (in)", "15", "16", "11", "6"],
    ["Width (in)", "14", "14", "15", "9"],
    ["Depth (in)", "4", "6", "1", "2"],
  ];
  const drinkwareSizes = [
    ["Type", "Bottles", "Mugs", "Jars", "Flask"],
    ["Capacity (ml)", "500", "350", "300", "450"],
  ];
  const homeSizes = [
    ["Type", "Blankets", "Towels", "Curtains", "Wall-Clocks", "Aprons"],
    ["Length (in)", "80", "55", "84", "12", "32"],
    ["Width (in)", "60", "28", "50", "12", "26"],
  ];
  const apparels = [
    "T-Shirts",
    "Polos",
    "Full-Sleeves",
    "Varsity-Jackets",
    "Hoodies",
  ];
  const drinkwares = ["Bottles", "Mugs", "Jars", "Flask"];
  const bags = ["Tote-Bags", "Grocery-Bags", "Laptop-Sleeves", "Pouches"];
  const homes = ["Blankets", "Towels", "Curtains", "Wall-Clocks", "Aprons"];

  const hasApparel = apparels.includes(catalogItem);
  const hasDrinkware = drinkwares.includes(catalogItem);
  const hasBag = bags.includes(catalogItem);
  const hasHome = homes.includes(catalogItem);

  const renderApparelSizes = () => {
    const sizeIndex = apparelSizes[0].indexOf(productSize);
    if (sizeIndex === -1) return null;

    return (
      <div className="text-xs text-gray-700 space-y-0.5 mt-1">
        {apparelSizes.slice(1).map((row, idx) => (
          <p key={idx}>{`${row[0]}: ${row[sizeIndex]} inches`}</p>
        ))}
      </div>
    );
  };

  const renderDrinkwareSizes = () => {
    const drinkwareIndex = drinkwareSizes[0].indexOf(catalogItem);
    if (drinkwareIndex === -1) return null;
    return (
      <div className="text-xs text-gray-700 space-y-0.5 mt-1">
        {drinkwareSizes.slice(1).map((row, idx) => (
          <p key={idx}>{`${row[0]}: ${row[drinkwareIndex]} mili-liter`}</p>
        ))}
      </div>
    );
  };

  const renderBagSizes = () => {
    const bagIndex = bagSizes[0].indexOf(catalogItem);
    if (bagIndex === -1) return null;
    return (
      <div className="flex space-x-2 text-sm text-gray-700 space-y-0.5 mt-1">
        {bagSizes.slice(1).map((row, idx) => (
          <p key={idx}>{`${row[0]}: ${row[bagIndex]} inches`}</p>
        ))}
      </div>
    );
  };
  const renderHomeSizes = () => {
    const homeIndex = homeSizes[0].indexOf(catalogItem);
    if (homeIndex === -1) return null;
    return (
      <div className="flex space-x-2 text-sm text-gray-700 space-y-0.5 mt-1">
        {homeSizes.slice(1).map((row, idx) => (
          <p key={idx}>{`${row[0]}: ${row[homeIndex]} inches`}</p>
        ))}
      </div>
    );
  };

  return (
    <>
      {hasApparel && renderApparelSizes()}
      {hasDrinkware && renderDrinkwareSizes()}
      {hasBag && renderBagSizes()}
      {hasHome && renderHomeSizes()}
    </>
  );
};

export default SizeChartModal;
