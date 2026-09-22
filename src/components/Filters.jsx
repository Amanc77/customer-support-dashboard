import { Search } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setPriorityFilter,
  setSearch,
  setStatusFilter,
} from '../store/ticketsSlice.js'

const selectClass =
  'h-10 min-w-[92px] rounded-lg border border-border bg-[#0b1219] px-3 pr-8 text-sm text-white outline-none focus:border-accent/50'

export default function Filters() {
  const dispatch = useDispatch()
  const { search, statusFilter, priorityFilter } = useSelector(
    (state) => state.tickets
  )

  return (
    <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center">
      <label className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={search}
          onChange={(event) => dispatch(setSearch(event.target.value))}
          placeholder="Search tickets"
          className="h-10 w-full rounded-lg border border-border bg-[#0b1219] pl-10 pr-3 text-sm text-white outline-none placeholder:text-muted focus:border-accent/50"
        />
      </label>

      <div className="flex gap-3">
        <select
          value={statusFilter}
          onChange={(event) => dispatch(setStatusFilter(event.target.value))}
          aria-label="Filter by status"
          className={selectClass}
        >
          <option value="All">All</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(event) => dispatch(setPriorityFilter(event.target.value))}
          aria-label="Filter by priority"
          className={selectClass}
        >
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
    </div>
  )
}
