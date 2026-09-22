import { useDispatch } from 'react-redux'
import StatusBadge from './StatusBadge.jsx'
import PriorityBadge from './PriorityBadge.jsx'
import { selectTicket, updateTicketStatus } from '../store/ticketsSlice.js'
import { formatDateTime } from '../utils/formatDate.js'

export default function TicketCard({ ticket, selected }) {
  const dispatch = useDispatch()

  return (
    <article
      className={`border-t border-border px-4 py-3.5 ${
        selected ? 'bg-[#121c27]' : 'bg-transparent'
      }`}
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-muted">{ticket.id}</span>
            <StatusBadge status={ticket.status} />
          </div>
          <div className="mt-1 flex items-start gap-3">
            <h3 className="truncate text-[15px] font-semibold text-white">
              {ticket.subject}
            </h3>
            <span className="mt-0.5 hidden sm:inline-flex">
              <PriorityBadge priority={ticket.priority} />
            </span>
          </div>
          <p className="mt-1 text-[13px] text-muted">{ticket.customerName}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:shrink-0">
          <span className="sm:hidden">
            <PriorityBadge priority={ticket.priority} />
          </span>

          <select
            value={ticket.status}
            onChange={(event) =>
              dispatch(
                updateTicketStatus({ id: ticket.id, status: event.target.value })
              )
            }
            aria-label={`Change status for ${ticket.id}`}
            className="h-9 min-w-[118px] rounded-lg border border-border bg-[#0b1219] px-3 pr-8 text-sm text-white outline-none focus:border-accent/50"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          <p className="min-w-[148px] text-[13px] text-muted">
            {formatDateTime(ticket.createdAt)}
          </p>

          <button
            type="button"
            onClick={() => dispatch(selectTicket(ticket.id))}
            className={`h-8 rounded-lg px-3.5 text-sm font-medium ${
              selected
                ? 'bg-accent text-slate-950'
                : 'bg-[#1b2733] text-white hover:bg-[#243240]'
            }`}
          >
            View
          </button>
        </div>
      </div>
    </article>
  )
}
