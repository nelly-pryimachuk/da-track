import { useCallback, useEffect, useRef, useState } from 'react'
import { CasesContext } from '../context/CasesContext.js'
import { caseService } from '../services/caseService.js'
import { errorMessage } from '../services/ServiceError.js'

export default function CasesProvider({ children }) {
  const [cases, setCases] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [isMutating, setIsMutating] = useState(false)
  const activeRead = useRef(null)
  const readVersion = useRef(0)
  const mutationLock = useRef(false)
  const mounted = useRef(false)
  const [loadId, setLoadId] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    activeRead.current = controller
    const version = ++readVersion.current

    caseService
      .getAll({ signal: controller.signal })
      .then((records) => {
        if (controller.signal.aborted || version !== readVersion.current) return
        setCases(records)
        setStatus('success')
      })
      .catch((cause) => {
        if (controller.signal.aborted || version !== readVersion.current) return
        setError(errorMessage(cause))
        setStatus('error')
      })

    return () => controller.abort()
  }, [loadId])

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  const reload = useCallback(() => {
    if (mutationLock.current) return
    setStatus('loading')
    setError('')
    setLoadId((current) => current + 1)
  }, [])

  async function mutate(operation, apply, message) {
    if (mutationLock.current || status !== 'success') {
      return { ok: false, message: 'Дочекайтеся завершення поточної операції.' }
    }
    mutationLock.current = true
    setIsMutating(true)
    setNotice('')
    activeRead.current?.abort()
    readVersion.current += 1

    try {
      const record = await operation()
      if (mounted.current) {
        setCases((previous) => apply(previous, record))
        setNotice(message)
      }
      return { ok: true, record }
    } catch (cause) {
      return {
        ok: false,
        message: errorMessage(cause),
        errors: cause.errors,
        code: cause.code,
      }
    } finally {
      mutationLock.current = false
      if (mounted.current) setIsMutating(false)
    }
  }

  function createCase(input) {
    return mutate(
      () => caseService.create(input),
      (previous, record) => [
        ...previous.filter((entry) => entry.id !== record.id),
        record,
      ],
      'Кейс створено.',
    )
  }

  function updateCase(id, input) {
    return mutate(
      () => caseService.update(id, input),
      (previous, record) =>
        previous.map((entry) => (entry.id === id ? record : entry)),
      'Зміни кейсу збережено.',
    )
  }

  function deleteCase(id) {
    return mutate(
      () => caseService.delete(id),
      (previous) => previous.filter((entry) => entry.id !== id),
      'Кейс видалено.',
    )
  }

  return (
    <CasesContext.Provider
      value={{
        cases,
        status,
        error,
        reload,
        isMutating,
        createCase,
        updateCase,
        deleteCase,
        notice,
        dismissNotice: () => setNotice(''),
      }}
    >
      {children}
    </CasesContext.Provider>
  )
}