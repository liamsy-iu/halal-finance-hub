import { useState, useEffect } from 'react'
import axios from 'axios'

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
      const response = await axios.get('http://localhost:8000/products')
      setProducts(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to load products:', error)
      setLoading(false)
    }
  }

  const categories = ['All', ...new Set(products.map(p => p.category))]
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  const riskColors = {
    'Low to Medium': 'text-emerald-400 bg-emerald-900/30 border-emerald-500/50',
    'Medium': 'text-yellow-400 bg-yellow-900/30 border-yellow-500/50',
    'Medium to High': 'text-orange-400 bg-orange-900/30 border-orange-500/50',
    'Varies (based on borrower)': 'text-gray-400 bg-gray-900/30 border-gray-500/50'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading products...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-navy-900 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-3 md:mb-4">
            Islamic Finance Products
          </h1>
          <p className="text-sm md:text-base text-gray-400 max-w-3xl mx-auto">
            Explore Shariah-compliant financial instruments with detailed explanations, 
            scholarly references, and practical applications.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 md:mb-12 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-medium transition ${
                selectedCategory === category
                  ? 'bg-gold-400 text-navy-900'
                  : 'bg-navy-800 text-gray-300 hover:bg-navy-700 border border-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="card-premium cursor-pointer group hover:-translate-y-2 transition-transform"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-gold-400 transition">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gold-400/70 font-medium">{product.arabic_name}</p>
                </div>
                <span className="text-xs bg-navy-700 text-gray-300 px-2 py-1 rounded whitespace-nowrap">
                  {product.category}
                </span>
              </div>
              
              <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3">
                {product.description}
              </p>

              <div className={`inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border ${
                riskColors[product.risk_level] || 'text-gray-400 bg-gray-900/30 border-gray-500/50'
              }`}>
                Risk: {product.risk_level}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="bg-navy-800 border border-gold-400/30 rounded-lg max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-navy-800 border-b border-gray-700 px-6 md:px-8 py-4 md:py-6 flex items-start justify-between z-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-1">
                  {selectedProduct.name}
                </h2>
                <p className="text-base md:text-lg text-gold-400">{selectedProduct.arabic_name}</p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-400 hover:text-white transition text-2xl ml-4"
              >
                ×
              </button>
            </div>

            <div className="px-6 md:px-8 py-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                <p className="text-gray-300 leading-relaxed">{selectedProduct.description}</p>
              </div>

              {/* Shariah Basis */}
              <div className="bg-gold-900/10 border border-gold-400/30 rounded-lg p-4 md:p-6">
                <h3 className="text-lg font-semibold text-gold-400 mb-2">Shariah Basis</h3>
                <p className="text-gray-300 leading-relaxed">{selectedProduct.shariah_basis}</p>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {selectedProduct.key_features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <span className="text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Use Cases */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Common Use Cases</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {selectedProduct.use_cases.map((useCase, index) => (
                    <div key={index} className="bg-navy-700/50 px-3 md:px-4 py-2 md:py-3 rounded-lg text-sm text-gray-300">
                      {useCase}
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Level */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Risk Assessment</h3>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  riskColors[selectedProduct.risk_level]
                }`}>
                  {selectedProduct.risk_level}
                </div>
              </div>

              {/* Scholarly References */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Scholarly References</h3>
                <ul className="space-y-2">
                  {selectedProduct.scholarly_references.map((ref, index) => (
                    <li key={index} className="text-sm text-gray-400 pl-4 border-l-2 border-gold-400/30">
                      {ref}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
