import { Link, useNavigate, useParams } from 'react-router'
import PageHeading from '../components/ui/PageHeading.jsx'
import AppButton from '../components/ui/AppButton.jsx'
import StatusBadge from '../components/skills/StatusBadge.jsx'
import useSkillSelection from '../hooks/useSkillSelection.js'
import NotFoundPage from './NotFoundPage.jsx'

export default function SkillDetailsPage({ items }) {
  const { skillId } = useParams()
  const navigate = useNavigate()
  const { selectSkill } = useSkillSelection()
  const item = items.find((entry) => entry.id === skillId)

  if (!item) {
    return (
      <NotFoundPage
        title="Навичку не знайдено"
        message="У локальному переліку немає навички з таким ідентифікатором."
      />
    )
  }

  function handlePrepareCase() {
    selectSkill(item.id)
    const search = new URLSearchParams({ skillId: item.id })
    navigate(`/cases/new?${search}`)
  }

  return (
    <>
      <PageHeading title={item.name} />
      <p className="category">{item.category}</p>
      <p>{item.description}</p>
      <p><StatusBadge status={item.status} /></p>
      <AppButton onClick={handlePrepareCase}>
        Вибрати й підготувати кейс
      </AppButton>
      <p><Link to="/skills">До навичок без фільтрів</Link></p>
    </>
  )
}