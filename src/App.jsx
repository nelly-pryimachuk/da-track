import { Route, Routes } from 'react-router'
import AppLayout from './components/layout/AppLayout.jsx'
import CasesLayout from './components/layout/CasesLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import SkillsContainer from './pages/SkillsContainer.jsx'
import SkillDetailsPage from './pages/SkillDetailsPage.jsx'
import CasesPage from './pages/CasesPage.jsx'
import CaseCreatePage from './pages/CaseCreatePage.jsx'
import CaseEditPage from './pages/CaseEditPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { skills } from './data/skills.js'
import { cases } from './data/cases.js'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout items={skills} />}>
        <Route index element={<HomePage />} />

        <Route path="skills">
          <Route index element={<SkillsContainer items={skills} />} />
          <Route
            path=":skillId"
            element={<SkillDetailsPage items={skills} />}
          />
        </Route>

        <Route path="cases" element={<CasesLayout />}>
          <Route
            index
            element={<CasesPage cases={cases} items={skills} />}
          />
          <Route path="new" element={<CaseCreatePage items={skills} />} />
          <Route
            path=":caseId/edit"
            element={<CaseEditPage cases={cases} items={skills} />}
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}