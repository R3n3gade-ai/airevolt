"use client"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
        <p className="text-gray-700 mb-2">
          Lead, purchase, visit, and affiliate storage have been removed from this build.
        </p>
        <p className="text-gray-700">
          This page is left in place so the app still deploys cleanly, but it no longer connects to Supabase.
        </p>
      </div>
    </div>
  )
}
