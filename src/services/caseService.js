import { mockCaseService } from './mockCaseService.js'
import { createApiCaseService } from './apiCaseService.js'

const source = import.meta.env.VITE_DATA_SOURCE ?? 'mock'

function selectService() {
  if (source === 'mock') return mockCaseService
  if (source === 'api') {
    return createApiCaseService(import.meta.env.VITE_API_BASE_URL)
  }
  throw new Error(`Unsupported data source: ${source}`)
}

export const caseService = selectService()