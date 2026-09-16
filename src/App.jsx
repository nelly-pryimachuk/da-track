import HomePage from './pages/HomePage.jsx'

export default function App() {
  return (
    <>
      <header className="site-header">
        <span>DA Track</span>
        <nav aria-label="Основна навігація">
          <a href="#about">Про мене</a>
          <a href="#skills">Навички</a>
        </nav>
      </header>
      <main>
        <HomePage />
      </main>
      <footer>Навчальний проєкт. Портфоліо в розробці.</footer>
    </>
  )
}