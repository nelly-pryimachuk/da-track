import { skills } from '../data/skills.js'
import Section from '../components/ui/Section.jsx'
import SkillsSummary from '../components/skills/SkillsSummary.jsx'
import SkillList from '../components/skills/SkillList.jsx'

export default function HomePage() {
  return (
    <>
      <Section id="about" title="Про мене">
        <p>Мій шлях у вивченні дата-аналітики — навички та практичні кейси.</p>
      </Section>

      <Section id="skills" title="Навички">
        <SkillsSummary total={skills.length} />
        <SkillList items={skills} />
      </Section>
    </>
  )
}