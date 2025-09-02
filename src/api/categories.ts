import { fetchSheet } from "./_axios_google";
import type { MenuNode } from "@/types";

const sheetId = "1JriVqLInZizTZs5ZgnRdm2kcmCapUF-E-sb6avvOV4E";

export async function getCategories() {
  const json = await fetchSheet(sheetId);

  const menuMap = new Map<string, MenuNode>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json.table.rows.slice(1).forEach((row: any) => {
    const category = row.c[0]?.v; // 分類中文
    const categoryId = row.c[1]?.v; // 分類ID
    const item = row.c[2]?.v; // 項目中文
    const itemId = row.c[3]?.v; // 項目ID

    if (!category || !categoryId || !item || !itemId) return;

    if (!menuMap.has(category)) {
      menuMap.set(category, {
        route: `/product/list/${categoryId}`,
        content: category,
        child: [
          {
            route: `/product/list/${categoryId}`,
            content: "顯示全部",
          },
        ],
      });
    }

    const parent = menuMap.get(category)!;
    const childList = parent.child ?? [];

    // 避免重複
    const exists = childList.some((node) => node.content === item);
    if (!exists) {
      childList.push({
        route: `/product/list/${categoryId}${itemId}`,
        content: item,
      });
    }

    parent.child = childList;
  });

  return Array.from(menuMap.values());
}
