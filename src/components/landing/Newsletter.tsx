'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiCheck } from 'react-icons/fi'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 1000)
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto text-center"
        >
          <h2 className="text-3xl font-light mb-4">Stay Updated</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Subscribe to our newsletter for exclusive offers and updates
          </p>

          <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 
                  focus:ring-black dark:focus:ring-white dark:bg-gray-800 dark:border-gray-700"
                disabled={status === 'loading' || status === 'success'}
              />
              <FiMail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg
                hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Subscribing...' : 
               status === 'success' ? <FiCheck /> : 
               'Subscribe'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
} 