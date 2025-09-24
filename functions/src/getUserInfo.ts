import * as functions from "firebase-functions";
import {admin} from "./firebase";

interface UserInfo {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
}

export const getUserInfo = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  try {
    // 從 header 讀取 token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).send("缺少 Authorization header");
      return;
    }

    const idToken = authHeader.split("Bearer ")[1];

    // 驗證 token
    const decoded = await admin.auth().verifyIdToken(idToken);

    // 取得使用者資訊
    const userRecord = await admin.auth().getUser(decoded.uid);

    const user: UserInfo = {
      uid: userRecord.uid,
      email: userRecord.email ?? undefined,
      displayName: userRecord.displayName ?? undefined,
      photoURL: userRecord.photoURL ?? undefined,
    };

    res.json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(401).send(error.message);
    } else {
      res.status(401).send("驗證失敗");
    }
  }
});
