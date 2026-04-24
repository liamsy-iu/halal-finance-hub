import { useState, useEffect } from 'react'
import axios from 'axios'
import API_URL from '../config'

export default function Products() {
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`)
      setProducts(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to load products:', error)
      setLoading(false)
    }
  }
