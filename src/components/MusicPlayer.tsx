import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEmotion } from '../contexts/EmotionContext'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<'fun' | 'love' | null>(null)
  const [volume, setVolume] = useState(0.3) // Default volume at 30%
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const emotionContext = useEmotion()
  const isEmotionalPage = emotionContext?.isEmotionalPage || false
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Audio file paths - you can replace these with your actual audio files
  const funMusic = '/music/tu-itni-khoobsurat-hai.mp3' // Main song
  const loveMusic = '/music/tu-itni-khoobsurat-hai.mp3' // Same song for now

  useEffect(() => {
    // Create audio element
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.loop = true
      audioRef.current.volume = volume
      
      // Set initial track
      audioRef.current.src = funMusic
      setCurrentTrack('fun')
    }

    // Auto-adjust music based on page emotion (but keep same song)
    if (isEmotionalPage && currentTrack !== 'love') {
      setCurrentTrack('love')
      if (audioRef.current) {
        audioRef.current.src = loveMusic
      }
    } else if (!isEmotionalPage && currentTrack !== 'fun') {
      setCurrentTrack('fun')
      if (audioRef.current) {
        audioRef.current.src = funMusic
      }
    }
  }, [isEmotionalPage, currentTrack, volume])

  // Auto-play after user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true)
        // Auto-start music after first user interaction
        setTimeout(() => {
          if (audioRef.current && !isPlaying) {
            toggleMusic()
          }
        }, 1000)
      }
    }

    // Listen for any user interaction
    document.addEventListener('click', handleFirstInteraction)
    document.addEventListener('keydown', handleFirstInteraction)
    document.addEventListener('touchstart', handleFirstInteraction)

    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }
  }, [hasUserInteracted, isPlaying])

  const toggleMusic = async () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        await audioRef.current.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.log('Audio play failed:', error)
      // Fallback: just toggle the UI state
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
    >
      <motion.div
        className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-4 min-w-[200px]"
        whileHover={{ scale: 1.02 }}
      >
        {/* Main control button */}
        <motion.button
          onClick={toggleMusic}
          className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:from-pink-600 hover:to-purple-600 transition-colors mb-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            🎧
          </motion.span>
          <span>{isPlaying ? 'Playing' : 'Play Music'}</span>
          <AnimatePresence>
            {isPlaying && (
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="text-xs"
              >
                {isEmotionalPage ? '💖' : '🎉'}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Song info */}
        <div className="text-center mb-3">
          <p className="text-xs font-medium text-gray-700">Tu Itni Khoobsurat Hai</p>
          <p className="text-xs text-gray-500">Background Music</p>
        </div>

        {/* Volume control */}
        <div className="flex items-center gap-2">
          <span className="text-xs">🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${volume * 100}%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`
            }}
          />
          <span className="text-xs text-gray-600">{Math.round(volume * 100)}%</span>
        </div>

        {/* Auto-play notice */}
        {!hasUserInteracted && (
          <motion.p
            className="text-xs text-gray-500 mt-2 text-center"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Click anywhere to enable music
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  )
}
