import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function RoseDay() {
  const [name, setName] = useState('')
  const [showRose, setShowRose] = useState(false)
  const [petals, setPetals] = useState([])

  useEffect(() => {
    if (showRose) {
      const interval = setInterval(() => {
        setPetals((prev) => [
          ...prev,
          {
            id: Date.now(),
            left: Math.random() * 100,
            delay: Math.random() * 2,
            duration: 3 + Math.random() * 2,
          },
        ])
      }, 300)

      return () => clearInterval(interval)
    }
  }, [showRose])

  const handleGenerate = () => {
    if (name.trim()) {
      setShowRose(true)
      setPetals([])
    }
  }

  const shareLink = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(name)}`

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 min-h-screen flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 sm:mb-8"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold gradient-text mb-3 sm:mb-4">🌹 Rose Day</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 px-2">Send a Digital Rose to Someone Special</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 max-w-md w-full mb-6 sm:mb-8"
      >
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Enter Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name or their name..."
            className="w-full px-4 py-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:border-pink-500 text-lg"
            onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
          />
        </div>
        <button
          onClick={handleGenerate}
          className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform transition-all hover:scale-105"
        >
          Generate Rose 🌹
        </button>
      </motion.div>

      <AnimatePresence>
        {showRose && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="relative"
          >
            <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-6 sm:mb-8 animate-bounce">🌹</div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg sm:text-xl md:text-2xl font-bold text-pink-600 text-center px-2"
            >
              {name ? `For ${name} ❤️` : 'A Rose for You ❤️'}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Falling Petals */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            initial={{ y: -20, x: petal.left + '%', opacity: 1 }}
            animate={{ y: '100vh', rotate: 360 }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              ease: 'linear',
            }}
            className="absolute text-2xl"
          >
            🌸
          </motion.div>
        ))}
      </div>

      {showRose && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 sm:mt-8 bg-white rounded-xl p-4 sm:p-6 shadow-lg max-w-md w-full"
        >
          <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Share this Rose 💌</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={shareLink}
              readOnly
              className="flex-1 px-3 sm:px-4 py-2 border-2 border-pink-300 rounded-lg text-xs sm:text-sm"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareLink)
                alert('Link copied! 📋')
              }}
              className="bg-pink-500 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-pink-600 text-sm sm:text-base whitespace-nowrap"
            >
              Copy
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
