import type { SKUtype } from "@/types";

export type cartType = SKUtype & {
  buyQty: number;
};