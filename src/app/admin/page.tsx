'use client'

import { useAuthStore } from '@/store/useAuthStore'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Product } from '@prisma/client'

export default function AdminPanel() {
  const { user } = useAuthStore()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      router.push('/login')
      return
    }

    fetchProducts()
  }, [user, router])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteProduct = async (productId: string) => {
    try {
      await fetch(`/api/products/${productId}`, { method: 'DELETE' })
      setProducts(products.filter((p) => p.id !== productId))
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
          >
            <div>
              <h2 className="font-semibold">{product.name}</h2>
              <p className="text-gray-600">${Number(product.price).toFixed(2)}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                className="btn-secondary"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="btn-primary bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 