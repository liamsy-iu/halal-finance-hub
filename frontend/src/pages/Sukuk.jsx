import { useState, useEffect } from 'react'
import axios from 'axios'

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
      const [structuresRes, issuancesRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/sukuk/structures`),
        axios.get(`${import.meta.env.VITE_API_URL}/sukuk/issuances`)
      ])
      setStructures(structuresRes.data)
      setIssuances(issuancesRes.data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to load sukuk data:', error)
      setLoading(false)
    }
  }

  const types = ['All', ...new Set(structures.map(s => s.structure_type))]
  
  const filteredStructures = selectedType === 'All' 
    ? structures 
    : structures.filter(s => s.structure_type === selectedType)

  const riskColors = {
    'Low to Medium': 'text-emerald-400 bg-emerald-900/30 border-emerald-500/50',
    'Medium': 'text-yellow-400 bg-yellow-900/30 border-yellow-500/50',
    'Medium to High': 'text-orange-400 bg-orange-900/30 border-orange-500/50',
    'Varies': 'text-gray-400 bg-gray-900/30 border-gray-500/50'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading sukuk data...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-navy-900 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-3 md:mb-4">
            Sukuk Explorer
          </h1>
          <p className="text-sm md:text-base text-gray-400 max-w-3xl mx-auto">
            Understanding Islamic bonds (Sukuk) - their structures, Shariah compliance mechanisms, 
            and real-world applications in global Islamic finance.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 justify-center flex-wrap">
          <button
            onClick={() => setShowIssuances(false)}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition ${
              !showIssuances
                ? 'bg-gold-400 text-navy-900'
                : 'bg-navy-800 text-gray-300 hover:bg-navy-700 border border-gray-700'
            }`}
          >
            Sukuk Structures
          </button>
          <button
            onClick={() => setShowIssuances(true)}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition ${
              showIssuances
                ? 'bg-gold-400 text-navy-900'
                : 'bg-navy-800 text-gray-300 hover:bg-navy-700 border border-gray-700'
            }`}
          >
            Sample Issuances
          </button>
        </div>

        {!showIssuances ? (
          <>
            {/* Type Filter */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {types.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition ${
                    selectedType === type
                      ? 'bg-emerald-600 text-white'
                      : 'bg-navy-800 text-gray-300 hover:bg-navy-700 border border-gray-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Structures Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredStructures.map(structure => (
                <div
                  key={structure.id}
                  onClick={() => setSelectedStructure(structure)}
                  className="card-premium cursor-pointer group hover:-translate-y-2 transition-transform"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-gold-400 transition">
                        {structure.name}
                      </h3>
                      <p className="text-sm text-gold-400/70 font-medium">{structure.arabic_name}</p>
                    </div>
                    <span className="text-xs bg-navy-700 text-gray-300 px-2 py-1 rounded whitespace-nowrap">
                      {structure.structure_type}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3">
                    {structure.description}
                  </p>

                  <div className={`inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border ${
                    riskColors[structure.risk_profile.split(' - ')[0]] || 'text-gray-400 bg-gray-900/30 border-gray-500/50'
                  }`}>
                    {structure.risk_profile}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Issuances Table */
          <div className="card-premium overflow-x-auto">
            <h2 className="text-2xl font-display font-bold text-white mb-6">Recent Sukuk Issuances</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-700">
                  <tr className="text-left">
                    <th className="py-3 text-gray-400 font-medium">Issuer</th>
                    <th className="py-3 text-gray-400 font-medium">Type</th>
                    <th className="py-3 text-gray-400 font-medium hidden md:table-cell">Size (USD)</th>
                    <th className="py-3 text-gray-400 font-medium">Rate</th>
                    <th className="py-3 text-gray-400 font-medium hidden lg:table-cell">Maturity</th>
                  </tr>
                </thead>
                <tbody>
                  {issuances.map(issuance => (
                    <tr key={issuance.id} className="border-b border-gray-800 last:border-0">
                      <td className="py-4">
                        <div className="font-semibold text-white">{issuance.issuer}</div>
                        <div className="text-xs text-gray-400">{issuance.name}</div>
                      </td>
                      <td className="py-4">
                        <span className="text-xs bg-emerald-900/30 text-emerald-400 px-2 py-1 rounded">
                          {issuance.structure_type}
                        </span>
                      </td>
                      <td className="py-4 text-gray-300 hidden md:table-cell">
                        ${(issuance.issue_size_usd / 1e9).toFixed(2)}B
                      </td>
                      <td className="py-4 text-gold-400 font-semibold">
                        {issuance.profit_rate}%
                      </td>
                      <td className="py-4 text-gray-400 hidden lg:table-cell">
                        {issuance.maturity_date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Structure Detail Modal */}
      {selectedStructure && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedStructure(null)}
        >
          <div 
            className="bg-navy-800 border border-gold-400/30 rounded-lg max-w-5xl w-full my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-navy-800 border-b border-gray-700 px-6 md:px-8 py-4 md:py-6 flex items-start justify-between z-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-1">
                  {selectedStructure.name}
                </h2>
                <p className="text-base md:text-lg text-gold-400">{selectedStructure.arabic_name}</p>
              </div>
              <button
                onClick={() => setSelectedStructure(null)}
                className="text-gray-400 hover:text-white transition text-2xl ml-4"
              >
                ×
              </button>
            </div>

            <div className="px-6 md:px-8 py-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                <p className="text-gray-300 leading-relaxed">{selectedStructure.description}</p>
              </div>

              {/* How It Works */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">How It Works</h3>
                <div className="space-y-3">
                  {selectedStructure.how_it_works.map((step, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gold-400/20 text-gold-400 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <p className="text-gray-300 text-sm md:text-base pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Underlying Asset */}
              <div className="bg-emerald-900/10 border border-emerald-400/30 rounded-lg p-4 md:p-6">
                <h3 className="text-lg font-semibold text-emerald-400 mb-2">Underlying Asset</h3>
                <p className="text-gray-300">{selectedStructure.underlying_asset}</p>
              </div>

              {/* Shariah Basis */}
              <div className="bg-gold-900/10 border border-gold-400/30 rounded-lg p-4 md:p-6">
                <h3 className="text-lg font-semibold text-gold-400 mb-2">Shariah Basis</h3>
                <p className="text-gray-300 leading-relaxed">{selectedStructure.shariah_basis}</p>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {selectedStructure.key_features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <span className="text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Example Issuances */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Notable Issuances</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {selectedStructure.example_issuances.map((example, index) => (
                    <div key={index} className="bg-navy-700/50 px-3 md:px-4 py-2 md:py-3 rounded-lg text-sm text-gray-300">
                      {example}
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Profile */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Risk Assessment</h3>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  riskColors[selectedStructure.risk_profile.split(' - ')[0]]
                }`}>
                  {selectedStructure.risk_profile}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
