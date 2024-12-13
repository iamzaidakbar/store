'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <motion.header 
      className="fixed top-0 w-full bg-white shadow-sm z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Store
        </Link>
        
        <div className="flex items-center gap-6">
          <Link 
            href="/products" 
            className={`hover:text-blue-600 ${
              pathname === '/products' ? 'text-blue-600' : ''
            }`}
          >
            Products
          </Link>
          <Link 
            href="/cart" 
            className={`hover:text-blue-600 ${
              pathname === '/cart' ? 'text-blue-600' : ''
            }`}
          >
            Cart
          </Link>
        </div>
      </nav>
    </motion.header>
  );
} 