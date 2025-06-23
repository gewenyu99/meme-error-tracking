'use client'
import { useState, useEffect } from 'react'

export default function ThreeDPage() {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 })
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    if (!isAnimating) return

    const interval = setInterval(() => {
      setRotation(prev => ({
        x: prev.x + 1,
        y: prev.y + 1.5,
        z: prev.z + 0.5
      }))
    }, 50)

    return () => clearInterval(interval)
  }, [isAnimating])

  const throwCubeError = () => {
    try {
      // @ts-expect-error - Intentionally causing an error
      const result = undefinedVariable.cubeMethod()
      console.log(result)
    } catch (error) {
      throw error
    }
  }

  const throwDimensionError = () => {
    try {
      throw new Error('Fourth dimension not found!')
    } catch (error) {
      throw error
    }
  }

  const causeRenderError = () => {
    try {
      // Simulate a rendering error
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // @ts-expect-error - Intentionally causing a canvas error
        ctx.invalidMethod()
      }
    } catch (error) {
      throw error
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold text-white mb-8">3D Cube Demo</h1>
        
        <div className="mb-8">
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors mr-4"
          >
            {isAnimating ? 'Pause' : 'Resume'} Animation
          </button>
          
          <button
            onClick={() => setRotation({ x: 0, y: 0, z: 0 })}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>

        {/* 3D Cube */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          <div
            className="absolute w-full h-full"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
              transformStyle: 'preserve-3d',
              transition: isAnimating ? 'none' : 'transform 0.3s ease'
            }}
          >
            {/* Front face */}
            <div className="absolute w-64 h-64 bg-red-500/80 border-2 border-red-300 transform translate-z-32" />
            
            {/* Back face */}
            <div className="absolute w-64 h-64 bg-blue-500/80 border-2 border-blue-300 transform translate-z-neg-32 rotateY-180" />
            
            {/* Right face */}
            <div className="absolute w-64 h-64 bg-green-500/80 border-2 border-green-300 transform translate-x-32 rotateY-90" />
            
            {/* Left face */}
            <div className="absolute w-64 h-64 bg-yellow-500/80 border-2 border-yellow-300 transform translate-x-neg-32 rotateY-neg-90" />
            
            {/* Top face */}
            <div className="absolute w-64 h-64 bg-purple-500/80 border-2 border-purple-300 transform translate-y-neg-32 rotateX-90" />
            
            {/* Bottom face */}
            <div className="absolute w-64 h-64 bg-orange-500/80 border-2 border-orange-300 transform translate-y-32 rotateX-neg-90" />
          </div>
        </div>

        {/* Error demo buttons */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4">Error Demo Buttons</h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={throwCubeError}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded transition-colors"
            >
              Cube Error
            </button>
            
            <button
              onClick={throwDimensionError}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded transition-colors"
            >
              Dimension Error
            </button>
            
            <button
              onClick={causeRenderError}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded transition-colors"
            >
              Render Error
            </button>
          </div>
        </div>

        <div className="mt-8 text-gray-300 text-sm">
          <p>Rotation: X: {Math.round(rotation.x)}° Y: {Math.round(rotation.y)}° Z: {Math.round(rotation.z)}°</p>
        </div>
      </div>
    </div>
  )
} 