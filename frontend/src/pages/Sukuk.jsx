import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'https://halal-finance-hub.fly.dev'

export default function Sukuk() {
  const [structures, setStructures] = useState([])
  const [issuances, setIssuances] = useState([])
  const [selectedType, setSelectedType] = useState('All')
  const [selectedStructure, setSelectedStructure] = useState(null)
  const [showIssuances, setShowIssuances] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      console.log('API_URL:', API_URL) // Debug log
      const [structuresRes, issuancesRes] = await Promise.all([
        axios.get(`${API_URL}/sukuk/structures`),
        axios.get(`${API_URL}/sukuk/issuances`)
      ])
      setStructures(structuresRes.data)
      setIssuances(issuancesRes.data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to load sukuk data:', error)
      setLoading(false)
    }
  }
