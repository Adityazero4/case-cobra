//bg-blue-950 border-blue-950
//bg-zinc-900 border-zinc-900
//bg-rose-950 border-rose-950

import { PRODUCTS_PRICES } from "@/config/products";
import { Description } from "@radix-ui/react-toast";

export const COLORS = [
  {
    label: "Black",
    value: "black",
    tw: "zinc-900",
  },
  {
    label: "Blue",
    value: "blue",
    tw: "blue-950",
  },
  {
    label: "Rose",
    value: "rose",
    tw: "rose-950",
  },
] as const;

export const MODELS = {
  name: "modes",
  options: [
    {
      label: "iphone X",
      value: "iphonex",
    },
    {
      label: "iphone 11",
      value: "iphone11",
    },
    {
      label: "iphone 12",
      value: "iphonex12",
    },
    {
      label: "iphone 13",
      value: "iphonex13",
    },
    {
      label: "iphone 14",
      value: "iphonex14",
    },
    {
      label: "iphone 15",
      value: "iphonex15",
    },
  ],
} as const;

export const MATERIALS = {
  name: "material",
  options: [
    {
      label: "Silicone",
      value: "silicone",
      description: undefined,
      price: PRODUCTS_PRICES.material.silicone,
    },
    {
      label: "Soft Polycarbonate",
      value: "polycarbonate",
      description: "Scratch-resistant coating",
      price: PRODUCTS_PRICES.material.polycabonate,
    },
  ],
} as const;

export const FINISHES = {
  name: "finish",
  options: [
    {
      label: "Smooth Finish",
      value: "smooth",
      description: undefined,
      price: PRODUCTS_PRICES.finish.smooth,
    },
    {
      label: "Textured Finish",
      value: "textured",
      description: "Soft grippy texture",
      price: PRODUCTS_PRICES.finish.textured,
    },
  ],
} as const;
