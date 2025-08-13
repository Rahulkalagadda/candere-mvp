import { Truck, Phone, Gift, Book, CheckCircle } from "lucide-react";

export type ProductImage = { src: string; alt: string };
export type ProductSummary = {
  styleNo?: string;
  width?: string;
  height?: string;
  metalWeight?: string;
  grossWeight?: string;
  metal?: string;
  hoopDiameter?: string;
  diamondType?: string;
  totalDiamondWeight?: string;
};

export type YouMayAlsoLikeItem = {
  id: string;
  name: string;
  currentPrice: string;
  originalPrice: string;
  discount?: string;
  rating: number;
  reviews: number;
  imageQuery?: string;
  badge?: string;
  image?: string;
};

export type Product = {
  id: string;
  name: string;
  inDemand?: string;
  rating?: number;
  reviews?: number;
  currentPrice: string;
  originalPrice?: string;
  youSave?: string;
  badges?: string[];
  images: ProductImage[];
  description?: string;
  productSummary?: ProductSummary;
  metalDetails?: string;
  includedWithPurchase?: Array<{ icon: any; text: string }>; // icon is a React component
  youMayAlsoLike?: YouMayAlsoLikeItem[];
  priceBreakup?: Array<{
    label: string;
    value: string;
    originalValue?: string;
    isGrandTotal?: boolean;
  }>;
};

