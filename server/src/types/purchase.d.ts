export type TPurchase = {
  total: number
  paid_purchase: boolean
  providerId: number
  products: any
}

export type TProductPurchase = {
  barcode: string
  benefit: number
  cost: number
  quantity: number
}
