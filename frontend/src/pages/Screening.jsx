import { useState } from 'react'
import axios from 'axios'

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
      const response = await axios.post('http://localhost:8000/screening/screen', {
        ticker: ticker.toUpperCase()
      })
      setResult(response.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to screen stock. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy-900 py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-3 md:mb-4">
            AAOIFI Stock Screener
          </h1>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
            Screen stocks against AAOIFI Shariah compliance criteria. Enter a stock ticker below to check if it meets Islamic investment standards.
          </p>
        </div>

        {/* Search Form */}
        <div className="card-premium mb-6 md:mb-8">
          <form onSubmit={handleScreen} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Stock Ticker Symbol
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value)}
                  placeholder="e.g., AAPL, MSFT, TSLA"
                  className="flex-1 bg-navy-700 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gold-400 transition text-sm md:text-base"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {loading ? 'Screening...' : 'Screen Stock'}
                </button>
              </div>
            </div>
            <p className="text-xs md:text-sm text-gray-500">
              Currently supported: AAPL, MSFT, TSLA
            </p>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6 md:mb-8 text-sm md:text-base">
            {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-4 md:space-y-6">
            {/* Overall Status */}
            <div className={`card-premium ${result.is_compliant ? 'border-emerald-500/50' : 'border-red-500/50'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-display font-bold text-white mb-1">
                    {result.company_name}
                  </h2>
                  <p className="text-sm text-gray-400">{result.ticker}</p>
                </div>
                <div className={`text-center sm:text-right px-4 py-2 rounded-lg ${
                  result.is_compliant 
                    ? 'bg-emerald-900/30 border border-emerald-500/50' 
                    : 'bg-red-900/30 border border-red-500/50'
                }`}>
                  <div className={`text-xl md:text-2xl font-bold ${
                    result.is_compliant ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {result.overall_status}
                  </div>
                </div>
              </div>
            </div>

            {/* Criteria Breakdown */}
            <div className="card-premium">
              <h3 className="text-lg md:text-xl font-display font-semibold text-white mb-4 md:mb-6">
                AAOIFI Compliance Criteria
              </h3>
              <div className="space-y-4 md:space-y-6">
                {result.criteria.map((criterion, index) => (
                  <div key={index} className="border-b border-gray-700 last:border-0 pb-4 md:pb-6 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                      <div className="flex-1">
                        <h4 className="text-base md:text-lg font-semibold text-white mb-1">
                          {criterion.name}
                        </h4>
                        <p className="text-xs md:text-sm text-gray-400">
                          {criterion.description}
                        </p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap ${
                        criterion.passed 
                          ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/50'
                          : 'bg-red-900/30 text-red-400 border border-red-500/50'
                      }`}>
                        {criterion.passed ? '✓ Pass' : '✗ Fail'}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 md:gap-4 text-sm">
                      <div className="bg-navy-700/50 px-3 md:px-4 py-2 md:py-3 rounded-lg">
                        <div className="text-gray-400 text-xs md:text-sm mb-1">Actual Value</div>
                        <div className="text-white font-semibold text-base md:text-lg">{criterion.value}%</div>
                      </div>
                      <div className="bg-navy-700/50 px-3 md:px-4 py-2 md:py-3 rounded-lg">
                        <div className="text-gray-400 text-xs md:text-sm mb-1">Threshold</div>
                        <div className="text-white font-semibold text-base md:text-lg">{'<'} {criterion.threshold}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-gold-900/10 border border-gold-400/30 px-4 py-3 rounded-lg">
              <p className="text-xs md:text-sm text-gold-200/80">
                <strong>Note:</strong> This screening is based on AAOIFI Shariah standards and uses simplified financial data. 
                Please consult with a qualified Shariah advisor before making investment decisions.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
