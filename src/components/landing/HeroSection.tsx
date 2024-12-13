'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface FloatingShape {
  id: number
  left: string
  top: string
}

export default function HeroSection() {
  const [shapes, setShapes] = useState<FloatingShape[]>([])

  useEffect(() => {
    // Generate random positions after component mounts
    setShapes(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }))
    )
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-500/20 to-pink-500/20"
        animate={{
          background: [
            'linear-gradient(to bottom right, rgba(37, 99, 235, 0.2), rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))',
            'linear-gradient(to bottom right, rgba(236, 72, 153, 0.2), rgba(37, 99, 235, 0.2), rgba(168, 85, 247, 0.2))',
            'linear-gradient(to bottom right, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2), rgba(37, 99, 235, 0.2))',
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {shapes.map((shape) => (
          <motion.div
            key={shape.id}
            className="absolute w-16 h-16 bg-white/5 rounded-full"
            style={{
              left: shape.left,
              top: shape.top,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm"
              >
                ✨ Welcome to the Future of Shopping
              </motion.div>
              <h1 className="text-5xl lg:text-7xl font-light tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                Discover the Next Level of
                <span className="block mt-2 font-normal bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                  AI-Powered Shopping
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-xl mx-auto lg:mx-0">
                Experience personalized recommendations and seamless shopping powered by cutting-edge AI technology.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/products"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full
                    hover:bg-gray-100 transition-colors group font-medium"
                >
                  Explore Products
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/ai-assistant"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full
                    border border-white/20 hover:bg-white/10 transition-colors"
                >
                  Try AI Assistant
                </Link>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-8 pt-8"
            >
              {[
                { label: 'Active Users', value: '10K+' },
                { label: 'Products', value: '5K+' },
                { label: 'AI Interactions', value: '1M+' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image/Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square max-w-xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl" />
            <Image
              src="/hero-product.png"
              alt="AI Shopping Experience"
              fill
              className="object-contain relative z-10"
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-1 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
} 