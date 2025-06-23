'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-cyan-900/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${mousePosition.x - 200}px`,
            top: `${mousePosition.y - 200}px`,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-bounce" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-2xl animate-pulse" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center space-y-8">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            Cool Demo App
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Explore a collection of awesome demo pages with mind-blowing effects, 
            interactive animations, and cutting-edge web technologies.
          </p>

          <div className="text-sm text-gray-400 font-mono">
            {time.toLocaleTimeString()} • {time.toLocaleDateString()}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <Link 
              href="/particles"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-cyan-500/25"
            >
              Particles Effect
            </Link>
            <Link 
              href="/matrix"
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-green-500/25"
            >
              Matrix Rain
            </Link>
            <Link 
              href="/3d"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              3D Cube
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">Interactive</h3>
              <p className="text-gray-300">Mouse tracking, audio visualization, and real-time effects</p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Animated</h3>
              <p className="text-gray-300">Smooth transitions, particle systems, and 3D transformations</p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
              <h3 className="text-lg font-semibold text-pink-400 mb-2">Modern</h3>
              <p className="text-gray-300">Built with Next.js, TypeScript, and Tailwind CSS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}