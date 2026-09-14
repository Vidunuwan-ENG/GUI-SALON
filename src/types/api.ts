export interface ApiError {
  message: string
  status?: number
  details?: string
}

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

export interface ProductQueryParams {
  limit?: number
  skip?: number
  select?: string
  sortBy?: string
  order?: 'asc' | 'desc'
}
