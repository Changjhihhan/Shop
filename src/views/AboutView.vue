<script setup lang="ts">
import { onMounted } from "vue"

// 你的試算表 ID
const sheetId = "1rlrOw8gde_4Odv1xgoNdUoRIXC2tLrCDORCa1Y0-TmA"

onMounted(async () => {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`
  const res = await fetch(url)
  const text = await res.text()
  // Google 會多包一些字，要切掉才能變成 JSON
  const json = JSON.parse(text.substring(47, text.length - 2))

  console.log(parseSheet(json))
})

type GoogleSheetColumnType = "string" | "number" | "boolean" | "date" | "datetime" | "timeofday"

interface GoogleSheetColumn {
  id: string
  label: string
  type: GoogleSheetColumnType
}

interface GoogleSheetCell {
  v: string | number | boolean | null | string[]
  f?: string
}

interface GoogleSheetRow {
  c: (GoogleSheetCell | null)[]
}

interface GoogleSheetResponse {
  table: {
    cols: GoogleSheetColumn[]
    rows: GoogleSheetRow[]
  }
}

function parseSheet(json: GoogleSheetResponse) {
  const headers = json.table.cols.map(col => col.label)

  return json.table.rows.map(row => {
    const obj: Record<string, string | number | boolean | null | string[]> = {}

    row.c.forEach((cell, i) => {
      let value = cell ? cell.v : null

      // 特別處理 category 欄位 → 拆成陣列
      if (headers[i] === "category" && typeof value === "string") {
        value = value.split(",").map(v => v.trim())
      }

      // 特別處理 id → 轉成字串
      if (headers[i] === "id" && value != null) {
        value = String(value)
      }

      obj[headers[i]] = value
    })

    return obj
  })
}

</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
</style>
