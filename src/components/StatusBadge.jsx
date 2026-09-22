const statusClass = {
  Open: 'bg-[#3a1b1d] text-[#f07167]',
  'In Progress': 'bg-[#12363a] text-[#3dd6c4]',
  Resolved: 'bg-[#143226] text-[#3dce7c]',
}

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-[11px] font-medium ${statusClass[status]}`}
    >
      {status}
    </span>
  )
}
