import * as functions from "firebase-functions";
import {admin, db} from "./firebase";

const defaultUserData = {
  vip: 1,
  totalSpent: 0,
};

type UserRecord = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
};

type UserData = typeof defaultUserData;

export const getUserInfo = functions.https.onRequest(async (req, res) => {
  // 設定 CORS
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  try {
    // 從 Header 讀取 Token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).send("缺少 Authorization header");
      return;
    }

    const idToken = authHeader.split("Bearer ")[1];

    const decoded = await admin.auth().verifyIdToken(idToken);

    const userRecord = await admin.auth().getUser(decoded.uid);

    const userRef = db.collection("users").doc(decoded.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      await userRef.set(defaultUserData);
    }

    // 🔹 取得資料並套用預設值（確保欄位完整）
    const userData = {
      ...defaultUserData,
      ...(userDoc.data() || {}),
    } as UserData;

    // 🔹 整合 Auth + Firestore
    const user: UserRecord & UserData = {
      uid: userRecord.uid,
      email: userRecord.email ?? "",
      displayName: userRecord.displayName ?? "",
      photoURL: userRecord.photoURL ?? "",
      ...userData,
    };

    res.json(user);
  } catch (error) {
    const err = error as Error;
    console.error("錯誤:", err.message);
    res.status(401).send(err.message || "驗證失敗");
  }
});
