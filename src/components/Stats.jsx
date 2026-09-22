import { Ticket, Mail, Clock3, CircleCheck } from 'lucide-react'
import { useSelector } from 'react-redux'
import { selectStats } from '../store/ticketsSlice.js'

const cards = [
  { key: 'total', label: 'Total Tickets', icon: Ticket },
  { key: 'open', label: 'Open', icon: Mail },
  { key: 'inProgress', label: 'In Progress', icon: Clock3 },
  { key: 'resolved', label: 'Resolved', icon: CircleCheck },
]

export default function Stats({ loading }) {
  const stats = useSelector(selectStats)

  return (
    <section className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
      {cards.map(({ key, label, icon: Icon }) => (
        <article
          key={key}
          className="rounded-xl border border-border bg-surface px-4 py-3.5 sm:px-5 sm:py-4"
        >
          <div className="flex items-start justify-between">
            <p className="text-sm text-muted">{label}</p>
            <Icon className="h-[18px] w-[18px] text-accent" strokeWidth={1.8} />
          </div>
          <p className="mt-3 text-[28px] font-semibold leading-none text-white">
            {loading ? '—' : stats[key]}
          </p>
        </article>
      ))}
    </section>
  )
}
