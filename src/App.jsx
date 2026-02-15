import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Home from './pages/Home'
import RoseDay from './pages/RoseDay'
import ProposeDay from './pages/ProposeDay'
import ChocolateDay from './pages/ChocolateDay'
import TeddyDay from './pages/TeddyDay'
import PromiseDay from './pages/PromiseDay'
import HugDay from './pages/HugDay'
import KissDay from './pages/KissDay'
import ValentineDay from './pages/ValentineDay'

const valentineDays = [
  { path: '/rose', name: 'Rose Day', emoji: '🌹', date: 'Feb 7' },
  { path: '/propose', name: 'Propose Day', emoji: '💍', date: 'Feb 8' },
  { path: '/chocolate', name: 'Chocolate Day', emoji: '🍫', date: 'Feb 9' },
  { path: '/teddy', name: 'Teddy Day', emoji: '🧸', date: 'Feb 10' },
  { path: '/promise', name: 'Promise Day', emoji: '🤝', date: 'Feb 11' },
  { path: '/hug', name: 'Hug Day', emoji: '🤗', date: 'Feb 12' },
  { path: '/kiss', name: 'Kiss Day', emoji: '😘', date: 'Feb 13' },
  { path: '/valentine', name: "Valentine's Day", emoji: '❤️', date: 'Feb 14' },
]

function Navigation() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-xl md:text-2xl font-bold gradient-text flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>💕</span>
            <span className="hidden sm:inline">Valentine's Week</span>
            <span className="sm:hidden">V-Week</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-2 xl:gap-4">
            {valentineDays.map((day) => (
              <Link
                key={day.path}
                to={day.path}
                className={`px-2 xl:px-3 py-2 rounded-lg transition-all text-sm xl:text-base ${
                  location.pathname === day.path
                    ? 'bg-pink-500 text-white'
                    : 'hover:bg-pink-100 text-gray-700'
                }`}
              >
                <span className="text-base xl:text-lg">{day.emoji}</span>
                <span className="ml-1 hidden xl:inline">{day.date}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-pink-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-2">
                {valentineDays.map((day) => (
                  <Link
                    key={day.path}
                    to={day.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg transition-all text-sm ${
                      location.pathname === day.path
                        ? 'bg-pink-500 text-white'
                        : 'bg-pink-50 hover:bg-pink-100 text-gray-700'
                    }`}
                  >
                    <span className="text-base mr-2">{day.emoji}</span>
                    <span>{day.name}</span>
                    <span className="block text-xs opacity-75 mt-1">{day.date}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-rose-100 bg-hearts">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rose" element={<RoseDay />} />
          <Route path="/propose" element={<ProposeDay />} />
          <Route path="/chocolate" element={<ChocolateDay />} />
          <Route path="/teddy" element={<TeddyDay />} />
          <Route path="/promise" element={<PromiseDay />} />
          <Route path="/hug" element={<HugDay />} />
          <Route path="/kiss" element={<KissDay />} />
          <Route path="/valentine" element={<ValentineDay />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
