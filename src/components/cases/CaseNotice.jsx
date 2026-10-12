import useCases from '../../hooks/useCases.js'
import AppButton from '../ui/AppButton.jsx'

export default function CaseNotice() {
  const { notice, dismissNotice } = useCases()

  return (
    <div className="operation-notice">
      <p role="status">{notice}</p>
      {notice && (
        <AppButton variant="secondary" onClick={dismissNotice}>
          Закрити повідомлення
        </AppButton>
      )}
    </div>
  )
}