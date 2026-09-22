import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from './components/Header.jsx'
import Stats from './components/Stats.jsx'
import TicketList from './components/TicketList.jsx'
import TicketDetails from './components/TicketDetails.jsx'
import { loadTickets } from './store/ticketsSlice.js'

export default function App() {
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.tickets)

  useEffect(() => {
    dispatch(loadTickets())
  }, [dispatch])

  return (
    <div className="min-h-screen bg-page px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
      <div className="mx-auto max-w-[1280px]">
        <Header />

        {error ? (
          <div className="mt-8 rounded-2xl border border-red-900/70 bg-red-950/30 px-6 py-10 text-center">
            <p className="text-lg font-semibold text-red-200">Could not load tickets</p>
            <p className="mt-2 text-sm text-red-200/70">{error}</p>
            <button
              type="button"
              onClick={() => dispatch(loadTickets())}
              className="mt-5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-slate-950"
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            <Stats loading={loading} />
            <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_360px]">
              <TicketList />
              <TicketDetails />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
