import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const isActive = (path) => location.pathname === path
  
  return (
    <nav className="bg-navy-800/95 backdrop-blur-md border-b border-gold-400/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20 items-center">
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-navy-900 font-bold text-lg md:text-xl">ح</span>
            </div>
            <div>
              <div className="text-base md:text-xl font-display font-bold text-white group-hover:text-gold-400 transition">
                Halal Finance Hub
              </div>
              <div className="text-[10px] md:text-xs text-gold-400/70 tracking-wider hidden sm:block">
                ISLAMIC INVESTMENT SCREENING
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-1">
            <Link 
              to="/" 
              className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
                isActive('/') 
                  ? 'bg-gold-400/10 text-gold-400 border border-gold-400/30' 
                  : 'text-gray-300 hover:text-white hover:bg-navy-700/50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/screening" 
              className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
                isActive('/screening') 
                  ? 'bg-gold-400/10 text-gold-400 border border-gold-400/30' 
                  : 'text-gray-300 hover:text-white hover:bg-navy-700/50'
              }`}
            >
              Stock Screener
            </Link>
            <Link 
              to="/products" 
              className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
                isActive('/products') 
                  ? 'bg-gold-400/10 text-gold-400 border border-gold-400/30' 
                  : 'text-gray-300 hover:text-white hover:bg-navy-700/50'
              }`}
            >
              Products
            </Link>
            <Link 
              to="/sukuk" 
              className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
                isActive('/sukuk') 
                  ? 'bg-gold-400/10 text-gold-400 border border-gold-400/30' 
                  : 'text-gray-300 hover:text-white hover:bg-navy-700/50'
              }`}
            >
              Sukuk
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition ${
                isActive('/') 
                  ? 'bg-gold-400/10 text-gold-400 border border-gold-400/30' 
                  : 'text-gray-300 hover:bg-navy-700/50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/screening" 
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition ${
                isActive('/screening') 
                  ? 'bg-gold-400/10 text-gold-400 border border-gold-400/30' 
                  : 'text-gray-300 hover:bg-navy-700/50'
              }`}
            >
              Stock Screener
            </Link>
            <Link 
              to="/products" 
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition ${
                isActive('/products') 
                  ? 'bg-gold-400/10 text-gold-400 border border-gold-400/30' 
                  : 'text-gray-300 hover:bg-navy-700/50'
              }`}
            >
              Products
            </Link>
            <Link 
              to="/sukuk" 
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition ${
                isActive('/sukuk') 
                  ? 'bg-gold-400/10 text-gold-400 border border-gold-400/30' 
                  : 'text-gray-300 hover:bg-navy-700/50'
              }`}
            >
              Sukuk
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
