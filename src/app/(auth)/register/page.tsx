'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FiAlertCircle } from 'react-icons/fi'

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const router = useRouter()

  const validateForm = () => {
    const newErrors: FormErrors = {}
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter'
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter'
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number'
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    
    // Validate single field on blur
    const newErrors: FormErrors = { ...errors }
    
    switch (field) {
      case 'name':
        if (!formData.name.trim()) {
          newErrors.name = 'Name is required'
        } else if (formData.name.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters'
        } else {
          delete newErrors.name
        }
        break;
        
      case 'email':
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email'
        } else {
          delete newErrors.email
        }
        break;
        
      case 'password':
        if (!formData.password) {
          newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
          newErrors.password = 'Password must be at least 6 characters'
        } else if (!/(?=.*[a-z])/.test(formData.password)) {
          newErrors.password = 'Password must contain at least one lowercase letter'
        } else if (!/(?=.*[A-Z])/.test(formData.password)) {
          newErrors.password = 'Password must contain at least one uppercase letter'
        } else if (!/(?=.*\d)/.test(formData.password)) {
          newErrors.password = 'Password must contain at least one number'
        } else {
          delete newErrors.password
        }
        break;
        
      case 'confirmPassword':
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = 'Please confirm your password'
        } else if (formData.confirmPassword !== formData.password) {
          newErrors.confirmPassword = 'Passwords do not match'
        } else {
          delete newErrors.confirmPassword
        }
        break;
    }
    
    setErrors(newErrors)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError('')

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true
    })

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      router.push('/login?registered=true')
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const isFormComplete = () => {
    return formData.name.trim() !== '' && 
           formData.email.trim() !== '' && 
           formData.password.trim() !== '' && 
           formData.confirmPassword.trim() !== ''
  }

  return (
    <div className="space-y-[var(--space-lg)]">
      <div className="text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="title-lg"
        >
          CREATE ACCOUNT
        </motion.h1>
      </div>

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
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={() => handleBlur('name')}
              className="w-full px-4 py-3 bg-transparent border-b border-gray-200 dark:border-gray-800 
                text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                focus:border-gray-900 dark:focus:border-gray-100 focus:outline-none"
              placeholder="Full Name"
            />
            {touched.name && errors.name && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 dark:text-red-400 text-xs mt-1"
              >
                {errors.name}
              </motion.p>
            )}
          </div>

          <div className="space-y-1">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
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

          <div className="space-y-1">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={() => handleBlur('confirmPassword')}
              className="w-full px-4 py-3 bg-transparent border-b border-gray-200 dark:border-gray-800 
                text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                focus:border-gray-900 dark:focus:border-gray-100 focus:outline-none"
              placeholder="Confirm Password"
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 dark:text-red-400 text-xs mt-1"
              >
                {errors.confirmPassword}
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
            {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
          </motion.button>

          <Link 
            href="/login" 
            className="block text-center text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            SIGN IN INSTEAD
          </Link>
        </div>
      </form>
    </div>
  )
} 