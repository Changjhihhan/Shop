export interface productItem {
  name: string,
  id: string,
  content: string,
  price: number,
  isNew?: boolean
}

export type productList = productItem[]
