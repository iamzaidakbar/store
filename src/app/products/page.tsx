'use client'

import ProductCard from '@/components/products/ProductCard'
import ProductFilters from '@/components/products/ProductFilters'
import { useProducts } from '@/hooks/useProducts'
import { useState } from 'react'

export default function ProductsPage() {
  const [category, setCategory] = useState<string>()
  const [priceRange, setPriceRange] = useState<{ min?: number; max?: number }>({})
  const { products, isLoading } = useProducts(
    category,
    priceRange.min,
    priceRange.max
  )

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="container py-8">
      <div className="flex gap-8">
        <ProductFilters
          onCategoryChange={setCategory}
          onPriceRangeChange={setPriceRange}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
} 