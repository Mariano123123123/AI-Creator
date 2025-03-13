import { Skeleton } from "@/components/ui/skeleton"

export function ImageGeneratorSkeleton() {
  return (
    <div className="space-y-6">
      <div className="border-2 border-primary/20 shadow-lg rounded-lg p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-6 w-40" />
            </div>
            <Skeleton className="h-[120px] w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  )
}

export function CharacterCreatorSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-4 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <Skeleton className="h-8 w-40 mb-4" />
            <Skeleton className="h-[200px] w-full mb-4" />
            <div className="grid grid-cols-2 gap-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  )
}

export function ChatInterfaceSkeleton() {
  return (
    <div className="flex flex-col h-[calc(100vh-200px)] max-w-4xl mx-auto">
      <div className="border rounded-lg flex-1 flex flex-col overflow-hidden">
        <div className="border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-10 w-[180px]" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            <div className="flex justify-start">
              <Skeleton className="h-20 w-[80%] rounded-lg" />
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-12 w-[60%] rounded-lg" />
            </div>
            <div className="flex justify-start">
              <Skeleton className="h-16 w-[70%] rounded-lg" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Skeleton className="h-10 w-10 rounded-md" />
        <Skeleton className="h-10 w-10 rounded-md" />
        <Skeleton className="h-10 w-10 rounded-md" />
        <Skeleton className="h-10 flex-1 rounded-md" />
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>
    </div>
  )
}

