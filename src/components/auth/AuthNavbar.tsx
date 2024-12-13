'use client'

import { motion } from 'framer-motion'
import { FiMoon, FiSun } from 'react-icons/fi'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function AuthNavbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<{ role: string } | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    // Check if token exists in cookies
    const token = document.cookie.includes('token=')
    setIsLoggedIn(token)
  }, [])

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch('/api/auth/me')
        if (res.ok) {
          const userData = await res.json()
          setUser(userData)
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
    }

    if (isLoggedIn) {
      checkUser()
    }
  }, [isLoggedIn])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setIsLoggedIn(false)
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const navContent = (
    <div className="container-px flex justify-between items-center h-[var(--navbar-height)]">
      <div className="flex items-center space-x-6">
        <Link 
          href="/" 
          className="text-sm tracking-[0.2em] font-light text-black dark:text-white hover:opacity-70 transition-opacity"
        >
          STORE
        </Link>
        {!isLoggedIn && (
          <>
            <div className="h-3 w-px bg-gray-200 dark:bg-gray-800" />
            <div className="flex items-center space-x-4 text-xs tracking-wider">
              <Link 
                href="/login" 
                className={`transition-colors ${
                  pathname === '/login'
                    ? 'text-black dark:text-white font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}
              >
                SIGN IN
              </Link>
              <Link 
                href="/register" 
                className={`transition-colors ${
                  pathname === '/register'
                    ? 'text-black dark:text-white font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}
              >
                REGISTER
              </Link>
            </div>
          </>
        )}
      </div>

      {mounted && (
        <div className="flex items-center space-x-4">
          {isLoggedIn && (
            <motion.button
              onClick={handleLogout}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              LOGOUT
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-8 h-8 flex items-center justify-center text-black dark:text-white hover:opacity-70 transition-opacity"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
          </motion.button>
          {isLoggedIn && user?.role === 'ADMIN' && (
            <Link 
              href="/admin/dashboard"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              ADMIN
            </Link>
          )}
        </div>
      )}
    </div>
  )

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      {navContent}
    </nav>
  )
} 