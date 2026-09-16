export default function SkillCard({ item }) {
  return (
    <article className="skill-card">
      <h3>{item.name}</h3>
      <p className="category">{item.category}</p>
      <p>{item.description}</p>
      <p className="status">{item.status}</p>
    </article>
  )
}