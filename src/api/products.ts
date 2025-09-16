import { fetchSheet } from "./_axios_google";
import { fetchFirebase } from "./_axios_firebase";
import type { SKUtype } from "@/types";

const productSheetId = "1rlrOw8gde_4Odv1xgoNdUoRIXC2tLrCDORCa1Y0-TmA";

export async function getProducts() {
  const json = await fetchSheet(productSheetId);
  const SKUs = await fetchFirebase<SKUtype[]>("get", "/getSKUsInfo");

  const SKUsByProduct: Record<string, SKUtype[]> = {};
  SKUs.forEach((SKUitem) => {
    if (!SKUsByProduct[SKUitem.productId]) {
      SKUsByProduct[SKUitem.productId] = [];
    }
    SKUsByProduct[SKUitem.productId].push(SKUitem);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return json.table.rows.map((row: any) => ({
    id: String(row.c[0]?.v ?? ""),
    name: row.c[1]?.v ?? "",
    price: row.c[2]?.v ?? 0,
    activityPrice: row.c[3]?.v ?? 0,
    content: row.c[4]?.v ?? "",
    isNew: row.c[5]?.v ?? false,
    index: row.c[6]?.v ?? 0,
    categoryIdList: [row.c[8]?.v[0], row.c[8]?.v],
    SKUs: SKUsByProduct[row.c[0]?.v ?? []],
  }));
}
