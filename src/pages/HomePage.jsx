import { Link } from 'react-router'
import PageHeading from '../components/ui/PageHeading.jsx'

export default function HomePage() {
  return (
    <>
      <PageHeading title="DA Track" />
      <p>Мій шлях у вивченні дата-аналітики — навички та практичні кейси.</p>
      <p><Link to="/skills">Перейти до навичок</Link></p>
      <p><Link to="/cases">Переглянути кейси</Link></p>
    </>
  )
}