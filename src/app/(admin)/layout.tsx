'use client'

import { motion } from 'framer-motion'
import AuthNavbar from '@/components/auth/AuthNavbar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <AuthNavbar />
      
      <div className="page-pt min-h-screen flex flex-col container-px py-[var(--space-xl)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
} 