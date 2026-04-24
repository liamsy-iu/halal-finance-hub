import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Sukuk from './pages/Sukuk'
import Screening from './pages/Screening'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sukuk" element={<Sukuk />} />
          <Route path="/screening" element={<Screening />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