export const products: Product[] = [
  {
    id: "dangling-diamond-hoop-earrings",
    name: "Dangling Diamond Hoop Earrings",
    inDemand: "500+ Shoppers bought this in the last 30 Days",
    rating: 4.8,
    reviews: 37,
    currentPrice: "2,399",
    originalPrice: "2,999",
    youSave: "600",
    badges: ["ELEGANT", "VERSATILE"],
    images: [
      { src: "https://www.candere.com/media/jewellery/images/C022008_1.jpg", alt: "Dangling Diamond Hoop Earrings Front" },
      { src: "https://www.candere.com/media/jewellery/images/C022008_2.jpg", alt: "Dangling Diamond Hoop Earrings Side" },
      { src: "https://www.candere.com/media/jewellery/images/C022008_3.jpg", alt: "Dangling Diamond Hoop Earrings On Ear" },
      { src: "https://www.candere.com/media/jewellery/images/C022008_4.jpg", alt: "Dangling Diamond Hoop Earrings Detail" },
    ],
    description:
      "Timeless elegance meets subtle movement—these Dangling Diamond Hoop Earrings feature a delicate hoop with a round-cut diamond charm that sways with every turn. Crafted in 14K white gold (also available in yellow or rose gold), they're perfect for adding a touch of sparkle to daily wear or elevating your evening look.",
    productSummary: {
      metal: "14K Gold (White/Yellow/Rose)",
      hoopDiameter: "10–12 mm",
      diamondType: "Lab-Grown or Natural",
      totalDiamondWeight: "0.5 ct (approx.)",
    },
    metalDetails: "*Weight and metal options may vary based on customization.",
    includedWithPurchase: [
      { icon: Truck, text: "Free Domestic Shipping" },
      { icon: Gift, text: "Gift Box" },
      { icon: Book, text: "Care Tips" },
      { icon: CheckCircle, text: "Jewellery Certificate" },
      { icon: Phone, text: "24x7 Customer Support" },
    ],
    youMayAlsoLike: [
      {
        id: "removable-diamond-dangle-huggies",
        name: "Removable Diamond Dangle Huggies",
        currentPrice: "2,260",
        originalPrice: "2,600",
        discount: "Save on versatile charm",
        rating: 4.7,
        reviews: 15,
        imageQuery: "14k gold huggie with removable diamond charm",
        badge: "VERSATILE",
        image: "https://www.candere.com/media/jewellery/images/C011659_1.jpeg",
      },
      {
        id: "starry-night-diamond-drop-hoops",
        name: "Starry Night Diamond Drop Hoops",
        currentPrice: "675",
        originalPrice: "750",
        discount: "—",
        rating: 4.9,
        reviews: 27,
        imageQuery: "starry night diamond drop hoop earrings",
        badge: "SUBTLE SPARKLE",
        image: "https://www.candere.com/media/jewellery/images/KC06684YG_1.jpeg",
      },
      {
        id: "diamond-hoop-with-dangle-charm",
        name: "Diamond Hoop with Dangle Charm",
        currentPrice: "1,275",
        originalPrice: "1,500",
        discount: "Save on elegance",
        rating: 4.8,
        reviews: 12,
        imageQuery: "diamond hoop earring with removable charm",
        badge: "CUSTOMIZABLE",
        image: "https://www.candere.com/media/jewellery/images/KC06683YG_1.jpeg",
      },
    ],
    priceBreakup: [
      { label: "Metal", value: "₹1,200" },
      { label: "Diamond", originalValue: "₹950", value: "₹900" },
      { label: "Making Charges", value: "₹200" },
      { label: "GST (3%)", value: "₹99" },
      { label: "Grand Total", value: "₹2,399", isGrandTotal: true },
    ],
  },
  {
    id: "elenai-gold-hoop-earrings",
    name: "Elenai Gold Hoop Earrings",
    inDemand: "20+ Shoppers bought this in the last 30 Days",
    rating: 4.7,
    reviews: 54,
    currentPrice: "12,463",
    originalPrice: "13,552",
    youSave: "1,089",
    badges: ["OUR PICK", "SHIPS IN 24 HRS"],
    images: [
      { src: "https://www.candere.com/media/jewellery/images/C025336_creative.jpeg?height=400&width=400", alt: "Elenai Gold Hoop Earrings Front" },
      { src: "https://www.candere.com/media/jewellery/images/C025336_model_creative.jpeg?height=400&width=400", alt: "Elenai Gold Hoop Earrings Side" },
      { src: "https://www.candere.com/media/jewellery/images/C025336_2.jpeg?height=400&width=400", alt: "Elenai Gold Hoop Earrings On Ear" },
      { src: "https://www.candere.com/media/jewellery/images/C025336_4.jpeg?height=400&width=400", alt: "Elenai Gold Hoop Earrings Dimensions" },
    ],
    description:
      "Make a statement with the Elenai Gold Hoop Earrings, designed in 14k gold. These earrings bring volume and edge to your look without compromising comfort. Crafted for women who prefer bold accessories that are still wearable, these hoops are excellent for styling with both sarees and dresses. Shine brighter in these gold earrings for girls or women who like to stand out with trendy hoop earrings.",
    productSummary: {
      styleNo: "GE01005",
      width: "0.25 cm (2.50 mm)",
      height: "1.6 cm (16.00 mm)",
      metalWeight: "1.51g",
      grossWeight: "1.51g",
    },
    metalDetails: "*A differential amount will be applicable with difference in weight if any.",
    includedWithPurchase: [
      { icon: Truck, text: "Free Domestic Shipping" },
      { icon: Gift, text: "Gift Box" },
      { icon: Book, text: "Care Tips" },
      { icon: CheckCircle, text: "Jewellery Certificate" },
      { icon: Phone, text: "24x7 Customer Support" },
    ],
    youMayAlsoLike: [
      {
        id: "dangling-diamond-hoop-earrings",
        name: "Dangling Diamond Hoop Earrings",
        currentPrice: "2,399",
        originalPrice: "2,999",
        discount: "SAVE 600",
        rating: 4.8,
        reviews: 37,
        imageQuery: "diamond hoop earrings",
        badge: "TRENDING",
        image: "https://www.candere.com/media/jewellery/images/C022008_1.jpg",
      },
      {
        id: "chandrak-diamond-stud-earrings",
        name: "Chandrak Diamond Stud Earrings",
        currentPrice: "18,750",
        originalPrice: "20,500",
        discount: "Save 10%",
        rating: 4.6,
        reviews: 22,
        imageQuery: "diamond stud earrings",
        badge: "BESTSELLER",
        image: "https://www.candere.com/media/jewellery/images/C011659_1.jpeg",
      },
    ],
    priceBreakup: [
      { label: "Metal", value: "₹6,000" },
      { label: "Diamond", originalValue: "₹5,450", value: "₹5,000" },
      { label: "Making Charges", value: "₹1,200" },
      { label: "GST (3%)", originalValue: "₹313", value: "₹263" },
      { label: "Grand Total", value: "₹12,463", isGrandTotal: true },
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}


