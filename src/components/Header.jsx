import { useEffect, useState } from 'react'
import { formatDateTime } from '../utils/formatDate.js'

export default function Header() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="text-[13px] font-medium text-accent">Support Desk</p>
        <h1 className="mt-1 text-[28px] font-bold leading-tight tracking-tight text-white sm:text-[32px]">
          Customer Support Dashboard
        </h1>
        <p className="mt-1.5 text-sm text-muted">
          Manage customer issues, review conversations, and keep ticket status updated.
        </p>
      </div>

      <div className="shrink-0 self-start rounded-xl border border-border bg-surface px-4 py-3 text-right">
        <p className="text-xs text-muted">Today</p>
        <p className="mt-0.5 text-sm font-medium text-white">{formatDateTime(now)}</p>
      </div>
    </header>
  )
}
