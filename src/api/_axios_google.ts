// src/api/_axios_google.ts
import axios from "axios"

const googleApi = axios.create({
  baseURL: "https://docs.google.com/spreadsheets",
  timeout: 5000
})

/*
  sheetId 試算表ID
  git     工作表ID，default 取第一個工作表
*/
export async function fetchSheet(sheetId: string, gid?: string) {
  const url = `d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid}`
  const res = await googleApi.get(url)
  const text = res.data
  const json = JSON.parse(text.substring(47, text.length - 2))
  return json
}
