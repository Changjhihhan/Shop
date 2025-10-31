import * as functions from "firebase-functions";
import {admin, db} from "./firebase";

export const saveCart = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).send("缺少 Authorization header");
      return;
    }

    const idToken = authHeader.split("Bearer ")[1];
    const decoded = await admin.auth().verifyIdToken(idToken);

    const {items} = req.body; // 前端傳購物車陣列
    if (!Array.isArray(items)) {
      res.status(400).send("items 必須是陣列");
      return;
    }

    await db.collection("cart").doc(decoded.uid).set({
      items,
      updatedAt: new Date().toISOString(),
    });

    res.json({success: true});
  } catch (error) {
    res.status(500).send((error as Error).message || "儲存購物車失敗");
  }
});
