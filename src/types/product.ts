export interface SKU {
  readonly SKUid: string,
  stock: number,
  size?: string,
  color?: string,
}

export interface productType {
  readonly id: string,
  name: string,
  price: number,
  activityPrice?: number,
  content: string,
  isNew?: boolean,
  index?: number,
  categoryIdList?: string[],
  SKUs: SKU[],
}

export type productListType = productType[]
