import { ChatInterfaceSkeleton } from "@/components/loading-skeleton"

export default function Loading() {
  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-2 text-center mb-8">
          <div className="h-8 w-64 bg-muted rounded-md mx-auto" />
          <div className="h-5 w-96 bg-muted rounded-md mx-auto" />
        </div>

        <ChatInterfaceSkeleton />
      </div>
    </div>
  )
}

