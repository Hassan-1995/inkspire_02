import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { LuStar } from "react-icons/lu";

// Move your data here
const galleryItems = [
  {
    id: 1,
    category: "typography",
    title: "Morning Coffee Vibes",
    description: "Custom mug design in a cozy café setting",
    image: "/placeholder.svg?height=400&width=300",
    likes: 124,
    featured: true,
  },
  {
    id: 2,
    category: "typography",
    title: "Sarah's Art Studio",
    description: "Beautiful tote bag design by customer Sarah M.",
    image: "/placeholder.svg?height=500&width=400",
    likes: 89,
    featured: false,
  },
  {
    id: 3,
    category: "abstract",
    title: "Quality Check Process",
    description: "Our team ensuring every print meets our standards",
    image: "/placeholder.svg?height=300&width=400",
    likes: 67,
    featured: false,
  },
  {
    id: 4,
    category: "pop-culture",
    title: "Eco-Friendly Apparel",
    description: "Sustainable t-shirt collection showcase",
    image: "/placeholder.svg?height=450&width=350",
    likes: 156,
    featured: true,
  },
  {
    id: 5,
    category: "typography",
    title: "Urban Street Style",
    description: "Custom hoodie worn in downtown setting",
    image: "/placeholder.svg?height=600&width=400",
    likes: 203,
    featured: false,
  },
  {
    id: 6,
    category: "minimalist",
    title: "Mike's Band Merch",
    description: "Custom band t-shirts created for local musicians",
    image: "/placeholder.svg?height=400&width=350",
    likes: 78,
    featured: false,
  },
  {
    id: 7,
    category: "abstract",
    title: "Design Studio",
    description: "Creative process in our design workspace",
    image: "/placeholder.svg?height=350&width=500",
    likes: 92,
    featured: false,
  },
  {
    id: 8,
    category: "pop-culture",
    title: "Drinkware Collection",
    description: "Premium water bottles and tumblers",
    image: "/placeholder.svg?height=400&width=300",
    likes: 134,
    featured: true,
  },
  {
    id: 9,
    category: "typography",
    title: "Outdoor Adventure",
    description: "Custom backpack on a hiking trail",
    image: "/placeholder.svg?height=500&width=350",
    likes: 167,
    featured: false,
  },
  {
    id: 10,
    category: "minimalist",
    title: "Emma's Wedding Favors",
    description: "Personalized mugs for wedding guests",
    image: "/placeholder.svg?height=400&width=400",
    likes: 245,
    featured: true,
  },
  {
    id: 11,
    category: "abstract",
    title: "Printing Process",
    description: "State-of-the-art printing technology in action",
    image: "/placeholder.svg?height=350&width=450",
    likes: 56,
    featured: false,
  },
  {
    id: 12,
    category: "pop-culture",
    title: "Accessories Flat Lay",
    description: "Beautiful arrangement of custom accessories",
    image: "/placeholder.svg?height=400&width=400",
    likes: 189,
    featured: false,
  },
];

type GalleryCardProps = {
  filter: string;
};

const GalleryCard = ({ filter }: GalleryCardProps) => {
  const filteredItems =
    filter === "all"
      ? galleryItems.filter((item) => item.category === "typography")
      : galleryItems.filter((item) => item.category === filter);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredItems.map((item) => (
        <div
          key={item.id}
          className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-0 shadow-lg rounded-xl overflow-hidden bg-white"
        >
          <div className="relative overflow-hidden">
            {item.featured && (
              <div className="absolute flex items-center justify-center py-0.5 px-2 rounded-full top-4 left-4 z-10 bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0">
                <LuStar className="text-white w-3 h-3 mr-1" />
                <p className="text-sm font-bold">Featured</p>
              </div>
            )}
            <div className="relative w-full aspect-[4/5]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-semibold text-lg text-gray-900 mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 flex-grow">
                {item.description}
              </p>
              <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
                <span className="capitalize">
                  {item.category.replace("-", " ")}
                </span>
                <span className="flex items-center gap-1">
                  <FaHeart className="text-pink-500 w-3 h-3" />
                  {item.likes}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryCard;
