'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUser, FiPackage, FiList, FiLogIn, FiAlertCircle } from 'react-icons/fi'

type EndpointType = 'register' | 'login' | 'createProduct' | 'getProducts'

interface ApiResult {
  endpoint: EndpointType
  data?: Record<string, unknown>
  error?: string
}

interface TestCard {
  id: EndpointType
  title: string
  description: string
  icon: React.ReactNode
  method: string
}

interface ErrorResponse {
  error: string;
}

export default function TestAPI() {
  const [result, setResult] = useState<ApiResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('test@example.com')
  const [password, setPassword] = useState('password123')

  const testEndpoints = {
    register: async () => {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          name: 'Test User'
        })
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error((data as ErrorResponse).error || `HTTP error! status: ${response.status}`)
      }
      return data
    },

    login: async () => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error((data as ErrorResponse).error || `HTTP error! status: ${response.status}`)
      }
      return data
    },

    createProduct: async () => {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test Product',
          description: 'Test Description',
          price: 99.99,
          images: ['https://picsum.photos/200'],
          category: 'Electronics',
          stock: 10
        })
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error((data as ErrorResponse).error || `HTTP error! status: ${response.status}`)
      }
      return data
    },

    getProducts: async () => {
      const response = await fetch('/api/products')
      const data = await response.json()
      if (!response.ok) {
        throw new Error((data as ErrorResponse).error || `HTTP error! status: ${response.status}`)
      }
      return data
    }
  }

  const testCards: TestCard[] = [
    {
      id: 'register',
      title: 'Register User',
      description: 'Test user registration endpoint',
      icon: <FiUser className="w-6 h-6" />,
      method: 'POST'
    },
    {
      id: 'login',
      title: 'Login User',
      description: 'Test user login endpoint',
      icon: <FiLogIn className="w-6 h-6" />,
      method: 'POST'
    },
    {
      id: 'createProduct',
      title: 'Create Product',
      description: 'Test product creation endpoint',
      icon: <FiPackage className="w-6 h-6" />,
      method: 'POST'
    },
    {
      id: 'getProducts',
      title: 'Get Products',
      description: 'Test product retrieval endpoint',
      icon: <FiList className="w-6 h-6" />,
      method: 'GET'
    }
  ]

  const handleTest = async (endpoint: EndpointType) => {
    setLoading(true)
    setResult(null)
    try {
      const data = await testEndpoints[endpoint]()
      setResult({ endpoint, data })
    } catch (error) {
      console.error('API call failed:', error)
      setResult({ 
        endpoint, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4 sm:px-6 lg:px-8"
    >
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
      >
        API Testing Dashboard
      </motion.h1>
      
      <motion.div 
        className="max-w-md mx-auto mb-8 bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-200">Test Credentials</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100"
            />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
        {testCards.map((card, index) => (
          <motion.div
            key={`card-${card.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer border border-gray-700 hover:border-blue-500 transition-colors"
            onClick={() => handleTest(card.id)}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500 bg-opacity-20 rounded-lg text-blue-400">
                {card.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-200">{card.title}</h3>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500 bg-opacity-20 text-blue-400">
                    {card.method}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{card.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode='wait'>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center"
          >
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
          </motion.div>
        )}

        {result && (
          <motion.div
            key={`result-${result.endpoint}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-800 rounded-xl shadow-lg p-6 overflow-hidden max-w-4xl mx-auto border border-gray-700"
          >
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-semibold text-gray-200">
                Response: {result.endpoint}
              </h2>
              {result.error && (
                <FiAlertCircle className="text-red-400 w-5 h-5" />
              )}
            </div>
            {result.error ? (
              <div className="text-red-400 bg-red-500 bg-opacity-10 p-4 rounded-lg border border-red-500 border-opacity-50">
                {result.error}
              </div>
            ) : (
              <pre className="bg-gray-900 p-4 rounded-lg overflow-auto max-h-96 text-gray-300">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
} 