'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/useAuthStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { register, isLoading } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      await register(email, password, name)
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
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
        <h1 className="text-2xl font-light">CREATE ACCOUNT</h1>
        <p className="mt-2 text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-white hover:underline">
            Login
          </Link>
        </p>
      </motion.div>

      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6"
        variants={itemVariants}
      >
        <AnimatePresence>
          {error && (
            <motion.div 
              className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="space-y-4"
          variants={itemVariants}
        >
          {[
            { value: name, setter: setName, placeholder: 'Full Name', type: 'text' },
            { value: email, setter: setEmail, placeholder: 'Email', type: 'email' },
            { value: password, setter: setPassword, placeholder: 'Password', type: 'password' }
          ].map((field, index) => (
            <motion.div
              key={field.placeholder}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.995 }}
            >
              <input
                type={field.type}
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                placeholder={field.placeholder}
                className="w-full p-3 bg-black border border-[#333] focus:border-white transition-colors text-white text-sm"
                required
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-sm text-gray-400"
          variants={itemVariants}
        >
          By creating an account, you agree to our{' '}
          <Link href="/terms" className="text-white hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-white hover:underline">
            Privacy Policy
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
            'CREATE ACCOUNT'
          )}
        </motion.button>
      </motion.form>

      {/* Decorative elements */}
      <motion.div 
        className="fixed bottom-0 right-0 w-1 h-full bg-gradient-to-t from-transparent via-white to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </motion.div>
  )
} 