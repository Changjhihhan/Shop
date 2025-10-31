import { customConfig } from "@/firebase/firebase-config";

export function getImageUrl(path: string, name: string) {
  const bucket = customConfig.storageDomain;
  const allPath = encodeURIComponent(path + '/' + name);
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${allPath}?alt=media`;
}
