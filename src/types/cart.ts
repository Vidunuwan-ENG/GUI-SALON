import type { Product } from './product'

export interface CartItem {
  product: Product
  quantity: number
  addedAt: number
}

export interface CartSummary {
  itemCount: number
  subtotal: number
  discountTotal: number
  shipping: number
  tax: number
  grandTotal: number
}
