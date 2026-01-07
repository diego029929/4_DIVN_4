'use client'

import { useEffect, useState } from 'react'

export default function AdminUsers() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(setUsers)
  }, [])

  return (
    <div>
      <h2 className="text-xl mb-4">Users</h2>

      {users.map((u: any) => (
        <div key={u.id} className="flex gap-2 mb-2">
          <span>{u.email}</span>

          <button
            onClick={() => fetch(`/api/admin/users/${u.id}/block`, { method: 'POST' })}
          >
            Block
          </button>

          <button
            onClick={() => fetch(`/api/admin/impersonate/${u.id}`, { method: 'POST' })}
          >
            Impersonate
          </button>
        </div>
      ))}
    </div>
  )
}
