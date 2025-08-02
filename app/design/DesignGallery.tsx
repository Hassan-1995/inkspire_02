import React from "react";
import FilterButton from "./FilterButton";
import GalleryCard from "./GalleryCard";

interface DesignGalleryPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const DesignGallery = ({ searchParams }: DesignGalleryPageProps) => {
  const activeCategory =
    typeof searchParams.category === "string"
      ? searchParams.category
      : "typography";
  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
          Design Gallery
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Browse our curated collection of designs across different styles and
          categories. Hover over any design to see how it looks on various
          products.
        </p>
      </div>

      <section className="py-8 px-4 md:px-6 border-b border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <FilterButton />
        </div>
      </section>
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <GalleryCard filter={activeCategory} />
        </div>
      </section>
    </section>
  );
};

export default DesignGallery;
