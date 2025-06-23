'use client'
import { useState, useEffect } from 'react'

export default function GlitchPage() {
  const [isGlitching, setIsGlitching] = useState(false)
  const [glitchText, setGlitchText] = useState('GLITCH EFFECT')
  const [errorCount, setErrorCount] = useState(0)

  useEffect(() => {
    if (!isGlitching) return

    const interval = setInterval(() => {
      // Randomly change characters to create glitch effect
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?'
      const newText = glitchText.split('').map(char => 
        Math.random() < 0.1 ? chars[Math.floor(Math.random() * chars.length)] : char
      ).join('')
      setGlitchText(newText)
    }, 100)

    return () => clearInterval(interval)
  }, [isGlitching, glitchText])

  const throwGlitchError = () => {
    try {
      // @ts-expect-error - Intentionally causing an error
      const result = undefinedVariable.glitchMethod()
      console.log(result)
    } catch (error) {
      setErrorCount(prev => prev + 1)
      throw error
    }
  }

  const throwCorruptionError = () => {
    try {
      throw new Error('Data corruption detected in glitch matrix!')
    } catch (error) {
      setErrorCount(prev => prev + 1)
      throw error
    }
  }

  const causeVisualGlitch = () => {
    try {
      // Simulate a visual glitch by manipulating DOM
      const elements = document.querySelectorAll('*')
      elements.forEach((el, index) => {
        if (index % 100 === 0) {
          // @ts-expect-error - Intentionally causing a DOM error
          el.invalidProperty = 'glitch'
        }
      })
    } catch (error) {
      setErrorCount(prev => prev + 1)
      throw error
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Glitch background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-cyan-900" />
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-full bg-white animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.5 + Math.random() * 1}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <div className="text-center space-y-8">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 relative">
            <span className={`block ${isGlitching ? 'animate-glitch' : ''}`}>
              {glitchText}
            </span>
            <span className={`block absolute top-0 left-0 text-red-500 ${isGlitching ? 'animate-glitch-red' : 'opacity-0'}`}>
              {glitchText}
            </span>
            <span className={`block absolute top-0 left-0 text-blue-500 ${isGlitching ? 'animate-glitch-blue' : 'opacity-0'}`}>
              {glitchText}
            </span>
          </h1>

          <div className="space-y-4">
            <button
              onClick={() => setIsGlitching(!isGlitching)}
              className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors mr-4"
            >
              {isGlitching ? 'Stop' : 'Start'} Glitch
            </button>
            
            <button
              onClick={() => setGlitchText('GLITCH EFFECT')}
              className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors"
            >
              Reset Text
            </button>
          </div>

          {/* Error demo section */}
          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold text-red-400">Error Demo Zone</h2>
            <p className="text-gray-300 max-w-md mx-auto">
              Trigger various errors to see how the glitch system handles them.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={throwGlitchError}
                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded transition-colors"
              >
                Glitch Error
              </button>
              
              <button
                onClick={throwCorruptionError}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded transition-colors"
              >
                Data Corruption
              </button>
              
              <button
                onClick={causeVisualGlitch}
                className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded transition-colors"
              >
                Visual Glitch
              </button>
            </div>

            <div className="text-gray-400 text-sm">
              Errors triggered: {errorCount}
            </div>
          </div>

          {/* Glitch info */}
          <div className="mt-12 p-6 bg-gray-800/50 rounded-lg border border-gray-600 max-w-2xl">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Glitch System Info</h3>
            <div className="text-gray-400 space-y-2 text-sm">
              <p>• The glitch effect randomly changes characters in the text</p>
              <p>• RGB color separation creates the classic glitch look</p>
              <p>• Error buttons demonstrate various types of JavaScript errors</p>
              <p>• Each error is caught and displayed to the user</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        
        @keyframes glitch-red {
          0%, 100% { transform: translate(0); opacity: 0.8; }
          20% { transform: translate(-1px, 1px); opacity: 0.9; }
          40% { transform: translate(-1px, -1px); opacity: 0.7; }
          60% { transform: translate(1px, 1px); opacity: 0.9; }
          80% { transform: translate(1px, -1px); opacity: 0.7; }
        }
        
        @keyframes glitch-blue {
          0%, 100% { transform: translate(0); opacity: 0.8; }
          20% { transform: translate(1px, -1px); opacity: 0.9; }
          40% { transform: translate(1px, 1px); opacity: 0.7; }
          60% { transform: translate(-1px, -1px); opacity: 0.9; }
          80% { transform: translate(-1px, 1px); opacity: 0.7; }
        }
        
        .animate-glitch {
          animation: glitch 0.3s infinite;
        }
        
        .animate-glitch-red {
          animation: glitch-red 0.3s infinite;
        }
        
        .animate-glitch-blue {
          animation: glitch-blue 0.3s infinite;
        }
      `}</style>
    </div>
  )
} 