'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

export default function AuthNavbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  
  return (
    <motion.header 
      className="fixed top-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left - Logo */}
        <Link href="/" className="text-2xl font-light">
          STORE
        </Link>

        {/* Right - Theme Toggle & Auth Links */}
        <div className="flex items-center gap-6">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? 180 : 0 }}
            >
              <div className="w-5 h-5 relative">
                <div className="absolute inset-0 transform transition-transform dark:rotate-0 rotate-90">
                  🌞
                </div>
                <div className="absolute inset-0 transform transition-transform dark:rotate-90 rotate-0">
                  🌙
                </div>
              </div>
            </motion.div>
          </button>

          {/* Auth Links */}
          <div className="flex items-center gap-6">
            <AuthLink href="/login" active={pathname === '/login'}>
              Sign In
            </AuthLink>
            <AuthLink href="/register" active={pathname === '/register'}>
              Create Account
            </AuthLink>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}

function AuthLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`relative py-2 text-sm transition-colors ${
        active ? 'text-black dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
      }`}
    >
      {children}
      {active && (
        <motion.div
          layoutId="auth-navbar-indicator"
          className="absolute -bottom-[1.5px] left-0 right-0 h-[2px] bg-black dark:bg-white"
          transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
        />
      )}
    </Link>
  )
} 