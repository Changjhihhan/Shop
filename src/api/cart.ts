import { fetchFirebase } from "./_axios_firebase";
import type { cartType } from "@/types";

export async function fetchCart() {
  try {
    const res = await fetchFirebase<cartType[]>("get", "/getCart");
    return res;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    return null;
  }
}

export async function saveCart(items: cartType[]) {
  try {
    const res = await fetchFirebase("post", "/saveCart", { items });
    return res;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    return null;
  }
}
