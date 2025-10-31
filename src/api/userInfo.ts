import { fetchFirebase } from "./_axios_firebase";
import type { userInfoType } from "@/types";

export async function getUserInfo() {
  try {
    const res = await fetchFirebase<userInfoType>("get", "/getUserInfo");
    return res
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    return null;
  }
}
