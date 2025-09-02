import { defineStore } from "pinia";
import type { MenuNode } from '@/types'
import { getCategories } from '@/api/categories'

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: [] as MenuNode[],
    loaded: false,
    error: null as string | null,
  }),
  actions: {
    async fetchCategories() {
      this.loaded = true;
      this.error = null;
      try {
        this.categories = await getCategories();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        this.error = e.message || "載入商品類別失敗";
      } finally {
        this.loaded = false;
      }
    },
  },
});
