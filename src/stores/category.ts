import { defineStore } from "pinia";
import type { MenuNode } from '@/types'

export const useCategoryStore = defineStore("category", {
  state: (): { categories: MenuNode[], loaded: boolean } => ({
    categories: [],
    loaded: false,
  }),
  actions: {
    async fetchCategories() {
      if (this.loaded) return;
      this.categories = [
        {
          route: "/product/list/woman",
          content: "女裝",
          child: [
            { route: "/product/list/woman", content: "顯示全部" },
            { route: "/product/list/1", content: "女針織衫" },
            { route: "/product/list/2", content: "女外套" },
          ],
        },
        {
          route: "/product/list/man",
          content: "男裝",
          child: [
            { route: "/product/list/man", content: "顯示全部" },
            { route: "/product/list/3", content: "男針織衫" },
            { route: "/product/list/4", content: "男外套" },
          ],
        },
      ];
      this.loaded = true;
    },
  },
});
