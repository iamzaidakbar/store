'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/useAuthStore'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { login, isLoading } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      await login(email, password)
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="text-center"
        variants={itemVariants}
      >
        <h1 className="text-2xl font-light">LOGIN</h1>
        <p className="mt-2 text-sm text-gray-400">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-white hover:underline">
            Register
          </Link>
        </p>
      </motion.div>

      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6"
        variants={itemVariants}
      >
        {error && (
          <motion.div 
            className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {error}
          </motion.div>
        )}

        <motion.div 
          className="space-y-4"
          variants={itemVariants}
        >
          <motion.div
            whileTap={{ scale: 0.995 }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 bg-black border border-[#333] focus:border-white transition-colors text-white text-sm"
              required
            />
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.995 }}
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 bg-black border border-[#333] focus:border-white transition-colors text-white text-sm"
              required
            />
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex items-center justify-between text-sm"
          variants={itemVariants}
        >
          <label className="flex items-center text-gray-400">
            <input type="checkbox" className="mr-2 bg-black border-[#333]" />
            <span>Remember me</span>
          </label>
          <Link href="/forgot-password" className="text-white hover:underline">
            Forgot password?
          </Link>
        </motion.div>

        <motion.button
          type="submit"
          disabled={isLoading}
          className="w-full p-3 bg-white text-black hover:bg-gray-100 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          variants={itemVariants}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full"
            />
          ) : (
            'LOG IN'
          )}
        </motion.button>
      </motion.form>

      {/* Decorative elements */}
      <motion.div 
        className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </motion.div>
  )
} 