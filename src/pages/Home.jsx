import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const valentineDays = [
  { path: '/rose', name: 'Rose Day', emoji: '🌹', date: 'Feb 7', color: 'from-red-500 to-pink-500' },
  { path: '/propose', name: 'Propose Day', emoji: '💍', date: 'Feb 8', color: 'from-pink-500 to-rose-500' },
  { path: '/chocolate', name: 'Chocolate Day', emoji: '🍫', date: 'Feb 9', color: 'from-amber-600 to-orange-500' },
  { path: '/teddy', name: 'Teddy Day', emoji: '🧸', date: 'Feb 10', color: 'from-brown-500 to-amber-500' },
  { path: '/promise', name: 'Promise Day', emoji: '🤝', date: 'Feb 11', color: 'from-blue-500 to-cyan-500' },
  { path: '/hug', name: 'Hug Day', emoji: '🤗', date: 'Feb 12', color: 'from-purple-500 to-pink-500' },
  { path: '/kiss', name: 'Kiss Day', emoji: '😘', date: 'Feb 13', color: 'from-rose-500 to-red-500' },
  { path: '/valentine', name: "Valentine's Day", emoji: '❤️', date: 'Feb 14', color: 'from-red-600 to-pink-600' },
]

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="flex justify-center items-center gap-2 sm:gap-4 mb-6 flex-wrap">
          <motion.span
            className="text-4xl sm:text-6xl heart-float"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ❤️
          </motion.span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold gradient-text text-center">Valentine's Week</h1>
          <motion.span
            className="text-4xl sm:text-6xl heart-float"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            💕
          </motion.span>
        </div>
        <p className="text-xl sm:text-2xl md:text-3xl text-pink-600 font-light mb-4 px-4">8 Days of Love & Romance</p>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          Celebrate each day of Valentine's Week with interactive experiences
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 px-2">
        {valentineDays.map((day, index) => (
          <motion.div
            key={day.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to={day.path}>
              <div className={`bg-gradient-to-br ${day.color} rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 text-white cursor-pointer h-full flex flex-col items-center justify-center transform transition-all hover:shadow-2xl`}>
                <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">{day.emoji}</div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-center">{day.name}</h2>
                <p className="text-base sm:text-lg opacity-90">{day.date}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white shadow-2xl text-center">
          <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">💝</div>
          <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light italic mb-3 sm:mb-4 px-2">
            "Love is not about how many days, months, or years you have been together. 
            Love is about how much you love each other every single day."
          </blockquote>
          <p className="text-base sm:text-lg md:text-xl opacity-90">— Unknown</p>
        </div>
      </motion.div>
    </div>
  )
}
