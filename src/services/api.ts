import type { Product, ProductResponse } from '@/types/product'
import type { CategoryItem } from '@/types/category'
import type { AuthResponse, LoginCredentials, User } from '@/types/auth'
import type { ApiError, ProductQueryParams } from '@/types/api'

const BASE_URL = 'https://dummyjson.com'

/**
 * Standard typed API request helper
 */
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`
  const headers = new Headers(options.headers || {})

  if (!headers.has('Content-Type') && options.method && options.method !== 'GET') {
    headers.set('Content-Type', 'application/json')
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers
    })

    if (!response.ok) {
      let errorMessage = `HTTP error ${response.status}: ${response.statusText}`
      try {
        const errorJson = (await response.json()) as { message?: string }
        if (errorJson.message) {
          errorMessage = errorJson.message
        }
      } catch {
        // Response was not JSON
      }

      const apiError: ApiError = {
        message: errorMessage,
        status: response.status
      }
      throw apiError
    }

    const data = (await response.json()) as T
    return data
  } catch (error: unknown) {
    // Offline resilience: If network fetch fails on /products, attempt fallback to local /dummy.json
    if (endpoint.startsWith('/products')) {
      try {
        const localRes = await fetch('/dummy.json')
        if (localRes.ok) {
          const localData = (await localRes.json()) as ProductResponse
          if (endpoint === '/products' || endpoint.startsWith('/products?')) {
            return localData as T
          } else if (endpoint.startsWith('/products/category/')) {
            const cat = decodeURIComponent(endpoint.replace('/products/category/', '').split('?')[0] || '')
            const filtered = localData.products.filter((p) => p.category.toLowerCase() === cat.toLowerCase())
            const res: ProductResponse = {
              products: filtered,
              total: filtered.length,
              skip: 0,
              limit: filtered.length
            }
            return res as T
          } else if (endpoint.startsWith('/products/search')) {
            const urlObj = new URL(`http://dummy${endpoint}`)
            const q = (urlObj.searchParams.get('q') || '').toLowerCase()
            const filtered = localData.products.filter(
              (p) =>
                p.title.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q)
            )
            const res: ProductResponse = {
              products: filtered,
              total: filtered.length,
              skip: 0,
              limit: filtered.length
            }
            return res as T
          } else if (endpoint.startsWith('/products/')) {
            const idPart = endpoint.replace('/products/', '').split('?')[0] || '0'
            const idNum = Number(idPart)
            const found = localData.products.find((p) => p.id === idNum)
            if (found) return found as T
          }
        }
      } catch {
        // Fall through to error
      }
    }

    if (error && typeof error === 'object' && 'message' in error) {
      const err = error as ApiError
      throw err
    }
    const fallbackError: ApiError = {
      message: error instanceof Error ? error.message : 'Network request failed. Please check your internet connection.'
    }
    throw fallbackError
  }
}

/**
 * Product API Services
 */
export const productService = {
  /**
   * Fetch paginated products
   */
  async getProducts(params?: ProductQueryParams): Promise<ProductResponse> {
    const query = new URLSearchParams()
    if (params?.limit !== undefined) query.append('limit', params.limit.toString())
    if (params?.skip !== undefined) query.append('skip', params.skip.toString())
    if (params?.sortBy) query.append('sortBy', params.sortBy)
    if (params?.order) query.append('order', params.order)

    const queryString = query.toString() ? `?${query.toString()}` : ''
    return fetchApi<ProductResponse>(`/products${queryString}`)
  },

  /**
   * Fetch single product by ID
   */
  async getProductById(id: number | string): Promise<Product> {
    return fetchApi<Product>(`/products/${id}`)
  },

  /**
   * Search products by query string
   */
  async searchProducts(query: string, limit: number = 30): Promise<ProductResponse> {
    const encoded = encodeURIComponent(query.trim())
    return fetchApi<ProductResponse>(`/products/search?q=${encoded}&limit=${limit}`)
  },

  /**
   * Fetch all product categories
   */
  async getCategories(): Promise<CategoryItem[]> {
    const response = await fetchApi<CategoryItem[] | string[]>('/products/categories')
    // DummyJSON v2 returns CategoryItem objects, fallback to string formatting if strings
    return response.map((item) => {
      if (typeof item === 'string') {
        return {
          slug: item,
          name: item.charAt(0).toUpperCase() + item.slice(1).replace(/-/g, ' '),
          url: `https://dummyjson.com/products/category/${item}`
        }
      }
      return item
    })
  },

  /**
   * Fetch products by category slug
   */
  async getProductsByCategory(category: string, limit: number = 30): Promise<ProductResponse> {
    return fetchApi<ProductResponse>(`/products/category/${encodeURIComponent(category)}?limit=${limit}`)
  }
}

/**
 * Authentication API Services
 */
export const authService = {
  /**
   * Login user with credentials
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return fetchApi<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
        expiresInMins: credentials.expiresInMins || 60
      })
    })
  },

  /**
   * Get current authenticated user profile using token
   */
  async getCurrentUser(token: string): Promise<User> {
    return fetchApi<User>('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
