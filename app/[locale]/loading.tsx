export default function Loading() {
  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p className="mt-4 text-secondary-600">Loading...</p>
      </div>
    </div>
  )
}