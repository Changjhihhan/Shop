import { defineStore } from "pinia";
import { getProducts } from "@/api/products";
import type { productType } from "@/types";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [] as productType[],
    loaded: false,
    error: null as string | null,
  }),

  getters: {
    newProducts: (state) => state.products.filter((p) => p.isNew),
    byCategory: (state) => {
      return (category: string) =>
        state.products.filter((p) => p.categoryIdList?.includes(category));
    },
  },

  actions: {
    async fetchProducts() {
      this.loaded = true;
      this.error = null;
      try {
        this.products = await getProducts();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        this.error = e.message || "載入商品失敗";
      } finally {
        this.loaded = false;
      }
    },
  },
});
