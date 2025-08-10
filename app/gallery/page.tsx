import { LuCamera } from "react-icons/lu";
import FilterButton from "./FilterButton";
import GalleryCard from "./GalleryCard";

// interface GalleryPageProps {
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
// }

export const dynamic = "force-dynamic";

const GalleryPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  // const activeCategory =
  //   typeof searchParams.category === "string" ? searchParams.category : "all";
  const resolvedParams = await searchParams;
  const activeCategory =
    typeof resolvedParams.category === "string"
      ? resolvedParams.category
      : "all";
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-orange-50 to-emerald-50">
      <section className="relative overflow-hidden py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="bg-gradient-to-r from-pink-500 to-pink-700 flex items-center justify-center text-white px-4 py-2 text-sm font-medium rounded-full w-max h-max">
                  <LuCamera className="w-4 h-4 mr-2" />
                  <h1>Creative Showcase</h1>
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Gallery of{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                  InkSpire
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Explore the amazing creativity of our customers, to bring their
                ideas to life with personalized apparel, mugs and more. Discover
                their unique creations and get inspired to design your own.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 md:px-6 bg-white border-b border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <FilterButton />
        </div>
      </section>
      <section className="py-16 px-4 md:px-6 bg-gradient-to-br from-blue-50 via-blue-100 to-emerald-100">
        <div className="container mx-auto max-w-7xl">
          <GalleryCard filter={activeCategory} />
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
