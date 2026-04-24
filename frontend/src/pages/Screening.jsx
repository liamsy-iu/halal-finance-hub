import { useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'https://halal-finance-hub.fly.dev'

export default function Screening() {
  const [ticker, setTicker] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleScreen = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      console.log('API_URL:', API_URL) // Debug log
      const response = await axios.post(`${API_URL}/screening/screen`, {
        ticker: ticker.toUpperCase()
      })
      setResult(response.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to screen stock. Please try again.')
    } finally {
      setLoading(false)
    }
  }
