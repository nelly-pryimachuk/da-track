import { Link } from 'react-router'
import PageHeading from '../components/ui/PageHeading.jsx'

export default function NotFoundPage({
  title = '404: сторінку не знайдено',
  message = 'Перевірте адресу або перейдіть до навичок.',
}) {
  return (
    <>
      <PageHeading title={title} />
      <p>{message}</p>
      <p><Link to="/skills">Відкрити навички</Link></p>
      <p><Link to="/">На головну</Link></p>
    </>
  )
}