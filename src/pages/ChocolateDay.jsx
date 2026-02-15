import { useState } from 'react'
import { motion } from 'framer-motion'
import { playSound } from '../utils/sounds'
import NextDayButton from '../components/NextDayButton'

const chocolates = [
  { id: 1, emoji: '🍫', name: 'Dark Chocolate', message: 'Rich and intense, just like my love for you!' },
  { id: 2, emoji: '🍬', name: 'Sweet Candy', message: 'You make everything sweeter!' },
  { id: 3, emoji: '🍰', name: 'Chocolate Cake', message: 'Life is better with you and chocolate!' },
  { id: 4, emoji: '🍪', name: 'Chocolate Cookie', message: 'You are the sweetest thing in my life!' },
  { id: 5, emoji: '🧁', name: 'Cupcake', message: 'You are as sweet as this cupcake!' },
  { id: 6, emoji: '🍩', name: 'Donut', message: 'I donut know what I would do without you!' },
]

const sweetMessages = [
  'You are sweeter than chocolate! 🍫',
  'Life is better with you! 💕',
  'You make my heart melt! ❤️',
  'You are my favorite treat! 🍰',
  'Sweet dreams are made of you! 🌙',
  'You are the sugar in my life! 🍬',
]

export default function ChocolateDay() {
  const [flipped, setFlipped] = useState({})
  const [randomMessage, setRandomMessage] = useState('')

  const handleFlip = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }))
    playSound('click')
  }

  const generateMessage = () => {
    const message = sweetMessages[Math.floor(Math.random() * sweetMessages.length)]
    setRandomMessage(message)
    playSound('success')
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    playSound('click')
    alert('Message copied! 📋')
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold gradient-text mb-3 sm:mb-4">🍫 Chocolate Day</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600">Pick Your Favorite Chocolate</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        {chocolates.map((chocolate) => (
          <motion.div
            key={chocolate.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: chocolate.id * 0.1 }}
            className="relative h-56 sm:h-64 md:h-72 perspective-1000"
            onClick={() => handleFlip(chocolate.id)}
          >
            <motion.div
              className="relative w-full h-full preserve-3d"
              animate={{ rotateY: flipped[chocolate.id] ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front */}
              <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-amber-600 to-orange-500 rounded-2xl sm:rounded-3xl shadow-xl flex flex-col items-center justify-center cursor-pointer p-4">
                <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-3 sm:mb-4">{chocolate.emoji}</div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center">{chocolate.name}</h3>
                <p className="text-white/80 mt-2 text-sm sm:text-base">Click to flip</p>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 backface-hidden bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 flex flex-col items-center justify-center"
                style={{ transform: 'rotateY(180deg)' }}
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{chocolate.emoji}</div>
                <p className="text-gray-700 text-center font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{chocolate.message}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    copyToClipboard(chocolate.message)
                  }}
                  className="bg-pink-500 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold hover:bg-pink-600 text-sm sm:text-base"
                >
                  Copy Message 📋
                </button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 max-w-2xl mx-auto text-center"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-4 sm:mb-6">Random Sweet Message Generator</h2>
        <button
          onClick={generateMessage}
          className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg mb-4 sm:mb-6 hover:shadow-lg transform transition-all hover:scale-105 w-full sm:w-auto"
        >
          Generate Sweet Message 🍬
        </button>
        {randomMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-pink-50 rounded-xl p-4 sm:p-6 border-2 border-pink-300"
          >
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-pink-800 mb-3 sm:mb-4 px-2">{randomMessage}</p>
            <button
              onClick={() => copyToClipboard(randomMessage)}
              className="bg-pink-500 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-pink-600 text-sm sm:text-base"
            >
              Copy to Send 📋
            </button>
          </motion.div>
        )}
      </motion.div>

      {randomMessage && <NextDayButton currentPath="/chocolate" />}

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  )
}
