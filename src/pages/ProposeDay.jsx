import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProposeDay() {
  const [showProposal, setShowProposal] = useState(false)
  const [answer, setAnswer] = useState(null)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [showConfetti, setShowConfetti] = useState(false)
  const [proposalText, setProposalText] = useState('')
  const [currentChar, setCurrentChar] = useState(0)

  const fullProposal = "Will you be my Valentine? 💕"

  const handleStart = () => {
    setShowProposal(true)
    setProposalText('')
    setCurrentChar(0)
    setAnswer(null)
    setShowConfetti(false)
  }

  const handleTyping = () => {
    if (currentChar < fullProposal.length) {
      setProposalText(fullProposal.slice(0, currentChar + 1))
      setCurrentChar(currentChar + 1)
    }
  }

  const handleYes = () => {
    setAnswer('yes')
    setShowConfetti(true)
  }

  const handleNo = (e) => {
    const button = e.target
    const rect = button.getBoundingClientRect()
    const maxX = window.innerWidth - rect.width
    const maxY = window.innerHeight - rect.height
    
    setNoButtonPosition({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 min-h-screen flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 sm:mb-8"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold gradient-text mb-3 sm:mb-4">💍 Propose Day</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600">Will You Be Mine?</p>
      </motion.div>

      {!showProposal ? (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
          className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl md:text-2xl shadow-2xl"
        >
          Start Proposal 💍
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 max-w-2xl w-full text-center mx-2"
        >
          <div className="mb-6 sm:mb-8">
            <motion.h2
              key={proposalText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-pink-600 mb-4 sm:mb-6 min-h-[80px] sm:min-h-[100px] md:min-h-[120px] px-2"
            >
              {proposalText}
              <span className="animate-pulse">|</span>
            </motion.h2>
            {proposalText.length < fullProposal.length && (
              <motion.button
                onClick={handleTyping}
                className="bg-pink-100 text-pink-600 px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm sm:text-base"
              >
                Continue Typing...
              </motion.button>
            )}
          </div>

          {proposalText.length === fullProposal.length && !answer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleYes}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 sm:px-10 md:px-12 py-3 sm:py-4 rounded-xl font-bold text-lg sm:text-xl shadow-lg w-full sm:w-auto"
              >
                Yes! ❤️
              </motion.button>
              <motion.button
                style={{
                  position: noButtonPosition.x || noButtonPosition.y ? 'fixed' : 'relative',
                  left: noButtonPosition.x || undefined,
                  top: noButtonPosition.y || undefined,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={handleNo}
                onClick={handleNo}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 sm:px-10 md:px-12 py-3 sm:py-4 rounded-xl font-bold text-lg sm:text-xl shadow-lg w-full sm:w-auto"
              >
                No 😢
              </motion.button>
            </motion.div>
          )}

          <AnimatePresence>
            {answer === 'yes' && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="mt-8"
              >
                <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">🎉</div>
                <h3 className="text-2xl sm:text-3xl font-bold text-green-600 mb-3 sm:mb-4">Yay! You said Yes! 💕</h3>
                <p className="text-lg sm:text-xl text-gray-600 px-2">Let's make beautiful memories together! ❤️</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Confetti */}
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-50">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -100, x: Math.random() * window.innerWidth, opacity: 1 }}
                  animate={{ y: window.innerHeight + 100, rotate: 360 }}
                  transition={{
                    duration: 2 + Math.random(),
                    delay: Math.random(),
                    ease: 'easeOut',
                  }}
                  className="absolute text-2xl"
                >
                  {['🎉', '🎊', '💕', '❤️', '💖', '✨'][Math.floor(Math.random() * 6)]}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
