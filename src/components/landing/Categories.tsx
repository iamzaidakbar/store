'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const categories = [
  { id: 1, name: 'Electronics', image: '/categories/electronics.jpg' },
  { id: 2, name: 'Fashion', image: '/categories/fashion.jpg' },
  { id: 3, name: 'Home', image: '/categories/home.jpg' },
  { id: 4, name: 'Sports', image: '/categories/sports.jpg' },
]

export default function Categories() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-light mb-4">Shop by Category</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Find what you&apos;re looking for
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                href={`/products?category=${category.name.toLowerCase()}`}
                className="group block relative overflow-hidden rounded-lg aspect-square"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-light">{category.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 