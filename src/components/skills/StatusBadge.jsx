const levels = {
  'Починаю вивчати': 1,
  'Опрацьовую теорію': 2,
  'Практикую': 3,
}

export default function StatusBadge({ status }) {
  const level = levels[status] ?? 1
  const className = status === 'Практикую' ? 'status status-active' : 'status'
  return (
    <span className={className} data-level={level}>
      <span className="status-meter" aria-hidden="true">
        <i /><i /><i />
      </span>
      <span>{status}</span>
    </span>
  )
}