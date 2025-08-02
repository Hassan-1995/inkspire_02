"use client";

import {
  LuCamera,
  LuGrid3X3,
  LuPalette,
  LuSparkles,
  LuUsers,
} from "react-icons/lu";
import { useSearchParams, useRouter } from "next/navigation";

const categories = [
  { id: "all", label: "All", icon: LuGrid3X3 },
  { id: "lifestyle", label: "Lifestyle", icon: LuCamera },
  { id: "customer", label: "Customer Creations", icon: LuUsers },
  { id: "behind-scenes", label: "Behind the Scenes", icon: LuSparkles },
  { id: "products", label: "Products", icon: LuPalette },
];

const FilterButton = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeCategory = searchParams.get("category") || "all";

  const setActiveCategory = (categoryId: string) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId === "all") {
      params.delete("category");
    } else {
      params.set("category", categoryId);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex overflow-x-auto whitespace-nowrap gap-4 lg:justify-center no-scrollbar">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`cursor-pointer rounded-full flex w-max items-center px-6 py-2 font-medium transition-all duration-300 border mb-1 ${
              activeCategory === category.id
                ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
                : "border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {category.label}
          </button>
        );
      })}
    </div>
  );
};

export default FilterButton;
