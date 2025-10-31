import * as functions from "firebase-functions";
import {admin, db} from "./firebase";

export const getCart = functions.https.onRequest(async (req, res) => {
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

    const cartDoc = await db.collection("cart").doc(decoded.uid).get();

    if (!cartDoc.exists) {
      res.json([]);
    } else {
      res.json(cartDoc.data()?.items);
    }
  } catch (error) {
    res.status(500).send((error as Error).message || "取得購物車失敗");
  }
});
