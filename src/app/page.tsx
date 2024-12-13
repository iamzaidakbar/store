import Categories from '@/components/landing/Categories'
import FeaturedProducts from '@/components/landing/FeaturedProducts'
import HeroSection from '@/components/landing/HeroSection'
import Newsletter from '@/components/landing/Newsletter'
import { CategoriesSkeleton, ProductsSkeleton } from '@/components/skeletons/LandingSkeletons'
import { Suspense } from 'react'

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Load immediately */}
      <HeroSection />

      {/* Featured Products - Lazy loaded with skeleton */}
      <Suspense fallback={<ProductsSkeleton />}>
        <FeaturedProducts />
      </Suspense>

      {/* Categories - Lazy loaded with skeleton */}
      <Suspense fallback={<CategoriesSkeleton />}>
        <Categories />
      </Suspense>

      {/* Newsletter Section */}
      <Newsletter />
    </main>
  )
}
