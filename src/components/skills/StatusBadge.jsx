export default function StatusBadge({ status }) {
  const className = status === 'Практикую' ? 'status status-active' : 'status'
  return <span className={className}>{status}</span>
}