import { customConfig } from "@/firebase/firebase-config";

export function getImageUrl(path: string) {
  const bucket = customConfig.storageDomain;
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(
    path
  )}?alt=media`;
}
