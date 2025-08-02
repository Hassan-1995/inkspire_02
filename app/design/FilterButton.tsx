"use client";

import {
  LuCamera,
  LuType,
  LuShapes,
  LuClapperboard,
  LuSmile,
  LuQuote,
} from "react-icons/lu";
import { useSearchParams, useRouter } from "next/navigation";

const categories = [
  { id: "typography", label: "Typography", icon: LuType }, // Typing / font
  { id: "minimalist", label: "Minimalist", icon: LuCamera }, // Simple photography
  { id: "abstract", label: "Abstract", icon: LuShapes }, // Geometric / abstract
  { id: "pop-culture", label: "Pop Culture", icon: LuClapperboard }, // Media / movies
  { id: "cartoon", label: "Cartoons", icon: LuSmile }, // Fun, childlike
  { id: "quotes", label: "Quotes", icon: LuQuote }, // Quotation marks
];

const FilterButton = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeCategory = searchParams.get("category") || "typography";

  const setActiveCategory = (categoryId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", categoryId);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex overflow-x-auto whitespace-nowrap gap-2 lg:justify-center no-scrollbar">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`cursor-pointer rounded-lg flex w-max items-center px-6 py-2 font-bold text-sm transition-all duration-300 border mb-1 ${
              activeCategory === category.id
                ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
                : "border-gray-300 text-gray-700 bg-white hover:bg-pink-100"
            }`}
          >
            <Icon className="w-4 h-4 mr-2 font-bold" />
            {category.label}
          </button>
        );
      })}
    </div>
  );
};

export default FilterButton;
