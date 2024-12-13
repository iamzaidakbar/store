'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface CartItem {
  id: string
  quantity: number
  product: {
    id: string
    name: string
    price: number
    images: string[]
  }
}

export default function CartPage() {
  const [cart, setCart] = useState<{ items: CartItem[] } | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart')
      if (!response.ok) {
        throw new Error('Failed to fetch cart')
      }
      const data = await response.json()
      setCart(data)
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST'
      })
      const data = await response.json()
      if (data.sessionId) {
        router.push(`/checkout?session_id=${data.sessionId}`)
      }
    } catch (error) {
      console.error('Checkout error:', error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {!cart?.items.length ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 bg-white p-4 rounded-lg shadow"
              >
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  width={100}
                  height={100}
                  className="object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-gray-600">
                    ${item.product.price.toFixed(2)} x {item.quantity}
                  </p>
                  <p className="font-semibold mt-1">
                    Total: ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="bg-white p-4 rounded-lg shadow h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-4">
              <span>Total</span>
              <span>
                ${cart.items
                  .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
                  .toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 