import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import html2canvas from 'html2canvas'

const promiseTypes = {
  funny: [
    'I promise to always share my snacks with you! 🍕',
    'I promise to laugh at your jokes, even the bad ones! 😂',
    'I promise to always let you choose the movie! 🎬',
    'I promise to never judge your pizza toppings! 🍕',
  ],
  serious: [
    'I promise to always be there for you, no matter what. 💪',
    'I promise to support your dreams and goals. 🌟',
    'I promise to love you unconditionally. ❤️',
    'I promise to grow old with you and make beautiful memories. 💕',
  ],
  romantic: [
    'I promise to make you smile every single day. 😊',
    'I promise to love you more with each passing day. 💖',
    'I promise to be your partner in all adventures. 🗺️',
    'I promise to hold your hand through everything. 🤝',
  ],
}

export default function PromiseDay() {
  const [selectedType, setSelectedType] = useState('funny')
  const [selectedPromise, setSelectedPromise] = useState('')
  const [name, setName] = useState('')
  const [date, setDate] = useState(new Date().toLocaleDateString())
  const certificateRef = useRef(null)

  const generatePromise = () => {
    const promises = promiseTypes[selectedType]
    const randomPromise = promises[Math.floor(Math.random() * promises.length)]
    setSelectedPromise(randomPromise)
  }

  const downloadCertificate = async () => {
    if (!certificateRef.current) return

    try {
      const canvas = await html2canvas(certificateRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
      })
      const link = document.createElement('a')
      link.download = `promise-certificate-${Date.now()}.png`
      link.href = canvas.toDataURL()
      link.click()
    } catch (error) {
      console.error('Error generating certificate:', error)
      alert('Error generating certificate. Please try again.')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold gradient-text mb-3 sm:mb-4">🤝 Promise Day</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600">Generate Your Promise Certificate</p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Generator Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-pink-600 mb-4 sm:mb-6">Create Your Promise</h2>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Promise Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:border-pink-500"
              >
                <option value="funny">Funny 😂</option>
                <option value="serious">Serious 💪</option>
                <option value="romantic">Romantic 💕</option>
              </select>
            </div>

            <button
              onClick={generatePromise}
              className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg mb-6 hover:shadow-lg transform transition-all hover:scale-105"
            >
              Generate Promise ✨
            </button>

            {selectedPromise && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-pink-50 rounded-xl p-4 border-2 border-pink-300 mb-6"
              >
                <p className="text-lg font-semibold text-pink-800">{selectedPromise}</p>
              </motion.div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                className="w-full px-4 py-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:border-pink-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Date</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:border-pink-500"
              />
            </div>
          </motion.div>

          {/* Certificate Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-pink-600 mb-6">Certificate Preview</h2>
            <div
              ref={certificateRef}
              className="bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl p-4 sm:p-6 md:p-8 border-2 sm:border-4 border-pink-300"
            >
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">🏆</div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-600 mb-4 sm:mb-6">Promise Certificate</h3>
                <div className="bg-white rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border-2 border-pink-200">
                  <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 sm:mb-4">
                    {selectedPromise || 'Generate a promise to see it here...'}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center mt-6 sm:mt-8 gap-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Signed by</p>
                    <p className="font-bold text-pink-600 text-sm sm:text-base">{name || 'Your Name'}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Date</p>
                    <p className="font-bold text-pink-600 text-sm sm:text-base">{date}</p>
                  </div>
                </div>
              </div>
            </div>
            {selectedPromise && name && (
              <button
                onClick={downloadCertificate}
                className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform transition-all hover:scale-105"
              >
                Download Certificate 📥
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
