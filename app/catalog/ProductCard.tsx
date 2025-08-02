"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ProductCardMap = {
  items: { type: string; title: string; productType: string; image: string };
};

const ProductCard = ({ items }: ProductCardMap) => {
  const handleClick = () => {
    localStorage.setItem("catalogItem", items.title);
  };

  return (
    <Link
      href={`/product-customisation/${items.type}/${items.title}`}
      onClick={handleClick}
      className="group cursor-pointer aspect-[3/4] w-40 sm:w-44 md:w-48 flex flex-col rounded-lg overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
    >
      <div className="w-full aspect-square relative shrink-0">
        <Image
          src={items.image}
          alt={items.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="w-full flex-1 flex items-center justify-center bg-stone-50 group-hover:bg-purple-50 transition-colors duration-300 px-2">
        <h1 className="font-semibold text-sm md:text-base text-center text-zinc-700 group-hover:text-purple-600 transition-colors duration-300">
          {items.title.replace(/-/g, " ")}
        </h1>
      </div>
    </Link>
  );
};

export default ProductCard;
