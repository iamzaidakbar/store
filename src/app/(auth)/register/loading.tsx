import { Skeleton } from "@/components/ui/Skeleton"

export default function RegisterLoading() {
  return (
    <div className="space-y-[var(--space-lg)]">
      <div className="text-center">
        <Skeleton className="h-8 w-48 mx-auto" />
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          {/* Input fields */}
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
        </div>

        <div className="pt-4 space-y-4">
          {/* Button */}
          <Skeleton className="w-full h-12" />
          {/* Link */}
          <Skeleton className="w-40 h-4 mx-auto" />
        </div>
      </div>
    </div>
  )
} 