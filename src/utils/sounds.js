// Sound effects utility
export const playSound = (soundType) => {
  try {
    // Create audio context for sound generation
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    
    let frequency, duration, waveType
    
    switch (soundType) {
      case 'success':
        frequency = 523.25 // C5
        duration = 200
        waveType = 'sine'
        break
      case 'click':
        frequency = 800
        duration = 100
        waveType = 'square'
        break
      case 'heart':
        frequency = 659.25 // E5
        duration = 150
        waveType = 'sine'
        break
      case 'hug':
        frequency = 440
        duration = 300
        waveType = 'sine'
        break
      case 'kiss':
        frequency = 880
        duration = 100
        waveType = 'sine'
        break
      case 'confetti':
        // Play multiple tones for confetti
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            const freq = 440 + (i * 100)
            playTone(audioContext, freq, 100, 'sine')
          }, i * 50)
        }
        return
      default:
        frequency = 440
        duration = 200
        waveType = 'sine'
    }
    
    playTone(audioContext, frequency, duration, waveType)
  } catch (error) {
    // Silently fail if audio context is not available
    console.log('Audio not available')
  }
}

const playTone = (audioContext, frequency, duration, type = 'sine') => {
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.frequency.value = frequency
  oscillator.type = type
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000)
  
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + duration / 1000)
}
