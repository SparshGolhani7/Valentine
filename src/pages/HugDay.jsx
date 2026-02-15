import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playSound } from '../utils/sounds'
import NextDayButton from '../components/NextDayButton'

// Mock leaderboard data
const initialLeaderboard = [
  { name: 'Alex', hugs: 127 },
  { name: 'Sam', hugs: 98 },
  { name: 'Jordan', hugs: 85 },
  { name: 'Taylor', hugs: 72 },
  { name: 'Casey', hugs: 65 },
]

export default function HugDay() {
  const [hugCount, setHugCount] = useState(0)
  const [isHugging, setIsHugging] = useState(false)
  const [leaderboard, setLeaderboard] = useState(initialLeaderboard)
  const [userName, setUserName] = useState('')
  const [showInput, setShowInput] = useState(true)

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('hugDayData')
    if (saved) {
      const data = JSON.parse(saved)
      setHugCount(data.count)
      setUserName(data.name)
      setShowInput(false)
    }
  }, [])

  const handleHug = () => {
    if (!userName && showInput) {
      playSound('click')
      alert('Please enter your name first!')
      return
    }

    if (showInput && userName) {
      setShowInput(false)
      localStorage.setItem('hugDayData', JSON.stringify({ name: userName, count: 0 }))
    }

    setIsHugging(true)
    const newCount = hugCount + 1
    setHugCount(newCount)
    playSound('hug')
    
    // Update localStorage
    localStorage.setItem('hugDayData', JSON.stringify({ name: userName, count: newCount }))

    // Update leaderboard (mock)
    setLeaderboard((prev) => {
      const updated = [...prev]
      const userIndex = updated.findIndex((u) => u.name === userName)
      if (userIndex >= 0) {
        updated[userIndex].hugs = newCount
      } else if (updated.length < 10) {
        updated.push({ name: userName, hugs: newCount })
      }
      return updated.sort((a, b) => b.hugs - a.hugs).slice(0, 10)
    })

    setTimeout(() => setIsHugging(false), 500)
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold gradient-text mb-3 sm:mb-4">🤗 Hug Day</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600">Send Virtual Hugs & See Global Counter</p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Hug Counter */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 text-center"
          >
            {showInput ? (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-pink-600 mb-4 sm:mb-6">Enter Your Name</h2>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Your name..."
                  className="w-full px-4 py-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:border-pink-500 mb-4 sm:mb-6 text-sm sm:text-base"
                  onKeyPress={(e) => e.key === 'Enter' && handleHug()}
                />
                <button
                  onClick={handleHug}
                  className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:shadow-lg transform transition-all hover:scale-105"
                >
                  Start Hugging! 🤗
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl sm:text-2xl font-bold text-pink-600 mb-3 sm:mb-4">Your Hugs</h2>
                <motion.div
                  key={hugCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-5xl sm:text-6xl md:text-7xl font-bold gradient-text mb-4 sm:mb-6"
                >
                  {hugCount}
                </motion.div>
                <motion.button
                  onClick={handleHug}
                  disabled={isHugging}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={isHugging ? { scale: [1, 1.2, 1] } : {}}
                  className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 sm:py-4 rounded-xl font-bold text-lg sm:text-xl hover:shadow-lg"
                >
                  {isHugging ? '🤗 Hugging...' : '🤗 Give a Hug!'}
                </motion.button>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">
                  Keep hugging to climb the leaderboard! 💪
                </p>
              </>
            )}
          </motion.div>

          {/* Global Counter */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 text-white text-center"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Global Hug Counter</h2>
            <motion.div
              key={leaderboard.reduce((sum, u) => sum + u.hugs, 0)}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6"
            >
              {leaderboard.reduce((sum, u) => sum + u.hugs, 0).toLocaleString()}
            </motion.div>
            <p className="text-base sm:text-lg opacity-90">Total hugs shared worldwide! 🌍</p>
          </motion.div>
        </div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-4 sm:mb-6 text-center">🏆 Top Huggers</h2>
          <div className="space-y-3 sm:space-y-4">
            <AnimatePresence>
              {leaderboard.map((user, index) => (
                <motion.div
                  key={user.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`flex items-center justify-between p-3 sm:p-4 rounded-xl ${
                    user.name === userName
                      ? 'bg-pink-100 border-2 border-pink-500'
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-white text-sm sm:text-base ${
                        index === 0
                          ? 'bg-yellow-500'
                          : index === 1
                          ? 'bg-gray-400'
                          : index === 2
                          ? 'bg-orange-500'
                          : 'bg-pink-500'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm sm:text-base">
                        {user.name} {user.name === userName && '(You)'}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">{user.hugs} hugs</p>
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🤗'}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {hugCount > 0 && <NextDayButton currentPath="/hug" />}
    </div>
  )
}
