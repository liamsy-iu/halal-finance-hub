import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center islamic-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/90 via-navy-900/80 to-navy-900" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 md:py-32">
          <div className="inline-block mb-4 md:mb-6 px-3 md:px-4 py-1.5 md:py-2 bg-gold-400/10 border border-gold-400/30 rounded-full">
            <span className="text-gold-400 text-xs md:text-sm font-medium tracking-wider uppercase">
              Bridging Scholarship & Fintech
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-4 md:mb-6 leading-tight px-4">
            Navigate Islamic Finance
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-emerald-400">
              With Confidence
            </span>
          </h1>
          
          <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed px-4">
            Screen stocks according to AAOIFI standards, explore halal financial products, 
            and understand sukuk structures — all grounded in authentic Islamic scholarship.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <Link to="/screening" className="btn-primary text-sm md:text-base">
              Start Screening Stocks
            </Link>
            <Link to="/products" className="btn-secondary text-sm md:text-base">
              Explore Products
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative bg-navy-800 py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-4">
              Shariah-Compliant Investment Tools
            </h2>
            <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-gold-400 to-emerald-400 mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <div className="card-premium group hover:-translate-y-2">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-display font-semibold text-white mb-2 md:mb-3">
                AAOIFI Stock Screening
              </h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-3 md:mb-4">
                Screen stocks against AAOIFI's comprehensive criteria including debt ratios, 
                interest income, and impermissible revenue thresholds.
              </p>
              <Link to="/screening" className="text-gold-400 hover:text-gold-300 font-medium inline-flex items-center gap-2 group text-sm md:text-base">
                Try the screener
                <svg className="w-4 h-4 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="card-premium group hover:-translate-y-2">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-navy-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-display font-semibold text-white mb-2 md:mb-3">
                Islamic Finance Products
              </h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-3 md:mb-4">
                Explore halal financial instruments including Murabaha, Ijara, Musharaka, 
                with detailed Shariah compliance explanations.
              </p>
              <Link to="/products" className="text-gold-400 hover:text-gold-300 font-medium inline-flex items-center gap-2 group text-sm md:text-base">
                Browse products
                <svg className="w-4 h-4 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="card-premium group hover:-translate-y-2 sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-display font-semibold text-white mb-2 md:mb-3">
                Sukuk Structures
              </h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-3 md:mb-4">
                Understand different sukuk types, their underlying assets, 
                and compliance mechanisms with interactive diagrams.
              </p>
              <Link to="/sukuk" className="text-gold-400 hover:text-gold-300 font-medium inline-flex items-center gap-2 group text-sm md:text-base">
                Explore sukuk
                <svg className="w-4 h-4 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
