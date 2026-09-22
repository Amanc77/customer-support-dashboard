import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { fetchTickets } from '../services/ticketService'

export const loadTickets = createAsyncThunk(
  'tickets/loadTickets',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTickets()
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch tickets')
    }
  }
)

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    items: [],
    loading: false,
    error: null,
    selectedId: null,
    mobileDetailsOpen: false,
    search: '',
    statusFilter: 'All',
    priorityFilter: 'All',
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload
    },
    setStatusFilter(state, action) {
      state.statusFilter = action.payload
    },
    setPriorityFilter(state, action) {
      state.priorityFilter = action.payload
    },
    selectTicket(state, action) {
      state.selectedId = action.payload
      state.mobileDetailsOpen = Boolean(action.payload)
    },
    closeMobileDetails(state) {
      state.mobileDetailsOpen = false
    },
    updateTicketStatus(state, action) {
      const { id, status } = action.payload
      const ticket = state.items.find((item) => item.id === id)
      if (ticket) {
        ticket.status = status
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTickets.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadTickets.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        state.selectedId = action.payload[0]?.id ?? null
      })
      .addCase(loadTickets.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch tickets'
      })
  },
})

export const {
  setSearch,
  setStatusFilter,
  setPriorityFilter,
  selectTicket,
  closeMobileDetails,
  updateTicketStatus,
} = ticketsSlice.actions

const selectTicketState = (state) => state.tickets
const selectItems = (state) => state.tickets.items
const selectSelectedId = (state) => state.tickets.selectedId

export const selectFilteredTickets = createSelector(
  [selectTicketState],
  ({ items, search, statusFilter, priorityFilter }) => {
    const query = search.trim().toLowerCase()

    return items.filter((ticket) => {
      const matchesSearch =
        !query ||
        ticket.id.toLowerCase().includes(query) ||
        ticket.customerName.toLowerCase().includes(query) ||
        ticket.subject.toLowerCase().includes(query) ||
        ticket.email.toLowerCase().includes(query)

      const matchesStatus =
        statusFilter === 'All' || ticket.status === statusFilter
      const matchesPriority =
        priorityFilter === 'All' || ticket.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })
  }
)

export const selectStats = createSelector([selectItems], (items) => ({
  total: items.length,
  open: items.filter((ticket) => ticket.status === 'Open').length,
  inProgress: items.filter((ticket) => ticket.status === 'In Progress').length,
  resolved: items.filter((ticket) => ticket.status === 'Resolved').length,
}))

export const selectSelectedTicket = createSelector(
  [selectItems, selectSelectedId],
  (items, selectedId) => items.find((ticket) => ticket.id === selectedId) || null
)

export default ticketsSlice.reducer
