export interface productType {
  id: string,
  name: string,
  price: number,
  activityPrice?: number,
  content: string,
  isNew?: boolean,
  index?: number,
  category?: string[]
}

export type productListType = productType[]
