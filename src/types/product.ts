export interface SKUtype {
  SKUid: string,
  color: string,
  imageName: string,
  productId: string,
  productName: string,
  size: string,
  status: boolean,
  stock: number,
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
  SKUs: SKUtype[],
}

export type productListType = productType[]
