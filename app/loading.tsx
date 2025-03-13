export default function Loading() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-10">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"
          role="status"
          aria-label="Loading"
        />
        <p className="text-lg font-medium">Loading...</p>
      </div>
    </div>
  )
}

