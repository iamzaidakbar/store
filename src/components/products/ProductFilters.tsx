'use client'

import { useState, useEffect } from 'react'

interface ProductFiltersProps {
  onCategoryChange: (category: string | undefined) => void
  onPriceRangeChange: (range: { min?: number; max?: number }) => void
}

const categories = [
  'All',
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports'
]

export default function ProductFilters({
  onCategoryChange,
  onPriceRangeChange
}: ProductFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [priceRange, setPriceRange] = useState({
    min: '',
    max: ''
  })

  useEffect(() => {
    onCategoryChange(selectedCategory === 'All' ? undefined : selectedCategory)
  }, [selectedCategory, onCategoryChange])

  useEffect(() => {
    onPriceRangeChange({
      min: priceRange.min ? Number(priceRange.min) : undefined,
      max: priceRange.max ? Number(priceRange.max) : undefined
    })
  }, [priceRange, onPriceRangeChange])

  return (
    <div className="w-64 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`block w-full text-left px-3 py-2 rounded ${
                selectedCategory === category
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Price Range</h3>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Min Price"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange((prev) => ({ ...prev, min: e.target.value }))
            }
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange((prev) => ({ ...prev, max: e.target.value }))
            }
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      </div>
    </div>
  )
} 