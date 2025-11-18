import { defineStore } from "pinia";
import type { cartType } from "@/types";
import { useUserInfoStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { fetchCart as getCartFromServer, saveCart as setCartFromServer } from "@/api/cart";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartsDataList: [] as cartType[],
    loaded: false,
    errorMsg: null as string | null,
  }),

  actions: {
    addFromCart(data: cartType): boolean {
      const index = this.cartsDataList.findIndex((c) => c.SKUid === data.SKUid);
      if (index !== -1) {
        const afterQty = this.cartsDataList[index].buyQty + data.buyQty;

        // 超過庫存就返回 false
        if (afterQty > this.cartsDataList[index].stock) {
          this.errorMsg = "超過庫存數量";
          return false;
        }
        this.cartsDataList[index].buyQty = afterQty;
      } else {
        // 新增商品
        if (data.buyQty > data.stock) {
          this.errorMsg = "超過庫存數量";
          return false;
        }
        this.cartsDataList.push(data);
      }

      this.errorMsg = "";
      return true;
    },
    removeAllFromCart() {
      this.cartsDataList = [];
    },
    async fetchCart() {
      this.loaded = true;
      try {
        const data = await getCartFromServer();
        this.cartsDataList = data || [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        this.errorMsg = err.message;
        return false;
      } finally {
        this.loaded = false;
      }
    },
    async saveCart(newCartData?: cartType[]): Promise<boolean> {
      const userStore = useUserInfoStore();
      const { loginState, user } = storeToRefs(userStore);

      if (!loginState.value || !user.value?.uid) {
        this.errorMsg = "尚未登入";
        return false;
      }

      try {
        const cartToSave = newCartData ?? this.cartsDataList;

        if (!cartToSave.length) {
          this.errorMsg = "購物車是空的";
          return false;
        }
        console.log("cartToSave: ", cartToSave);

        const success = await setCartFromServer(cartToSave);

        if (success) {
          this.errorMsg = "";
          return true;
        } else {
          this.errorMsg = "上傳失敗";
          return false;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        this.errorMsg = err.message || "上傳過程發生錯誤";
        console.error("pushCartDb Error:", err);
        return false;
      }
    },
    async addAndSyncCart(data: cartType): Promise<boolean> {
      const previousCart = JSON.parse(JSON.stringify(this.cartsDataList))
      const added = this.addFromCart(data);
      if (!added) return false;
      const pushed = await this.saveCart();
      if (!pushed) {
        console.warn("購物車更新至雲端失敗，回滾本地狀態");
        this.cartsDataList = previousCart;
        return false;
      }
      return true;
    },
  },
});
