import { Skeleton } from "@/components/ui/Skeleton"

export default function AdminDashboardLoading() {
  return (
    <div className="space-y-[var(--space-lg)]">
      <div>
        <Skeleton className="h-8 w-48" />
      </div>

      {/* Stats Grid Loading */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((index) => (
          <Skeleton key={index} className="h-32" />
        ))}
      </div>

      {/* Tabs Loading */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="flex space-x-8">
          {[1, 2, 3, 4].map((index) => (
            <Skeleton key={index} className="h-4 w-20" />
          ))}
        </div>
      </div>

      {/* Content Area Loading */}
      <div className="min-h-[400px]">
        <Skeleton className="h-[400px]" />
      </div>
    </div>
  )
} 