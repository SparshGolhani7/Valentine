import { useState } from 'react'
import { motion } from 'framer-motion'

const messages = [
  { id: 1, text: 'You make my heart skip a beat! 💓', blur: true },
  { id: 2, text: 'Every moment with you is magical! ✨', blur: true },
  { id: 3, text: 'You are my sunshine! ☀️', blur: true },
  { id: 4, text: 'I fall for you more every day! 💕', blur: true },
  { id: 5, text: 'You are my everything! ❤️', blur: true },
]

export default function KissDay() {
  const [revealedMessages, setRevealedMessages] = useState(new Set())
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [customMessage, setCustomMessage] = useState('')
  const [customBlur, setCustomBlur] = useState(true)

  const handleReveal = (id) => {
    setRevealedMessages((prev) => new Set([...prev, id]))
  }

  const correctPassword = 'love' // Simple password for demo

  const handlePasswordSubmit = () => {
    if (password.toLowerCase() === correctPassword) {
      setShowPassword(true)
      setCustomBlur(false)
    } else {
      alert('Wrong password! Try again 😉')
      setPassword('')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold gradient-text mb-3 sm:mb-4">😘 Kiss Day</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600">Reveal Hidden Messages</p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {/* Message Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: message.id * 0.1 }}
              className="relative"
            >
              <div
                className={`bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 cursor-pointer transform transition-all hover:scale-105 ${
                  revealedMessages.has(message.id) ? 'border-2 sm:border-4 border-pink-500' : ''
                }`}
                onMouseEnter={() => handleReveal(message.id)}
                onClick={() => handleReveal(message.id)}
              >
                <div
                  className={`text-center transition-all duration-500 ${
                    revealedMessages.has(message.id)
                      ? 'blur-0 opacity-100'
                      : 'blur-md opacity-50'
                  }`}
                >
                  <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">💋</div>
                  <p className="text-base sm:text-lg md:text-xl font-semibold text-pink-600 px-2">{message.text}</p>
                </div>
                {!revealedMessages.has(message.id) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-400 text-xs sm:text-sm">Hover or click to reveal 👆</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Password Protected Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 text-white mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">🔒 Secret Message</h2>
          {!showPassword ? (
            <div>
              <p className="text-center mb-4 sm:mb-6 opacity-90 text-sm sm:text-base px-2">
                Enter the password to reveal a special message for your crush 😏
              </p>
              <div className="max-w-md mx-auto">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password..."
                  className="w-full px-4 py-3 rounded-xl text-gray-800 mb-4 focus:outline-none text-sm sm:text-base"
                  onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                />
                <button
                  onClick={handlePasswordSubmit}
                  className="w-full bg-white text-pink-600 py-3 rounded-xl font-bold hover:bg-gray-100 transform transition-all hover:scale-105 text-sm sm:text-base"
                >
                  Unlock Message 🔓
                </button>
                <p className="text-center mt-4 text-xs sm:text-sm opacity-75">
                  Hint: It's a 4-letter word that starts with 'l' 😉
                </p>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">💕</div>
              <p className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">You unlocked it! 🎉</p>
              <div className="bg-white/20 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
                <p className="text-lg sm:text-xl md:text-2xl px-2">
                  {customMessage || 'You are special and I wanted to tell you that! ❤️'}
                </p>
              </div>
              <div className="mt-4 sm:mt-6">
                <input
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Or write your own message..."
                  className="w-full px-4 py-3 rounded-xl text-gray-800 mb-4 focus:outline-none text-sm sm:text-base"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(customMessage || 'You are special and I wanted to tell you that! ❤️')
                    alert('Message copied! 📋')
                  }}
                  className="bg-white text-pink-600 px-6 sm:px-8 py-3 rounded-xl font-bold hover:bg-gray-100 text-sm sm:text-base w-full sm:w-auto"
                >
                  Copy Message 📋
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 text-center"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-pink-600 mb-4">💋 How to Use</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="bg-pink-50 rounded-xl p-4">
              <div className="text-3xl mb-2">👆</div>
              <p className="font-semibold text-gray-800">Hover or Click</p>
              <p className="text-sm text-gray-600">Reveal hidden messages</p>
            </div>
            <div className="bg-pink-50 rounded-xl p-4">
              <div className="text-3xl mb-2">🔒</div>
              <p className="font-semibold text-gray-800">Password Protected</p>
              <p className="text-sm text-gray-600">Unlock secret message</p>
            </div>
            <div className="bg-pink-50 rounded-xl p-4">
              <div className="text-3xl mb-2">📋</div>
              <p className="font-semibold text-gray-800">Share</p>
              <p className="text-sm text-gray-600">Copy and send to your crush</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
