'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiHeart, FiUser } from 'react-icons/fi';
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { PiHandbagSimpleLight } from "react-icons/pi";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.header 
      className="fixed top-0 w-full bg-white/95 dark:bg-black/95 backdrop-blur-sm z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="h-16 flex items-center justify-between px-4 md:px-8">
        {/* Left - Menu Links */}
        <div className="hidden md:flex items-center space-x-6 text-xs tracking-widest">
          <NavLink href="/search" active={pathname === '/search'}>
            SEARCH
          </NavLink>
          <NavLink href="/new" active={pathname === '/new'}>
            NEW
          </NavLink>
          <NavLink href="/women" active={pathname === '/women'}>
            WOMEN
          </NavLink>
          <NavLink href="/men" active={pathname === '/men'}>
            MEN
          </NavLink>
        </div>

        {/* Center - Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-xl tracking-[0.2em] font-light">
          STORE
        </Link>

        {/* Right - Icons */}
        <div className="flex items-center space-x-6">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
            >
              <div className="w-5 h-5 relative">
                {theme === 'dark' ? (
                  <div className="absolute inset-0 transform transition-transform dark:rotate-0 rotate-90">
                    <IoSunnyOutline className='w-5 h-5' />
                  </div>
                ) : (
                  <div className="absolute inset-0 transform transition-transform dark:rotate-90 rotate-0">
                  <IoMoonOutline className='w-5 h-5' />
                  </div>
                )} {/* Theme Toggle */} 
              </div>
            </button>
          )}
          
          <Link href="/login" className="flex items-center space-x-2 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full">
            <FiUser className="w-4 h-4" />
            <span className="text-xs">PROFILE</span>
          </Link>

          <Link href="/favourites" className="flex items-center space-x-2 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full">
            <FiHeart className="w-4 h-4" />
            <span className="text-xs">FAVOURITES</span>
          </Link>
          
          <Link href="/cart" className="flex items-center space-x-2 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full relative">
            <PiHandbagSimpleLight />
            <span className="text-xs">SHOPPING BAG</span>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`py-2 hover:text-black dark:hover:text-white transition-colors ${
        active ? 'text-black dark:text-white' : 'text-gray-600 dark:text-gray-400'
      }`}
    >
      {children}
    </Link>
  );
} 