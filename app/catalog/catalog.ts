// catalogs.ts

export type CatalogItem = {
  id: number;
  type: string;
  title: string;
  productType: string;
  image: string;
};

export const apparels: CatalogItem[] = [
  { id: 1, type: "apparels", title: "T-Shirts", productType: "Round Neck T-Shirt", image: "/apparel_section/t_shirts.jpg" },
  { id: 2, type: "apparels", title: "Polos", productType: "Polo Shirt", image: "/apparel_section/polo.jpg" },
  { id: 3, type: "apparels", title: "Full-Sleeves", productType: "Full Sleeve T-Shirt", image: "/apparel_section/fullSleeve.jpg" },
  { id: 5, type: "apparels", title: "Varsity-Jackets", productType: "Varsity Jacket", image: "/apparel_section/varsity.jpg" },
  { id: 6, type: "apparels", title: "Hoodies", productType: "Pullover Hoodie", image: "/apparel_section/hoodie.jpg" },
];

export const drinkwares: CatalogItem[] = [
  { id: 1, type: "drinkwares", title: "Bottles", productType: "Water Bottle", image: "/drinkware_section/Bottles.png" },
  { id: 2, type: "drinkwares", title: "Mugs", productType: "Ceramic Mug", image: "/drinkware_section/Mugs.png" },
  { id: 3, type: "drinkwares", title: "Jars", productType: "Storage Jar", image: "/drinkware_section/Jars.png" },
  { id: 4, type: "drinkwares", title: "Flasks", productType: "Insulated Flask", image: "/drinkware_section/Flasks.png" },
];

export const bags: CatalogItem[] = [
  { id: 1, type: "bags", title: "Tote-Bags", productType: "Tote Bag", image: "/bag_section/tote-bag.jpg" },
  { id: 2, type: "bags", title: "Grocery-Bags", productType: "Grocery Bag", image: "/bag_section/grocery-bag.png" },
  { id: 3, type: "bags", title: "Laptop-Sleeves", productType: "Laptop Sleeve", image: "/bag_section/laptop-sleeve.png" },
  { id: 4, type: "bags", title: "Pouches", productType: "Zipper Pouch", image: "/bag_section/pouch.png" },
];

export const homes: CatalogItem[] = [
  { id: 1, type: "home", title: "Blankets", productType: "Soft Blanket", image: "/home_section/blankets.png" },
  { id: 2, type: "home", title: "Towels", productType: "Bath Towel", image: "/home_section/towels.png" },
  { id: 3, type: "home", title: "Curtains", productType: "Window Curtain", image: "/home_section/curtains.png" },
  { id: 4, type: "home", title: "Wall-Clocks", productType: "Wall Clock", image: "/home_section/wall-clocks.png" },
  { id: 5, type: "home", title: "Aprons", productType: "Kitchen Apron", image: "/home_section/aprons.png" },
];
