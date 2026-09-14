export interface CategoryItem {
  slug: string
  name: string
  url: string
}

export type SortField = 'default' | 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc'

export interface SortOption {
  label: string
  value: SortField
}

export interface FilterState {
  searchQuery: string
  selectedCategory: string
  sortBy: SortField
  minPrice?: number
  maxPrice?: number
}
