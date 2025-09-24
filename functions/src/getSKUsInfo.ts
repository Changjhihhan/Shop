import * as functions from "firebase-functions";
import {db} from "./firebase";

export const getSKUsInfo = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  try {
    const snapshot = await db.collection("SKUs").get();

    if (snapshot.empty) {
      res.status(404).send("沒有任何商品");
      return;
    }

    // 把 snapshot 轉成陣列
    interface SKUtype {
      SKUid: string,
      color: string,
      imageName: string,
      productId: string,
      productName: string,
      size: string,
      status: boolean,
      stock: number,
    }

    const result: SKUtype[] = [];
    snapshot.forEach((doc: any) => {
      result.push({
        SKUid: doc.id,
        ...doc.data(),
      });
    });

    res.json(result);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});
