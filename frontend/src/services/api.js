import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

// Request interceptor (for future auth token injection)
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

// Response interceptor — normalise errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again.'
    return Promise.reject(new Error(message))
  }
)

// ── Endpoints ──────────────────────────────────────────────

/**
 * POST /predict
 * @param {Object} assessmentData - Fields matching AssessmentRequest schema
 * @returns {Promise<PredictResponse>}
 */
export const submitAssessment = (assessmentData) =>
  api.post('/api/predict', assessmentData)

/**
 * GET /history
 * @returns {Promise<PredictionHistory[]>}
 */
export const fetchHistory = () =>
  api.get('/api/history')
export default api
