'use client'

export function ImpersonationBanner() {
  const isImpersonating = document.cookie.includes('impersonator')

  if (!isImpersonating) return null

  return (
    <div className="bg-red-600 text-white p-2 text-center">
      IMPERSONATION ACTIVE
      <button
        className="ml-4 underline"
        onClick={() => fetch('/api/admin/impersonate/stop', { method: 'POST' })}
      >
        Quitter
      </button>
    </div>
  )
}
