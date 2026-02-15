import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import html2canvas from 'html2canvas'

export default function ValentineDay() {
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [dob1, setDob1] = useState('')
  const [dob2, setDob2] = useState('')
  const [compatibility, setCompatibility] = useState(null)
  const [resultCard, setResultCard] = useState(null)
  const cardRef = useRef(null)

  const calculateCompatibility = () => {
    if (!name1 || !name2) {
      alert('Please enter both names!')
      return
    }

    // Fun fake compatibility calculation
    const name1Sum = name1.toLowerCase().split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
    const name2Sum = name2.toLowerCase().split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
    
    let percentage = Math.abs(name1Sum - name2Sum) % 100
    // Make it more realistic (between 60-99%)
    percentage = 60 + (percentage % 40)
    
    // Add some randomness based on DOB if provided
    if (dob1 && dob2) {
      const date1 = new Date(dob1).getTime()
      const date2 = new Date(dob2).getTime()
      const diff = Math.abs(date1 - date2)
      const bonus = (diff % 10000000000) % 20
      percentage = Math.min(99, percentage + bonus)
    }

    setCompatibility(Math.round(percentage))
    
    // Generate fun message
    let message = ''
    if (percentage >= 90) {
      message = 'Perfect Match! You two are meant to be! 💕'
    } else if (percentage >= 80) {
      message = 'Great Compatibility! You make a wonderful couple! ❤️'
    } else if (percentage >= 70) {
      message = 'Good Match! With effort, you can make it work! 💖'
    } else if (percentage >= 60) {
      message = 'Decent Match! Love can grow between you! 🌱'
    } else {
      message = 'Interesting Match! Opposites attract! 😊'
    }

    setResultCard({
      percentage,
      message,
      name1,
      name2,
    })
  }

  const downloadCard = async () => {
    if (!cardRef.current) return

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
      })
      const link = document.createElement('a')
      link.download = `compatibility-${name1}-${name2}-${Date.now()}.png`
      link.href = canvas.toDataURL()
      link.click()
    } catch (error) {
      console.error('Error generating card:', error)
      alert('Error generating card. Please try again.')
    }
  }

  const shareLink = resultCard
    ? `${window.location.origin}${window.location.pathname}?name1=${encodeURIComponent(name1)}&name2=${encodeURIComponent(name2)}&compat=${compatibility}`
    : ''

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold gradient-text mb-3 sm:mb-4">❤️ Valentine's Day</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600">Love Compatibility Calculator</p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {!resultCard ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-6 sm:mb-8 text-center">
              Calculate Your Compatibility
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">First Person's Name</label>
                <input
                  type="text"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  placeholder="Enter name..."
                  className="w-full px-4 py-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:border-pink-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Second Person's Name</label>
                <input
                  type="text"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  placeholder="Enter name..."
                  className="w-full px-4 py-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  First Person's Date of Birth (Optional)
                </label>
                <input
                  type="date"
                  value={dob1}
                  onChange={(e) => setDob1(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:border-pink-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Second Person's Date of Birth (Optional)
                </label>
                <input
                  type="date"
                  value={dob2}
                  onChange={(e) => setDob2(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>

            <button
              onClick={calculateCompatibility}
              className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-4 rounded-xl font-bold text-xl hover:shadow-lg transform transition-all hover:scale-105"
            >
              Calculate Compatibility 💕
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            {/* Result Card */}
            <div
              ref={cardRef}
              className="bg-gradient-to-br from-pink-500 via-red-500 to-rose-500 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 text-white text-center"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">💕</div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">Compatibility Result</h2>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
                <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-3 sm:mb-4">{compatibility}%</div>
                <p className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-4 px-2">{resultCard.message}</p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-2 sm:py-3">
                  <p className="text-xs sm:text-sm opacity-90">Person 1</p>
                  <p className="text-base sm:text-lg md:text-xl font-bold">{name1}</p>
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl">❤️</div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-2 sm:py-3">
                  <p className="text-xs sm:text-sm opacity-90">Person 2</p>
                  <p className="text-base sm:text-lg md:text-xl font-bold">{name2}</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm opacity-75 px-2">
                Share this result with your friends and tag them to try! 😊
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <button
                onClick={downloadCard}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:shadow-lg transform transition-all hover:scale-105"
              >
                Download Card 📥
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareLink)
                  alert('Link copied! Share it with your friends! 📋')
                }}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:shadow-lg transform transition-all hover:scale-105"
              >
                Copy Share Link 🔗
              </button>
            </div>

            <button
              onClick={() => {
                setResultCard(null)
                setCompatibility(null)
                setName1('')
                setName2('')
                setDob1('')
                setDob2('')
              }}
              className="w-full bg-gray-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-600"
            >
              Calculate Again 🔄
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
