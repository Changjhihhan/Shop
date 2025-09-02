import { fetchSheet } from "./_axios_google";
import type { SKU } from "@/types";

const sheetId = "1rlrOw8gde_4Odv1xgoNdUoRIXC2tLrCDORCa1Y0-TmA";
const SKUsheetName = "532563123";

export async function getProducts() {
  const json = await fetchSheet(sheetId);
  const SKUjson = await fetchSheet(sheetId, SKUsheetName);

  const SKUrows = SKUjson.table.rows;

  const SKUs: Record<string, SKU[]> = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  SKUrows.forEach((row: any, index: number) => {
    if (index === 0) return;

    const key = row.c[0]?.v ?? "";
    if (!key) return;

    if (!SKUs[key]) SKUs[key] = []

    SKUs[key].push(
      {
        SKUid: row.c[2]?.v ?? "",
        stock: 0,
        size: row.c[4]?.v ?? "",
        color: row.c[3]?.v ?? "",
      }
    );
  });

  console.log("SKUrows: ", SKUrows);
  console.log("SKUs: ", SKUs);

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
    SKUs: SKUs[row.c[0]?.v ?? []],
  }));
}
