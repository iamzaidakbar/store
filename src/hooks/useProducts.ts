import { Product } from '@prisma/client'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useProducts(category?: string, minPrice?: number, maxPrice?: number) {
  const params = new URLSearchParams()
  if (category) params.append('category', category)
  if (minPrice) params.append('minPrice', minPrice.toString())
  if (maxPrice) params.append('maxPrice', maxPrice.toString())

  const { data, error, isLoading } = useSWR<Product[]>(
    `/api/products?${params.toString()}`,
    fetcher
  )

  return {
    products: data,
    isLoading,
    isError: error
  }
} 