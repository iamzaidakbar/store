'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi'

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const router = useRouter()
  const searchParams = useSearchParams()
  const registered = searchParams.get('registered')

  const validateForm = () => {
    const newErrors: FormErrors = {}
    
    // Email validation
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email'
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError('')

    if (!validateForm()) return

    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        router.push('/')
        return
      }

      setServerError(res.statusText)
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const isFormComplete = () => {
    return email.trim() !== '' && password.trim() !== ''
  }

  return (
    <div className="space-y-[var(--space-lg)]">
      <div className="text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="title-lg"
        >
          SIGN IN
        </motion.h1>
      </div>

      <AnimatePresence mode='wait'>
        {registered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-green-600 dark:text-green-400 text-center text-sm"
          >
            <FiCheckCircle className="w-5 h-5 mx-auto mb-2" />
            Account created successfully
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence mode='wait'>
          {serverError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-red-500 dark:text-red-400 text-center text-sm"
            >
              <FiAlertCircle className="w-5 h-5 mx-auto mb-2" />
              {serverError}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-4">
          <div className="space-y-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur('email')}
              className="w-full px-4 py-3 bg-transparent border-b border-gray-200 dark:border-gray-800 
                text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                focus:border-gray-900 dark:focus:border-gray-100 focus:outline-none"
              placeholder="Email"
            />
            {touched.email && errors.email && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 dark:text-red-400 text-xs mt-1"
              >
                {errors.email}
              </motion.p>
            )}
          </div>

          <div className="space-y-1">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur('password')}
              className="w-full px-4 py-3 bg-transparent border-b border-gray-200 dark:border-gray-800 
                text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                focus:border-gray-900 dark:focus:border-gray-100 focus:outline-none"
              placeholder="Password"
            />
            {touched.password && errors.password && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 dark:text-red-400 text-xs mt-1"
              >
                {errors.password}
              </motion.p>
            )}
          </div>
        </div>

        <div className="pt-4 space-y-4">
          <motion.button
            type="submit"
            whileHover={{ scale: !loading && isFormComplete() ? 1.01 : 1 }}
            whileTap={{ scale: !loading && isFormComplete() ? 0.99 : 1 }}
            className={`w-full py-3 text-sm tracking-wider transition-all
              ${isFormComplete() 
                ? 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100' 
                : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'}
              ${loading ? 'opacity-50' : ''}`}
            disabled={loading || !isFormComplete()}
          >
            {loading ? 'SIGNING IN...' : 'SIGN IN'}
          </motion.button>

          <Link 
            href="/register" 
            className="block text-center text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            CREATE ACCOUNT
          </Link>
        </div>
      </form>
    </div>
  )
} 