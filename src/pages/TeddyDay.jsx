import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function TeddyDay() {
  const [hugCount, setHugCount] = useState(0)
  const [isHugging, setIsHugging] = useState(false)
  const [hearts, setHearts] = useState([])
  const [soundEnabled, setSoundEnabled] = useState(false)

  const handleHug = () => {
    setIsHugging(true)
    setHugCount((prev) => prev + 1)
    
    // Generate hearts
    const newHearts = []
    for (let i = 0; i < 10; i++) {
      newHearts.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
      })
    }
    setHearts((prev) => [...prev, ...newHearts])

    setTimeout(() => setIsHugging(false), 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 min-h-screen flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 sm:mb-8"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold gradient-text mb-3 sm:mb-4">🧸 Teddy Day</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600">Give a Virtual Hug</p>
      </motion.div>

      <div className="relative">
        <motion.button
          onClick={handleHug}
          disabled={isHugging}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={isHugging ? { scale: [1, 1.2, 1] } : {}}
          className="bg-transparent border-none cursor-pointer focus:outline-none"
        >
          <motion.div
            animate={isHugging ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 0.5 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl"
          >
            🧸
          </motion.div>
        </motion.button>

        {/* Heart Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <AnimatePresence>
            {hearts.map((heart) => (
              <motion.div
                key={heart.id}
                initial={{ y: 0, x: heart.x + '%', opacity: 1, scale: 0 }}
                animate={{ y: -100, opacity: 0, scale: 1.5 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2,
                  delay: heart.delay,
                  ease: 'easeOut',
                }}
                className="absolute text-3xl"
              >
                ❤️
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 sm:mt-8 bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 max-w-md w-full text-center"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-3 sm:mb-4">Hug Counter</h2>
        <motion.div
          key={hugCount}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-5xl sm:text-6xl font-bold gradient-text mb-3 sm:mb-4"
        >
          {hugCount}
        </motion.div>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-2">
          {hugCount === 0
            ? 'Click the teddy to give a hug! 🤗'
            : hugCount === 1
            ? 'First hug! So warm! 💕'
            : hugCount < 5
            ? 'More hugs = More love! ❤️'
            : hugCount < 10
            ? 'You are so loving! 💖'
            : 'Hug Master! 🏆'}
        </p>

        <div className="flex items-center justify-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
            <span className="text-sm sm:text-base text-gray-700">Sound Effects 🔊</span>
          </label>
        </div>
      </motion.div>

      {hugCount > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 sm:mt-6 text-center px-4"
        >
          <p className="text-base sm:text-lg text-gray-600">
            Share your hug count: <span className="font-bold text-pink-600">{hugCount} hugs! 🤗</span>
          </p>
        </motion.div>
      )}
    </div>
  )
}
