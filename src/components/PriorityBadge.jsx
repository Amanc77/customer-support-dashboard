const priorityClass = {
  High: 'bg-[#4a1c1c] text-[#e05a5a]',
  Medium: 'bg-[#3a3516] text-[#c9b04a]',
  Low: 'bg-[#16321f] text-[#3dce7c]',
}

export default function PriorityBadge({ priority }) {
  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-[11px] font-medium ${priorityClass[priority]}`}
    >
      {priority}
    </span>
  )
}
