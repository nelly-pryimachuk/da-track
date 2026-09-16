import SkillCard from '../components/SkillCard.jsx'
import { skills } from '../data/skills.js'

export default function HomePage() {
  return (
    <>
      <section id="about" aria-labelledby="about-title">
        <h1 id="about-title">DA Track</h1>
        <p>Мій шлях у вивченні дата-аналітики — навички та практичні кейси.</p>
      </section>

      <section id="skills" aria-labelledby="skills-title">
        <h2 id="skills-title">Навички</h2>
        <p>Навичок у переліку: {skills.length}</p>
        {skills.length === 0 ? (
          <p>Навички ще не додано.</p>
        ) : (
          <ul className="skills-grid">
            {skills.map((item) => (
              <li key={item.id}>
                <SkillCard item={item} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}