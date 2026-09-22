const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchTickets() {
  const response = await fetch('/api/tickets.json')

  if (!response.ok) {
    throw new Error('Unable to load tickets. Please try again.')
  }

  await delay(650)
  return response.json()
}
