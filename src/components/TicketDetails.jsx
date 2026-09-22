import { useDispatch, useSelector } from 'react-redux'
import {
  closeMobileDetails,
  selectSelectedTicket,
  updateTicketStatus,
} from '../store/ticketsSlice.js'
import { formatDateTime } from '../utils/formatDate.js'

export default function TicketDetails() {
  const dispatch = useDispatch()
  const ticket = useSelector(selectSelectedTicket)
  const { loading, mobileDetailsOpen } = useSelector((state) => state.tickets)

  if (loading) {
    return (
      <aside className="hidden h-fit animate-pulse space-y-3 rounded-2xl lg:block">
        <div className="h-36 rounded-2xl border border-border bg-surface" />
        <div className="h-56 rounded-2xl border border-border bg-surface" />
        <div className="h-40 rounded-2xl border border-border bg-surface" />
      </aside>
    )
  }

  if (!ticket) {
    return (
      <aside className="hidden rounded-2xl border border-border bg-surface px-5 py-10 text-center lg:block">
        <p className="font-medium text-white">Select a ticket</p>
        <p className="mt-1 text-sm text-muted">
          Open a ticket to view customer details and conversation history.
        </p>
      </aside>
    )
  }

  return (
    <aside
      className={`${
        mobileDetailsOpen ? 'fixed inset-0 z-20 flex flex-col bg-page' : 'hidden'
      } lg:static lg:z-auto lg:flex lg:flex-col lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:bg-transparent panel-scroll`}
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3 lg:hidden">
        <p className="text-sm font-medium text-white">Ticket details</p>
        <button
          type="button"
          onClick={() => dispatch(closeMobileDetails())}
          className="rounded-lg bg-[#1b2733] px-3 py-1.5 text-sm text-white"
        >
          Close
        </button>
      </div>

      <div className="space-y-3 overflow-y-auto p-4 lg:p-0 panel-scroll">
        <section className="rounded-2xl border border-border bg-surface px-5 py-4">
          <h2 className="text-[15px] font-semibold text-white">{ticket.email}</h2>
          <p className="mt-4 text-sm text-muted">Plan</p>
          <p className="mt-0.5 text-sm font-medium text-white">{ticket.plan}</p>
          <p className="mt-4 text-sm text-muted">Location</p>
          <p className="mt-0.5 text-sm font-medium text-white">{ticket.location}</p>
        </section>

        <section className="rounded-2xl border border-border bg-surface px-5 py-4">
          <h3 className="text-sm font-semibold text-white">Issue details</h3>
          <p className="mt-3 text-sm leading-6 text-muted">{ticket.description}</p>
          <p className="mt-5 text-sm text-muted">Created</p>
          <p className="mt-0.5 text-sm font-medium text-white">
            {formatDateTime(ticket.createdAt)}
          </p>
          <p className="mt-5 text-sm text-muted">Change status</p>
          <select
            value={ticket.status}
            onChange={(event) =>
              dispatch(
                updateTicketStatus({ id: ticket.id, status: event.target.value })
              )
            }
            className="mt-2 h-10 w-full rounded-lg border border-border bg-[#0b1219] px-3 pr-8 text-sm text-white outline-none focus:border-accent/50"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </section>

        <section className="rounded-2xl border border-border bg-surface px-5 py-4">
          <h3 className="text-sm font-semibold text-white">Conversation</h3>
          <div className="mt-4 space-y-4">
            {ticket.conversation.map((message) => (
              <div key={message.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-semibold text-white">{message.sender}</p>
                  <p className="shrink-0 text-xs text-muted">
                    {formatDateTime(message.createdAt)}
                  </p>
                </div>
                <p className="mt-1.5 text-sm leading-6 text-muted">{message.message}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </aside>
  )
}
