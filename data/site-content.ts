export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  materials: string;
  priceCents: number;
  currency: "USD";
  image: string;
  imageAlt: string;
  cropClass: `crop-${number}`;
  isDemo: true;
};

export const siteContent = {
  name: "Alena Studio",
  location: "San Diego, California",
  description:
    "Handcrafted leather and woven bags, designed in San Diego in considered, limited runs.",
  announcement: "Preview · Shipping policy to be confirmed",
  contactEmail: null,
  instagramUrl: null,
  pinterestUrl: null,
  isDemo: true,
} as const;

export const products: Product[] = [
  {
    id: "demo-sol-tote",
    slug: "the-sol-tote",
    name: "The Sol Tote",
    description: "A structured woven tote framed in dark leather.",
    materials: "Handwoven palm · Italian leather",
    priceCents: 28500,
    currency: "USD",
    image: "/images/alena-collection.png",
    imageAlt: "Woven tote with dark leather trim on an ivory stone plinth",
    cropClass: "crop-0",
    isDemo: true,
  },
  {
    id: "demo-mar-clutch",
    slug: "the-mar-clutch",
    name: "The Mar Clutch",
    description: "A softly structured shoulder bag in warm ivory leather.",
    materials: "Soft ivory leather",
    priceCents: 24000,
    currency: "USD",
    image: "/images/alena-collection.png",
    imageAlt: "Ivory leather shoulder bag photographed in warm natural light",
    cropClass: "crop-1",
    isDemo: true,
  },
  {
    id: "demo-cielo-bag",
    slug: "the-cielo-bag",
    name: "The Cielo Bag",
    description: "A cognac leather bag with a softly curved silhouette.",
    materials: "Cognac leather · Braided handle",
    priceCents: 32000,
    currency: "USD",
    image: "/images/alena-collection.png",
    imageAlt: "Cognac leather bag with braided handle on an ivory stone plinth",
    cropClass: "crop-2",
    isDemo: true,
  },
];

export function formatPrice(product: Product) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.currency,
    maximumFractionDigits: 0,
  }).format(product.priceCents / 100);
}
