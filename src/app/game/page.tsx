'use client'
import { useState, useEffect } from 'react'

export default function GamePage() {
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(30)
  const [isPlaying, setIsPlaying] = useState(false)
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 })
  const [errorCount, setErrorCount] = useState(0)

  useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          setIsPlaying(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isPlaying])

  useEffect(() => {
    if (!isPlaying) return

    const moveTarget = () => {
      setTargetPosition({
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10
      })
    }

    const interval = setInterval(moveTarget, 2000)
    return () => clearInterval(interval)
  }, [isPlaying])

  const startGame = () => {
    setScore(0)
    setTime(30)
    setIsPlaying(true)
    setTargetPosition({ x: 50, y: 50 })
  }

  const hitTarget = () => {
    if (!isPlaying) return
    setScore(prev => prev + 10)
    setTargetPosition({
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10
    })
  }

  const throwGameError = () => {
    try {
      // @ts-expect-error - Intentionally causing an error
      const result = undefinedVariable.gameMethod()
      console.log(result)
    } catch (error) {
      setErrorCount(prev => prev + 1)
      throw error
    }
  }

  const throwScoreError = () => {
    try {
      throw new Error('Score calculation failed!')
    } catch (error) {
      setErrorCount(prev => prev + 1)
      throw error
    }
  }

  const causeGameCrash = () => {
    try {
      // Simulate a game crash
      const gameState = {
        score: score,
        time: time,
        position: targetPosition
      }
      // @ts-expect-error - Intentionally causing an error
      gameState.invalidMethod()
    } catch (error) {
      setErrorCount(prev => prev + 1)
      throw error
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-blue-900 flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-white mb-8">Mini Game</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Game Area */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-600">
              <h2 className="text-2xl font-semibold text-white mb-4">Target Shooter</h2>
              
              <div className="mb-4 flex justify-between text-white">
                <div>Score: {score}</div>
                <div>Time: {time}s</div>
              </div>

              {!isPlaying ? (
                <button
                  onClick={startGame}
                  className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors"
                >
                  Start Game
                </button>
              ) : (
                <div className="relative w-64 h-64 mx-auto bg-gray-900 rounded-lg border border-gray-600 overflow-hidden">
                  <div
                    className="absolute w-8 h-8 bg-red-500 rounded-full cursor-pointer hover:bg-red-400 transition-colors"
                    style={{
                      left: `${targetPosition.x}%`,
                      top: `${targetPosition.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={hitTarget}
                  />
                </div>
              )}

              {!isPlaying && time === 0 && (
                <div className="mt-4 text-white">
                  <p className="text-lg">Game Over!</p>
                  <p className="text-gray-300">Final Score: {score}</p>
                </div>
              )}
            </div>
          </div>

          {/* Error Demo Area */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-600">
              <h2 className="text-2xl font-semibold text-red-400 mb-4">Error Demo Zone</h2>
              <p className="text-gray-300 mb-6">
                Trigger various errors to see how the game handles them.
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={throwGameError}
                  className="w-full px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded transition-colors"
                >
                  Game System Error
                </button>
                
                <button
                  onClick={throwScoreError}
                  className="w-full px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded transition-colors"
                >
                  Score Calculation Error
                </button>
                
                <button
                  onClick={causeGameCrash}
                  className="w-full px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded transition-colors"
                >
                  Simulate Game Crash
                </button>
              </div>

              <div className="mt-6 text-gray-400 text-sm">
                Errors triggered: {errorCount}
              </div>
            </div>

            {/* Game Instructions */}
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-600">
              <h3 className="text-xl font-semibold text-gray-300 mb-4">How to Play</h3>
              <div className="text-gray-400 space-y-2 text-sm text-left">
                <p>• Click &quot;Start Game&quot; to begin</p>
                <p>• Click the red target to score points</p>
                <p>• Target moves every 2 seconds</p>
                <p>• Game lasts 30 seconds</p>
                <p>• Each hit gives you 10 points</p>
              </div>
            </div>
          </div>
        </div>

        {/* Game Stats */}
        <div className="mt-8 p-6 bg-gray-800/50 rounded-lg border border-gray-600">
          <h3 className="text-xl font-semibold text-gray-300 mb-4">Game Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400">{score}</div>
              <div className="text-gray-400 text-sm">Current Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">{time}</div>
              <div className="text-gray-400 text-sm">Time Remaining</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">{errorCount}</div>
              <div className="text-gray-400 text-sm">Errors Triggered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">{Math.floor(score / 10)}</div>
              <div className="text-gray-400 text-sm">Targets Hit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 