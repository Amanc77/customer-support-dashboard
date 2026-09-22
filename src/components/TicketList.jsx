import { useSelector } from 'react-redux'
import Filters from './Filters.jsx'
import TicketCard from './TicketCard.jsx'
import { selectFilteredTickets } from '../store/ticketsSlice.js'

export default function TicketList() {
  const tickets = useSelector(selectFilteredTickets)
  const { loading, selectedId } = useSelector((state) => state.tickets)

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface">
      <Filters />

      {loading ? (
        <div className="space-y-0 border-t border-border">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse border-t border-border px-4 py-4 first:border-t-0"
            >
              <div className="h-3 w-28 rounded bg-[#1b2733]" />
              <div className="mt-3 h-4 w-3/4 rounded bg-[#1b2733]" />
              <div className="mt-2 h-3 w-24 rounded bg-[#1b2733]" />
            </div>
          ))}
        </div>
      ) : tickets.length === 0 ? (
        <div className="border-t border-border px-4 py-16 text-center">
          <p className="font-medium text-white">No tickets found</p>
          <p className="mt-1 text-sm text-muted">
            Try a different search or filter combination.
          </p>
        </div>
      ) : (
        <div>
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              selected={ticket.id === selectedId}
            />
          ))}
        </div>
      )}
    </section>
  )
}
