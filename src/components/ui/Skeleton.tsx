'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

export function Skeleton({ 
  className, 
  ...props 
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className={cn("bg-gray-200 dark:bg-gray-800 rounded-md", className)}
      {...props}
    />
  )
} 