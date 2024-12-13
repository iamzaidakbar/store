'use client'

import { motion } from 'framer-motion'
import { useProducts } from '@/hooks/useProducts'
import ProductCard from '@/components/products/ProductCard'

export default function FeaturedProducts() {
  const { products } = useProducts()
  const featuredProducts = products?.slice(0, 4)

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-light mb-4">Featured Products</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Discover our most popular items
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts?.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 