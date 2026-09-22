# Customer Support Dashboard

A support-team dashboard for viewing, searching, filtering, and updating customer tickets. Built with React, Redux Toolkit, Tailwind CSS, and a mock REST endpoint.

## Features

- Ticket statistics: Total, Open, In Progress, Resolved
- Search by ticket ID, customer, email, or subject
- Filter by status and priority
- Change ticket status from the list or the details panel
- Side panel with customer info, issue details, and conversation history
- Loading, error, and empty states
- Responsive layout for desktop and mobile

## Tech stack

- React 
- Redux Toolkit for state management
- Tailwind CSS 
- Vite
- Mock REST API: `GET /api/tickets.json`

## Setup

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |

## Project structure

```
src/
  components/     Reusable UI pieces
  store/          Redux store and tickets slice
  services/       API client
  utils/          Date formatting
public/api/       Mock ticket data
```
