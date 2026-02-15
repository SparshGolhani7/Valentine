import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { playSound } from '../utils/sounds'

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

export default function NextDayButton({ currentPath }) {
  const currentIndex = valentineDays.findIndex(day => day.path === currentPath)
  const nextDay = currentIndex >= 0 && currentIndex < valentineDays.length - 1 
    ? valentineDays[currentIndex + 1] 
    : null

  if (!nextDay) return null

  const handleClick = () => {
    playSound('click')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-8 sm:mt-12 text-center"
    >
      <Link
        to={nextDay.path}
        onClick={handleClick}
        className="inline-block"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl shadow-xl font-bold text-lg sm:text-xl flex items-center gap-3 sm:gap-4"
        >
          <span>Next: {nextDay.emoji} {nextDay.name}</span>
          <span className="text-2xl">→</span>
        </motion.div>
      </Link>
    </motion.div>
  )
}
