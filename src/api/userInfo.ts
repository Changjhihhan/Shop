import { fetchFirebase } from "./_axios_firebase";
import type { User } from "firebase/auth";

export async function getUserInfo() {
  console.log("in getUserInfo")
  try {
    const res = await fetchFirebase<User>("get", "/getUserInfo");
    return res
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    return null;
  }
}
