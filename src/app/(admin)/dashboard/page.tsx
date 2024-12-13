'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiUsers, FiPackage, FiShoppingBag, FiDollarSign } from 'react-icons/fi'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { title: 'Total Users', value: '1,234', icon: FiUsers },
    { title: 'Total Products', value: '456', icon: FiPackage },
    { title: 'Total Orders', value: '789', icon: FiShoppingBag },
    { title: 'Revenue', value: '$12,345', icon: FiDollarSign },
  ]

  const tabs = ['overview', 'users', 'products', 'orders']

  return (
    <div className="space-y-[var(--space-lg)]">
      <div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="title-lg"
        >
          ADMIN DASHBOARD
        </motion.h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-light mt-1 text-black dark:text-white">{stat.value}</p>
              </div>
              <stat.icon className="w-6 h-6 text-gray-400 dark:text-gray-600" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 text-sm tracking-wider border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-black dark:border-white text-black dark:text-white'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-4"
          >
            {/* Recent Activity */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <h2 className="text-lg font-light text-black dark:text-white mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div 
                    key={item}
                    className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-800 last:border-0"
                  >
                    <div>
                      <p className="text-sm text-black dark:text-white">New order #1234</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">2 minutes ago</p>
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">$123.45</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Add other tab contents as needed */}
      </div>
    </div>
  )
} 